//imports
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import s from './ToDoList.module.css'
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";
import {EditableLabel} from "../EditableLabel/EditableLabel";
import {Task} from "../Task/Task";


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
    changeToDoListFilter: (toDoListId: string, filter: FilterValuesType) => void
    removeToDoList: (toDoListsId: string) => void
    editTaskHandler: (ToDoListId: string, tId: string, title: string) => void
    editToDoListTitleHandler: (ToDoListId: string, newTitle: string) => void
}


//components
export const ToDoList = memo((props: ToDoListsPropsType) => {
        console.log('__ToDoList__ ' + props.toDoListId)

        // local state
        let [error, setError] = useState<string | null>(null)
        const [taskTitle, setTaskTitle] = useState<string>("")

        // functions
        const onClickSetAllFilter = () => props.changeToDoListFilter(props.toDoListId, 'ALL')
        const onClickSetActiveFilter = () => props.changeToDoListFilter(props.toDoListId, "ACTIVE")
        const onClickSetCompletedFilter = () => props.changeToDoListFilter(props.toDoListId, "COMPLETED")
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
        const editToDoListHandlerForEditableLabel = (toDoId: string, newTitle: string) => {
            props.editToDoListTitleHandler(props.toDoListId, newTitle)
        }

// MAP TASKS ======================


        return (
            <div className={s.task}>

                <div className={s.titleBoxTasks}>
                    <svg viewBox="0 0 100 80" width="20" height="20">
                        <rect width="100" height="20"/>
                        <rect y="30" width="100" height="20"/>
                        <rect y="60" width="100" height="20"/>
                    </svg>
                    <EditableLabel title={props.title}
                                   editTaskHandlerForEditableLabel={(title) => editToDoListHandlerForEditableLabel(props.toDoListId, title)}
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
                        {props.tasks.map(t => {
                            return (
                                <Task id={t.id}
                                      toDoListId={props.toDoListId}
                                      isDone={t.isDone}
                                      title={t.title}
                                      removeTask={props.removeTask}
                                      editTaskHandler={props.editTaskHandler}
                                      changeTaskStatus={props.changeTaskStatus}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
)