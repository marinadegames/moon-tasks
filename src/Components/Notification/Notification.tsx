// imports
import s from './ErrorMessage.module.css'
import {memo, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setErrorAppAC, setNotificationAppAC} from "../../redux/appReducer";

// types
type PropsType = {
    textError?: string | null
    textNotification?: string | null
    timer: number
    error: boolean

}

// component
export const Notification = memo(({textError, error, timer, textNotification}: PropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(setErrorAppAC({error: null}))
            }, timer)
        } else {
            setTimeout(() => {
                dispatch(setNotificationAppAC({notification: null}))
            }, timer)
        }

    }, [timer, dispatch, textNotification, textError, error])


    const deleteErrorMessage = () => {
        dispatch(setErrorAppAC({error: null}))
    }
    const deleteENotificationMessage = () => {
        dispatch(setNotificationAppAC({notification: null}))
    }

    // return
    return (
        <>
            {error ?
                <div className={s.errorMessage} style={{display: 'flex'}}>
                    <div className={s.errorMessageText}>{textError}</div>
                    <button className={s.errorMessageButton} onClick={deleteErrorMessage}>X</button>
                </div>
                :
                <div className={s.notificationMessage} style={{display: 'flex'}}>
                    <div className={s.notificationMessageText}>👌 {textNotification}</div>
                    <button className={s.notificationMessageButton} onClick={deleteENotificationMessage}>X</button>
                </div>
            }
        </>
    )
})