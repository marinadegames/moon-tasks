// imports
import s from './ErrorMessage.module.css'
import {memo, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setErrorAppAC} from "../../redux/appReducer";

// types
type PropsType = {
    textError: string | null
    timer: number
}

// component
export const ErrorMessage = memo((props: PropsType) => {

    //state
    const dispatch = useDispatch()

    // functional
    useEffect(() => {
        setTimeout(() => {
            dispatch(setErrorAppAC({error: null}))
        }, props.timer)
    }, [props.timer, dispatch])

    const deleteErrorMessage = () => {
        dispatch(setErrorAppAC({error: null}))
    }

    // return
    return (
        <div className={s.errorMessage} style={{display: 'flex'}}>
            <div className={s.errorMessageText}>{props.textError}</div>
            <button className={s.errorMessageButton} onClick={deleteErrorMessage}>X</button>
        </div>
    )
})