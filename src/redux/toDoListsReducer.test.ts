// imports
import {v1} from "uuid"
import {FilterValuesType} from "../App";
import {
    AddToDoListAC,
    EditToDoListFilterAC,
    EditToDoListTitleAC,
    RemoveToDoListAC, TodolistDomainType,
    toDoListsReducer, ToDoListType
} from "./toDoListsReducer";
import {TodolistType} from "../api/todolist-api";


// start state
let toDoListId1: string = v1()
let toDoListId2: string = v1()
let startState: Array<TodolistDomainType>

beforeEach(() => {
    toDoListId1 = v1()
    toDoListId2 = v1()

    startState = [
        {id: toDoListId1, title: "What to learn", filter: "ALL", addedDate: '', order: 0},
        {id: toDoListId2, title: "What to buy", filter: "ALL", addedDate: '', order: 0}
    ]
})

// tests
test('REMOVE ToDo List', () => {
    let action = RemoveToDoListAC(toDoListId1)
    let endState = toDoListsReducer(startState, action)
    expect(endState[0].id).toBe(toDoListId2)
    expect(endState[0].title).toBe(startState[1].title)
    expect(endState.length).toBe(1)
})
test('ADDED TODOLIST', () => {


    let newTodolistTitle = "New Todolist";
    let newTodolist: TodolistType = {
        id: v1(),
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }

    const endState = toDoListsReducer(startState, AddToDoListAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('EDIT TITLE ToDo List', () => {
    const newTitleToDoList = 'What to drink'
    const action = EditToDoListTitleAC(toDoListId1, newTitleToDoList)
    const endState = toDoListsReducer(startState, action)
    expect(endState[0].title).toBe(newTitleToDoList)
})
test('CHANGE FILTER ToDo List', () => {
    const newFilter: FilterValuesType = 'COMPLETED'
    const action = EditToDoListFilterAC(toDoListId1, newFilter)
    const endState = toDoListsReducer(startState, action)
    expect(endState[0].filter).toBe(newFilter)
})