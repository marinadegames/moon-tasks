// imports
import {v1} from "uuid"
import {AddToDoListAC, EditToDoListFilterAC, EditToDoListTitleAC, RemoveToDoListAC, TodolistDomainType, toDoListsReducer} from "../redux/toDoListsReducer";
import {TodolistType} from "../api/todolist-api";
import {FilterValuesType} from "../helpers/helpers";

// start state
let toDoListId1: string = v1()
let toDoListId2: string = v1()
let startState: Array<TodolistDomainType>

beforeEach(() => {
    startState = [
        {id: toDoListId1, title: "What to learn", filter: "ALL", addedDate: '', order: 0},
        {id: toDoListId2, title: "What to buy", filter: "ALL", addedDate: '', order: 0}
    ]
})

// tests
test('REMOVE Todolist should be correct', () => {
    let action = RemoveToDoListAC({id: toDoListId1})
    let endState = toDoListsReducer(startState, action)
    expect(endState[0].id).toBe(toDoListId2)
    expect(endState[0].title).toBe(startState[1].title)
    expect(endState.length).toBe(1)
})
test('ADDED TODOLIST should be correct', () => {
    let newTodolistTitle = "New Todolist";
    let newTodolist: TodolistType = {
        id: v1(),
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }
    const endState = toDoListsReducer(startState, AddToDoListAC({todolist: newTodolist}))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('EDIT TITLE Todolist should be correct', () => {
    const newTitleToDoList = 'What to drink'
    const action = EditToDoListTitleAC({id: toDoListId1, title: newTitleToDoList})
    const endState = toDoListsReducer(startState, action)
    expect(endState[0].title).toBe(newTitleToDoList)
})
test('CHANGE FILTER Todolist should be correct', () => {
    const newFilter: FilterValuesType = 'COMPLETED'
    const action = EditToDoListFilterAC({id: toDoListId1, filter: newFilter})
    const endState = toDoListsReducer(startState, action)
    expect(endState[0].filter).toBe(newFilter)
})