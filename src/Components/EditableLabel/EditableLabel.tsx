// imports
import React, {ChangeEvent, useState} from "react";
import s from './EditableLabel.module.css'

// types
type propsType = {
    title: string
    className: string
    editTaskHandlerForEditableLabel: (title: string) => void
}

// components
export const EditableLabel = (props: propsType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)
    const editOn = () => {
        setEdit(true)
    }
    const editOff = () => {
        setEdit(false)
        props.editTaskHandlerForEditableLabel(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (

        edit
            ? <div className={s.editableInputFromTask}>
                <input onBlur={editOff}
                       onChange={(e) => onChangeTitle(e)}
                       value={title}
                       autoFocus/>
            </div>

            : <label htmlFor="happy"
                     onDoubleClick={editOn}
                     className={props.className}>{props.title}</label>
    )
}