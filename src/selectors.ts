import {AppRootStateType} from "./redux/store";

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectIsInitialized = (state: AppRootStateType) => state.app.initialized
export const selectNotification = (state: AppRootStateType) => state.app.notification
export const selectTasks = (state: AppRootStateType) => state.tasks
export const selectTodolists = (state: AppRootStateType) => state.toDoList
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn