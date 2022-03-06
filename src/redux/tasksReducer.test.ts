// imports
import {v1} from "uuid";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    EditTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TaskStateType
} from "./tasksReducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


// startState
let toDoListId1: string = v1()
let toDoListId2: string = v1()
let startState: TaskStateType

beforeEach(() => {
    toDoListId1 = v1()
    toDoListId2 = v1()

    startState = {
        [toDoListId1]: [
            {
                id: '1',
                title: 'HTML',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: toDoListId1,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '2',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: toDoListId1,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '3',
                title: 'JS',
                status: TaskStatuses.New,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: toDoListId1,
                order: 0,
                addedDate: 'string',
            },

        ],
        [toDoListId2]: [
            {
                id: '3',
                title: 'Oil',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: toDoListId2,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '4',
                title: 'Juice',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: toDoListId2,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '5',
                title: 'Milk',
                status: TaskStatuses.New,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: toDoListId2,
                order: 0,
                addedDate: 'string',
            },

        ],
    }

})


// test
test('ADD TASK', () => {
    const newTitle = 'Water'
    const action = AddTaskAC(newTitle, toDoListId2)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId2][0].title).toBe(newTitle)
    expect(endState[toDoListId2].length).toBe(4)

})
test('REMOVE TASK', () => {
    const taskId = startState[toDoListId1][0].id
    const action = RemoveTaskAC(taskId, toDoListId1)
    const endState = tasksReducer(startState, action)
    expect(endState[toDoListId1].length).toBe(2)
    expect(endState[toDoListId1][0].title).toBe(startState[toDoListId1][1].title)
})
test('CHANGE STATUS TASK', () => {
    const taskId = startState[toDoListId1][0].id
    const action = ChangeTaskStatusAC(taskId, toDoListId1, TaskStatuses.Completed)
    const endState = tasksReducer(startState, action)
    expect(endState[toDoListId1][0].status).toBe(TaskStatuses.Completed)

})
test('EDIT TASK TITLE', () => {
    const newTitle = 'Water'
    const tId = startState[toDoListId2][0].id
    const action = EditTaskTitleAC(toDoListId2, tId, newTitle)
    const endState = tasksReducer(startState, action)
    expect(endState[toDoListId2][0].title).toBe(newTitle)

})