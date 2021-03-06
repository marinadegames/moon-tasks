import s from './ToDoListsList.module.css'
import {ToDoList} from "./ToDoList";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistTitle, EditToDoListFilterAC, fetchTodolists, removeTodolist} from "../../redux/toDoListsReducer";
import {addTask, changeTaskTitle, deleteTask, TaskType, updateTaskStatus} from "../../redux/tasksReducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn, selectTasks, selectTodolists} from "./selectors";
import {FilterValuesType} from "../../helpers/helpers";

export const TodolistsList = () => {

    const tasks = useSelector(selectTasks)
    const toDoLists = useSelector(selectTodolists)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [dispatch])

    const removeTask = useCallback((id: string, toDoListId: string) => {
        dispatch(deleteTask({todolistId: toDoListId, taskId: id}))
    }, [dispatch])

    const addTaskFoo = useCallback((newTitle: string, toDoListId: string) => {
        dispatch(addTask({todolistId: toDoListId, newTitle: newTitle}))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, toDoListID: string, status: number) => {

        dispatch(updateTaskStatus({taskId: taskId, todolistId: toDoListID, status: status}))
    }, [dispatch])

    const changeToDoListFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(EditToDoListFilterAC({id, filter}))
    }, [dispatch])

    const removeToDoList = useCallback((id: string) => {
        dispatch(removeTodolist({todolistId: id}))
    }, [dispatch])

    const editTaskHandler = useCallback((ToDoListId: string, tId: string, title: string) => {
        dispatch(changeTaskTitle({todolistId: ToDoListId, taskId: tId, newTitle: title}))
    }, [dispatch])

    const editToDoListTitleHandler = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitle({todolistId: id, newTitle: title}))
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

    if (!isLoggedIn) return <Navigate to={'/login'}/>

    return (
        <div className={s.toDoLists}>
            {toDoLists.map((tl) => {
                return (
                    <ToDoList key={tl.id}
                              toDoListId={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                              tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                              addTask={addTaskFoo}
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
    )
}