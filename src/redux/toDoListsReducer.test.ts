// imports

import { v1 } from "uuid"
import {FilterValuesType, ToDoListType} from "../App";
import {
    AddToDoListAC,
    EditToDoListFilterAC,
    EditToDoListTitleAC,
    RemoveToDoListAC,
    ToDoListsReducer
} from "./toDoListsReducer";


// tests
test ('REMOVE ToDo List', () => {

    const toDoListId1 = v1()
    const toDoListId2 = v1()

    let startState: Array<ToDoListType> = [
        {id: toDoListId1, title: "What's study", filter: 'ALL'},
        {id: toDoListId2, title: "What to buy", filter: 'ALL'},
    ]

    let endState = ToDoListsReducer(startState, RemoveToDoListAC(toDoListId1))

    expect(endState[0].id).toBe(toDoListId2)
    expect(endState.length).toBe(1)
})

test ('ADD ToDo List', () => {

    const toDoListId1 = v1()
    const toDoListId2 = v1()

    let newTitleToDoList = 'What to drink'

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: "What's study", filter: 'ALL'},
        {id: toDoListId2, title: "What to buy", filter: 'ALL'},
    ]

    let endState = ToDoListsReducer(startState, AddToDoListAC(newTitleToDoList))

    expect(endState[2].title).toBe(newTitleToDoList)
    expect(endState.length).toBe(3)
})

test ('EDIT TITLE ToDo List', () => {

    const toDoListId1 = v1()
    const toDoListId2 = v1()

    let newTitleToDoList = 'What to drink'

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: "What's study", filter: 'ALL'},
        {id: toDoListId2, title: "What to buy", filter: 'ALL'},
    ]

    let endState = ToDoListsReducer(startState, EditToDoListTitleAC(toDoListId1, newTitleToDoList))

    expect(endState[0].title).toBe(newTitleToDoList)
})

test ('CHANGE FILTER ToDo List', () => {

    const toDoListId1 = v1()
    const toDoListId2 = v1()

    let newFilter:FilterValuesType = 'COMPLETED'

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: "What's study", filter: 'ALL'},
        {id: toDoListId2, title: "What to buy", filter: 'ALL'},
    ]

    let endState = ToDoListsReducer(startState, EditToDoListFilterAC(toDoListId1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
})