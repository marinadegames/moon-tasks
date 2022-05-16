import React, {ChangeEvent, memo} from "react";
import s from "../ToDoList/ToDoList.module.css";
import {EditableLabel} from "../EditableLabel/EditableLabel";
import {TaskStatuses} from "../../api/todolist-api";
import {DeleteIcon} from "./DeleteIcon";

type PropsType = {
    id: string
    toDoListId: string
    title: string
    status: number
    removeTask: (id: string, toDoListId: string) => void
    editTaskHandler: (ToDoListId: string, tId: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: number) => void
}

export const Task = memo((props: PropsType) => {

        const removeTask = () => props.removeTask(props.id, props.toDoListId)
        const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newValueChecked = e.currentTarget.checked
            props.changeTaskStatus(
                props.id,
                props.toDoListId,
                newValueChecked ? TaskStatuses.Completed : TaskStatuses.New
            )
        }
        const editTaskHandlerForEditableLabel = (taskId: string, newTitle: string) => {
            props.editTaskHandler(props.toDoListId, taskId, newTitle)
        }

        return (
            <div className={s.tasksBox}
                 key={props.id}>
                <div className={s.mainBoxTasks}>
                    <input type="checkbox"
                           className={s.customCheckbox}
                           name="happy"
                           checked={props.status === TaskStatuses.Completed}
                           onChange={onChangeCheckHandler}
                    />
                    <EditableLabel titleProps={props.title}
                                   editTaskHandlerForEditableLabel={(title) => editTaskHandlerForEditableLabel(props.id, title)}
                                   className={props.status === TaskStatuses.New ? s.textTrue : s.textFalse}/>
                    <button onClick={removeTask}
                            className={s.btnRemoveTask}>
                       <DeleteIcon/>
                    </button>
                </div>
            </div>
        )
    }
)

