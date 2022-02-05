//imports
import React from 'react';
import './App.module.css';
import {ToDoList} from "./Components/ToDoList/ToDoList";
import {Header} from "./Components/Header/Header";
import s from './App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redux/store";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    EditTaskTitleAC,
    RemoveTaskAC,
    TaskStateType,
    TaskType
} from "./redux/TasksReducer";
import {
    AddToDoListAC,
    EditToDoListFilterAC,
    EditToDoListTitleAC,
    RemoveToDoListAC,
    ToDoListType
} from "./redux/toDoListsReducer";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export function App() {

    // dispatch
    const dispatch = useDispatch()
    const tasks = useSelector<rootReducerType, TaskStateType>(state => state.tasks)
    const toDoLists = useSelector<rootReducerType, Array<ToDoListType>>(state => state.toDoList)

    // functional
    function removeTask(id:string, toDoListId: string){
        dispatch(RemoveTaskAC(id, toDoListId))
    }
    function addTask(newTitle:string, toDoListId: string){
        dispatch(AddTaskAC(newTitle, toDoListId))
    }
    function changeTaskStatus(taskId: string, toDoListID: string, isDone: boolean){
        dispatch(ChangeTaskStatusAC(taskId,toDoListID,isDone))
    }
    function changeToDoListFilter(id: string, filter: FilterValuesType){
        dispatch(EditToDoListFilterAC(id, filter))
    }
    function addToDoList(title: string){
        dispatch(AddToDoListAC(title))
    }
    function removeToDoList(id: string){
        dispatch(RemoveToDoListAC(id))
    }
    function editTaskHandler(ToDoListId: string, tId: string, title: string){
        dispatch(EditTaskTitleAC(ToDoListId, tId, title))
    }
    function editToDoListTitleHandler(id: string, title: string){
        dispatch(EditToDoListTitleAC(id, title))
    }

    const getTasksForRender = (filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
        switch (filter) {
            case "COMPLETED":
                return tasks.filter(t => t.isDone)
            case "ACTIVE":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }



    return (
        <div>
            <div>
                <Header addToDoList={addToDoList}/>
            </div>
            <div className={s.toDoLists}>
                {toDoLists.map((tl) => {
                    return (
                        <ToDoList key={tl.id}
                                  toDoListId={tl.id}
                                  title={tl.title}
                                  filter={tl.filter}
                                  tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  changeTaskStatus={changeTaskStatus}
                                  changeToDoListFilter={changeToDoListFilter}
                                  removeToDoList={removeToDoList}
                                  editTaskHandler={editTaskHandler}
                                  editToDoListTitleHandler={editToDoListTitleHandler}
                        />
                    )
                })}
            </div>
        </div>
    )
}



