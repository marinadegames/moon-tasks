import React, {memo, useCallback, useEffect} from "react";
import s from './ToDoList.module.css'
import {EditableLabel} from "../EditableLabel/EditableLabel";
import {TaskType} from "../../api/todolist-api";
import {useDispatch} from "react-redux";
import {fetchTasks} from "../../redux/tasksReducer";
import {UniversalAddForm} from "../UniversalAddForm/UniversalAddForm";
import {FilterValuesType} from "../../helpers/helpers";
import {TodolistTitleIconList} from "./todolistTitleIconList";
import {Task} from "../Task/Task";
import {CircularLoadingSmall} from "../CircularLoading/CircularLoadingSmall";

type ToDoListsPropsType = {
    toDoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, toDoListId: string) => void
    removeTask: (id: string, toDoListId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: number) => void
    changeToDoListFilter: (toDoListId: string, filter: FilterValuesType) => void
    removeToDoList: (toDoListsId: string) => void
    editTaskHandler: (ToDoListId: string, tId: string, title: string) => void
    editToDoListTitleHandler: (ToDoListId: string, newTitle: string) => void
}

export const ToDoList = memo((props: ToDoListsPropsType) => {

        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(fetchTasks(props.toDoListId))
        }, [dispatch, props.toDoListId])

        const onClickSetAllFilter = () => props.changeToDoListFilter(props.toDoListId, 'ALL')
        const onClickSetActiveFilter = () => props.changeToDoListFilter(props.toDoListId, "ACTIVE")
        const onClickSetCompletedFilter = () => props.changeToDoListFilter(props.toDoListId, "COMPLETED")
        const addTaskHandler = useCallback((title: string) => props.addTask(title.trim(), props.toDoListId), [props])
        const editToDoListHandlerForEditableLabel = useCallback((toDoId: string, newTitle: string) => {
            props.editToDoListTitleHandler(props.toDoListId, newTitle)
        }, [props])

        return (
            <div className={s.task}>
                <div className={s.titleBoxTasks}>
                    <TodolistTitleIconList/>
                    <EditableLabel titleProps={props.title}
                                   editTaskHandlerForEditableLabel={(title) => editToDoListHandlerForEditableLabel(props.toDoListId, title)}
                                   className={''}/>
                    <button className={s.deleteTaskBtn} onClick={() => props.removeToDoList(props.toDoListId)}>X</button>
                </div>
                <div className={s.tasksBox}>
                    <div className={s.buttonFilters}>
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
                    <div className={s.addTaskFormBox}>
                        <UniversalAddForm callback={addTaskHandler} placeholder={'add task'}/>
                    </div>
                    <div className={s.tasks}>
                        {props.tasks.length === 0
                            ? <CircularLoadingSmall/>
                            : props.tasks.map(t => {
                                return (
                                    <Task id={t.id}
                                          key={t.id}
                                          toDoListId={props.toDoListId}
                                          status={t.status}
                                          title={t.title}
                                          removeTask={props.removeTask}
                                          editTaskHandler={props.editTaskHandler}
                                          changeTaskStatus={props.changeTaskStatus}
                                    />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
)