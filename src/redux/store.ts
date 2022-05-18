import {combineReducers} from "redux";
import {addTodolistSaga, changeTodolistTitleSaga, fetchTodolistsSaga, removeTodolistSaga, toDoListsReducer} from "./toDoListsReducer";
import {appReducer, initializeAppWorkerSaga} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {addTasksSaga, changeTaskTitleSaga, deleteTaskSaga, fetchTasksWorkerSaga, tasksReducer, updateTaskStatusSaga} from "./tasksReducer";
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoList: toDoListsReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()
export type getStateType = ReturnType<typeof store.getState>
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk, sagaMiddleware)
})

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga)
    yield takeEvery('TASKS/FETCH_TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/ADD_TASK', addTasksSaga)
    yield takeEvery('TASKS/DELETE_TASK', deleteTaskSaga)
    yield takeEvery('TASKS/UPDATE_TASK_STATUS', updateTaskStatusSaga)
    yield takeEvery('TASKS/CHANGE_TASK_TITLE', changeTaskTitleSaga)

    yield takeEvery('TODOLISTS/FETCH_TODOLISTS', fetchTodolistsSaga)
    yield takeEvery('TODOLISTS/CREATE_TODOLIST', addTodolistSaga)
    yield takeEvery('TODOLISTS/REMOVE_TODOLIST', removeTodolistSaga)
    yield takeEvery('TODOLISTS/CHANGE_TODOLIST_TITLE', changeTodolistTitleSaga)
}


// @ts-ignore
window.store = store