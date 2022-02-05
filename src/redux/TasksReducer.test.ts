import {v1} from "uuid";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    EditTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TaskStateType
} from "./TasksReducer";


test('ADD TASK', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: TaskStateType = {
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
    }
    const newTitle = 'Water'
    const action = AddTaskAC(newTitle, toDoListId2)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId2][0].title).toBe(newTitle)
    expect(endState[toDoListId2].length).toBe(4)

})
test('REMOVE TASK', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: TaskStateType = {
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
    }

    const action = RemoveTaskAC(startState[toDoListId1][0].id, toDoListId1)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId1].length).toBe(4)
    expect(endState[toDoListId1][0].title).toBe(startState[toDoListId1][1].title)

})
test('CHANGE STATUS TASK', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: TaskStateType = {
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
    }
    const taskId = startState[toDoListId1][0].id
    const action = ChangeTaskStatusAC(taskId, toDoListId1, true)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId1][0].isDone).toBe(true)

})
test('EDIT TASK TITLE', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: TaskStateType = {
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
    }
    const newTitle = 'Water'
    const tId = startState[toDoListId2][0].id
    const action = EditTaskTitleAC(toDoListId2, tId, newTitle)
    const endState = tasksReducer(startState, action)

    expect(endState[toDoListId2][0].title).toBe(newTitle)

})