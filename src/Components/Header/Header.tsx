import React, {memo, useEffect} from "react";
import s from './Header.module.css'
import moonPurple from '../../assets/moon-logo-purple.png'
import {setStatusAppAC} from "../../redux/appReducer";
import {UniversalAddForm} from "../UniversalAddForm/UniversalAddForm";
import {LoadingPanel} from "../LoadingPanel/LoadingPanel";
import {selectIsLoggedIn, selectStatus} from "./selectors";
import {logout} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";

type HeaderPropsType = {
    addToDoList: (title: string) => void
}

export const Header = memo(({addToDoList}: HeaderPropsType) => {

        const status = useSelector(selectStatus)
        const isLoggedIn = useSelector(selectIsLoggedIn)
        const dispatch = useDispatch()

        const logoutHandler = () => {
            dispatch(logout())
        }

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