// imports
import React from "react";
import s from './Header.module.css'

// types
type HeaderProps = {

}

// components

export function Header (props: any) {

    return (
        <div className={s.header}>
            <h1>Hello!</h1>
            <h2>It's my toDo list project!</h2>
        </div>
    )
}

