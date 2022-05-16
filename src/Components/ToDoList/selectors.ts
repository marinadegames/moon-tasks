import {AppRootStateType} from "../../redux/store";

export const selectTasks = (state: AppRootStateType) => state.tasks
export const selectTodolists = (state: AppRootStateType) => state.toDoList
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn