import {combineReducers} from "redux";
import {toDoListsReducer} from "./toDoListsReducer";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {tasksReducer} from "./tasksReducer";
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
    yield takeEvery('ACTIVATOR-ACTION-TYPE', rootWorker)
}

function* rootWorker() {
    console.log('root Watcher!!!')
}

setTimeout(() => {
    store.dispatch({type: 'ACTIVATOR-ACTION-TYPE'})
}, 3000)

// @ts-ignore
window.store = store