import {AppRootStateType} from "../redux/store";

export const selectStatus = (state: AppRootStateType) => state.app.error
export const selectIsInitialized = (state: AppRootStateType) => state.app.initialized
export const selectNotification = (state: AppRootStateType) => state.app.notification
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
