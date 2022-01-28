//imports
import React, {useState} from 'react';
import './App.module.css';
import {ToDoList} from "./Components/ToDoList/ToDoList";
import {Header} from "./Components/Header/Header";
import s from './App.module.css'
import {v1} from "uuid";

//assets

//types
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key:string]: Array<TaskType>
}
export type FilterValuesType = 'ALL' | 'COMPLETED' | 'ACTIVE'

//components
export function App() {

    //BLL:

    // local state ToDoLists
    const toDoListId1 = v1()
    const toDoListId2 = v1()
    const toDoListId3 = v1()

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListId1, title: "What's study", filter: 'ALL'},
        {id: toDoListId2, title: "What to buy", filter: 'ALL'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'English', isDone: true},
        ],
        [toDoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Juice', isDone: false},
            {id: v1(), title: 'Meat', isDone: true},
        ],
    })

// functions
    const getTasksForRender = (filter: FilterValuesType, tasks: Array<TaskType>):Array<TaskType> => {
        switch (filter) {
            case "COMPLETED":
                return tasks.filter(t => t.isDone)
            case "ACTIVE":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }
    const removeTask = (id: string, toDoListId: string) => {
        let copyTasks = {...tasks}
        copyTasks[toDoListId] = tasks[toDoListId].filter(tl => tl.id !== id)
        setTasks(copyTasks)
    }
    const addTask = (title: string, toDoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[toDoListId] = [{id: v1(), title: title, isDone: false}, ...tasks[toDoListId]]
        setTasks(copyTasks)
    }
    function changeTaskStatus( taskId: string, todolistID: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone} : m)})
    }
    const changeToDoListFilter = (filter: FilterValuesType, toDoListId: string) => {
        setToDoLists(toDoLists.map(tl => tl.id === toDoListId ? {...tl, filter} : tl))
    }
    const removeToDoList = (toDoListsId: string) => {
        setToDoLists(toDoLists.filter( tl => tl.id !== toDoListsId))
    }
    const addToDoList = (title:string) => {
        debugger
        setToDoLists([...toDoLists, {id: toDoListId3, title, filter: 'ALL'}])
        setTasks({...tasks, [toDoListId3]: []})
    }
    const editTaskHandler = (ToDoListId: string, tId: string, title: string) => {
        setTasks( {...tasks, [ToDoListId]: tasks[ToDoListId].map( t => t.id === tId ? {...t, title} : t)})
    }
    const editToDoListTitleHandler = (ToDoListId: string, title: string) => {
        setToDoLists(toDoLists.map(td => td.id === ToDoListId ? {...td, title} : td))
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



