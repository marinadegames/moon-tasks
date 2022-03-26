// imports
import React, {memo, useCallback, useEffect} from "react";
import s from './Header.module.css'
import moonPurple from '../../assets/moon-logo-purple.png'
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../redux/store";
import {setStatusAppAC, StatusesType} from "../../redux/appReducer";
import {UniversalAddForm} from "../UniversalAddForm/UniversalAddForm";
import {LoadingPanel} from "../LoadingPanel/LoadingPanel";
import {logoutTC} from "../../redux/authReducer";

type HeaderPropsType = {
    addToDoList: (title: string) => void
}

export const Header = memo((props: HeaderPropsType) => {

        const status = useSelector<rootReducerType, StatusesType>(state => state.app.status)
        const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
        const dispatch = useDispatch()

        const logoutHandler = useCallback(() => {
            dispatch(logoutTC())
        }, [dispatch])

        useEffect(() => {
            dispatch(setStatusAppAC('idle'))
        }, [dispatch])

        // return
        return (
            <div>
                <div className={s.header}>
                    <div className={s.headerContainer}>
                        <img src={moonPurple}
                             alt={'moonPurple'}
                             className={s.moonLogo}/>
                        <h1>MOON tasks</h1>
                    </div>

                    {!isLoggedIn
                        ? <></>
                        : <div className={s.addTaskBox}>
                            <h4>Add new todolist:</h4>
                            <UniversalAddForm callback={props.addToDoList} placeholder={'add todolist'}/>
                        </div>
                    }


                    <div className={s.headerContainer}>
                        {isLoggedIn
                            ? <button className={s.menu} onClick={logoutHandler}>log out</button>
                            : <button className={s.menu}>login</button>}
                    </div>
                </div>
                <LoadingPanel speed={'1s'} status={status}/>
            </div>

        )
    }
)