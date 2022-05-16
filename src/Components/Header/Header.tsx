// imports
import React, {memo, useCallback, useEffect} from "react";
import s from './Header.module.css'
import moonPurple from '../../assets/moon-logo-purple.png'
import {useDispatch, useSelector} from "react-redux";
import {setStatusAppAC} from "../../redux/appReducer";
import {UniversalAddForm} from "../UniversalAddForm/UniversalAddForm";
import {LoadingPanel} from "../LoadingPanel/LoadingPanel";
import {logoutTC} from "../../redux/authReducer";
import {selectIsLoggedIn, selectStatus} from "./selectors";

type HeaderPropsType = {
    addToDoList: (title: string) => void
}

export const Header = memo(({addToDoList}:HeaderPropsType) => {

        const status = useSelector(selectStatus)
        const isLoggedIn = useSelector(selectIsLoggedIn)
        const dispatch = useDispatch()

        const logoutHandler = useCallback(() => {
            dispatch(logoutTC({}))
        }, [dispatch])

        useEffect(() => {
            dispatch(setStatusAppAC({status: 'idle'}))
        }, [dispatch])

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
                            <UniversalAddForm callback={addToDoList} placeholder={'add todolist'}/>
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