//imports
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './ToDoList.module.css'
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";
import {EditableLabel} from "../EditableLabel/EditableLabel";

//assets
const deleteIcon = <svg
    className={s.svgDelete}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="1.2rem"
    height="1.2rem">
    <path
        d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"/>
</svg>

//types
type TypeTask = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListsPropsType = {
    toDoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TypeTask>
    addTask: (title: string, toDoListId: string) => void
    removeTask: (id: string, toDoListId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeToDoListFilter: (toDoListId: string, filter: FilterValuesType ) => void
    removeToDoList: (toDoListsId: string) => void
    editTaskHandler: (ToDoListId: string, tId: string, title: string) => void
    editToDoListTitleHandler: (ToDoListId: string, newTitle: string) => void
}

//components
export function ToDoList(props: ToDoListsPropsType) {

    // hooks
    let [error, setError] = useState<string | null>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")


    const onClickSetAllFilter = () => props.changeToDoListFilter(props.toDoListId, 'ALL')
    const onClickSetActiveFilter = () => props.changeToDoListFilter(props.toDoListId, "ACTIVE")
    const onClickSetCompletedFilter = () => props.changeToDoListFilter( props.toDoListId, "COMPLETED")
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const addTask = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle.trim(), props.toDoListId);
            setTaskTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        if (error !== '') {
            setError(null)
        }
    }

    const editTaskHandlerForEditableLabel = (taskId: string, newTitle: string) => {
        props.editTaskHandler(props.toDoListId, taskId, newTitle)
    }

    const editToDoListHandlerForEditableLabel = (toDoId: string, newTitle: string) => {
        props.editToDoListTitleHandler(props.toDoListId, newTitle)
    }

// MAP TASKS ======================

    let tasksList = props.tasks.map((t: TypeTask) => {
        // console.log('TASKS: ' + t.title)
        const removeTask = () => props.removeTask(t.id, props.toDoListId)
        const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, props.toDoListId, e.currentTarget.checked)
        }

        return (
            <div className={s.tasksBox}
                 key={t.id}>
                <div className={s.mainBoxTasks}>
                    <input type="checkbox"
                           className={s.customCheckbox}
                           name="happy"
                           checked={t.isDone}
                           onChange={onChangeCheckHandler}
                    />

                    <EditableLabel title={t.title}
                                   editTaskHandlerForEditableLabel={ (title) => editTaskHandlerForEditableLabel(t.id, title) }
                                   className={!t.isDone ? s.textTrue : s.textFalse}/>

                    <button onClick={removeTask}
                            className={s.btnRemoveTask}>
                        {deleteIcon}
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className={s.task}>

            <div className={s.titleBoxTasks}>
                <svg viewBox="0 0 100 80" width="20" height="20">
                    <rect width="100" height="20"/>
                    <rect y="30" width="100" height="20"/>
                    <rect y="60" width="100" height="20"/>
                </svg>
                <EditableLabel title={props.title}
                               editTaskHandlerForEditableLabel={ (title) => editToDoListHandlerForEditableLabel(props.toDoListId, title) }
                               className={''}/>
                <button className={s.deleteTaskBtn}
                        onClick={() => props.removeToDoList(props.toDoListId)}>
                    X
                </button>
            </div>

            <div className={s.tasksBox}>

                <div className={s.btnsFilters}>
                    <button onClick={onClickSetAllFilter}
                            className={props.filter === 'ALL' ? s.btnAllActive : s.btnAll}>ALL
                    </button>
                    <button onClick={onClickSetActiveFilter}
                            className={props.filter === 'ACTIVE' ? s.btnActiveActive : s.btnActive}>ACTIVE
                    </button>
                    <button onClick={onClickSetCompletedFilter}
                            className={props.filter === 'COMPLETED' ? s.btnCompletedActive : s.btnCompleted}>COMPL
                    </button>
                </div>

                <AddTaskForm
                    onChangeHandler={onChangeHandler}
                    title={props.title}
                    error={error}
                    onKeyPressHandler={onKeyPressAddTask}
                    addTask={addTask}
                    setTaskTitle={setTaskTitle}
                    taskTitle={taskTitle}
                />

                <div className={s.tasks}>
                    {tasksList}
                </div>
            </div>
        </div>
    )
}