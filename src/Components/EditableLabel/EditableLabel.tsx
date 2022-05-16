// imports
import React, {ChangeEvent, memo, useState} from "react";
import s from './EditableLabel.module.css'

type PropsType = {
    titleProps: string
    className: string
    editTaskHandlerForEditableLabel: (title: string) => void
}

export const EditableLabel = memo(({titleProps, editTaskHandlerForEditableLabel, className}: PropsType) => {

        const [edit, setEdit] = useState(false)
        const [title, setTitle] = useState(titleProps)

        const editOn = () => {
            setEdit(true)
        }
        const editOff = () => {
            setEdit(false)
            editTaskHandlerForEditableLabel(title)
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
                         className={className}>{titleProps}</label>
        )
    }
)