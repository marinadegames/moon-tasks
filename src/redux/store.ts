import {combineReducers} from "redux";
import {toDoListsReducer} from "./toDoListsReducer";
import {appReducer, initializeAppWorkerSaga} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {addTasksSaga, deleteTaskSaga, fetchTasksWorkerSaga, tasksReducer, updateTaskStatusSaga} from "./tasksReducer";
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
}


// @ts-ignore
window.store = store