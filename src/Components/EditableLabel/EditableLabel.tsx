import React, {ChangeEvent, useState} from "react";
import s from './EditableLabel.module.css'

type propsType = {
    title: string
    className: string
    editTaskHandlerForEditableLabel: (title: string) => void
}


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
            ? <input onBlur={editOff}
                     onChange={ (e) => onChangeTitle(e)}
                     value={title}
                     autoFocus />
            : <label htmlFor="happy"
                     onDoubleClick={editOn}
                     className={props.className}>{props.title}</label>
    )
}