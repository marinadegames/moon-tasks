//imports
import React, {useCallback} from 'react';
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
} from "./redux/tasksReducer";
import {
    AddToDoListAC,
    EditToDoListFilterAC,
    EditToDoListTitleAC,
    RemoveToDoListAC,
    ToDoListType
} from "./redux/toDoListsReducer";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export const App = () => {
    console.clear()
    console.log('===== START RENDER =====')
    console.log('__APP')

    // select state
    const tasks = useSelector<rootReducerType, TaskStateType>(state => state.tasks)
    const toDoLists = useSelector<rootReducerType, Array<ToDoListType>>(state => state.toDoList)
    const dispatch = useDispatch()

    // functional
    const removeTask = useCallback((id: string, toDoListId: string) => {
        dispatch(RemoveTaskAC(id, toDoListId))
    }, [dispatch])

    const addTask = useCallback((newTitle: string, toDoListId: string) => {
        dispatch(AddTaskAC(newTitle, toDoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, toDoListID: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(taskId, toDoListID, isDone))
    }, [dispatch])

    const changeToDoListFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(EditToDoListFilterAC(id, filter))
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(AddToDoListAC(title))
    }, [dispatch])

    const removeToDoList = useCallback((id: string) => {
        dispatch(RemoveToDoListAC(id))
    }, [dispatch])

    const editTaskHandler = useCallback((ToDoListId: string, tId: string, title: string) => {
        dispatch(EditTaskTitleAC(ToDoListId, tId, title))
    }, [dispatch])

    const editToDoListTitleHandler = useCallback((id: string, title: string) => {
        dispatch(EditToDoListTitleAC(id, title))
    }, [dispatch])

    const getTasksForRender = useCallback((filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
        switch (filter) {
            case "COMPLETED":
                return tasks.filter(t => t.isDone)
            case "ACTIVE":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }, [])

    //return
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




