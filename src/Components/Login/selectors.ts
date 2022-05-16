import {AppRootStateType} from "../../redux/store";

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn