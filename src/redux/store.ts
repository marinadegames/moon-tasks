import {combineReducers} from "redux";
import {toDoListsReducer} from "./toDoListsReducer";
import {appReducer, initializeAppWorkerSaga} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {addTasksSaga, fetchTasksWorkerSaga, tasksReducer} from "./tasksReducer";
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoList: toDoListsReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk, sagaMiddleware)
})

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga)
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/ADD_TASKS', addTasksSaga)
}


// @ts-ignore
window.store = store