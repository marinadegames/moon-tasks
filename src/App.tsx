//imports
import React, {memo, useCallback, useEffect} from 'react';
import './App.module.css';
import {ToDoList} from "./Components/ToDoList/ToDoList";
import {Header} from "./Components/Header/Header";
import s from './App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redux/store";
import {
    addTasksTC, changeTaskTitleTC,
    deleteTaskTC,
    TaskStateType,
    TaskType, updateTaskStatusTC
} from "./redux/tasksReducer";
import {
    addTodolistTC, changeTodolistTitleTC,
    EditToDoListFilterAC,
    fetchTodolistsTC,
    removeTodolistTC,
    ToDoListType
} from "./redux/toDoListsReducer";
import {TaskStatuses} from "./api/todolist-api";

export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export const App = memo(() => {

        // select state
        const tasks = useSelector<rootReducerType, TaskStateType>(state => state.tasks)
        const toDoLists = useSelector<rootReducerType, Array<ToDoListType>>(state => state.toDoList)
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(fetchTodolistsTC())
        }, [dispatch])

        // functional
        const removeTask = useCallback((id: string, toDoListId: string) => {
            dispatch(deleteTaskTC(toDoListId, id))
        }, [dispatch])

        const addTask = useCallback((newTitle: string, toDoListId: string) => {
            dispatch(addTasksTC(toDoListId, newTitle))
        }, [dispatch])

        const changeTaskStatus = useCallback((taskId: string, toDoListID: string, status: number) => {
            dispatch(updateTaskStatusTC(taskId, toDoListID, status))
        }, [dispatch])

        const changeToDoListFilter = useCallback((id: string, filter: FilterValuesType) => {
            dispatch(EditToDoListFilterAC(id, filter))
        }, [dispatch])

        const addToDoList = useCallback((title: string) => {
            dispatch(addTodolistTC(title))
        }, [dispatch])

        const removeToDoList = useCallback((id: string) => {
            dispatch(removeTodolistTC(id))
        }, [dispatch])

        const editTaskHandler = useCallback((ToDoListId: string, tId: string, title: string) => {
            dispatch(changeTaskTitleTC(ToDoListId, tId, title))
        }, [dispatch])

        const editToDoListTitleHandler = useCallback((id: string, title: string) => {
            dispatch(changeTodolistTitleTC(id, title))
        }, [dispatch])

        const getTasksForRender = useCallback((filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
            switch (filter) {
                case "COMPLETED":
                    return tasks.filter(t => t.status === TaskStatuses.Completed)
                case "ACTIVE":
                    return tasks.filter(t => t.status === TaskStatuses.New)
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
)