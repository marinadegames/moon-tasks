// imports
import React, {memo} from "react";
import s from './Header.module.css'
import moonPurple from '../assets/moon-logo-purple.png'
import {LoadingPanel} from "../LoadingPanel/LoadingPanel";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../redux/store";
import {StatusesType} from "../../redux/appReducer";
import {UniversalAddForm} from "../UniversalAddForm/UniversalAddForm";

// types
type HeaderPropsType = {
    addToDoList: (title: string) => void
}

// components

export const Header = memo((props: HeaderPropsType) => {

        // local state
        const status = useSelector<rootReducerType, StatusesType>(state => state.app.status)
        console.log(status)

        // return
        return (
            <div>
                <div className={s.header}>
                    <img src={moonPurple}
                         alt={'moonPurple'}
                         className={s.moonLogo}/>
                    <h1>MOON tasks</h1>
                    <div className={s.addTaskBox}>
                        <h4>Add new todolist:</h4>
                        <UniversalAddForm callback={props.addToDoList} placeholder={'add todolist'}/>
                    </div>

                </div>
                <LoadingPanel speed={'1s'} status={status}/>
            </div>

        )
    }
)