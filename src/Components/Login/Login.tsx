import s from './Login.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import React, {memo} from "react";
import {rootReducerType} from "../../redux/store";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = memo(() => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required field';
            } else if (!regex.test(values.email)) {
                errors.email = 'Invalid email address!';
            }
            if (values.password.length < 3) {
                errors.password = 'Password should be more 3 symbols!'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
            console.log(values);
        },
    })

    if (isLoggedIn) return <Navigate to={'/'}/>

    return (
        <div className={s.loginContainer}>

            <h2 style={{color: 'var(--generalColor)'}}>
                Hello, friend!
            </h2>
            <div style={{
                color: 'var(--generalColor)',
                textAlign: 'center',
                margin: '0 0 20px 0'
            }}>
                <p>To log in get registered
                    <> </>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}> here
                    </a>
                </p>
                or use common test account credentials:<br/>
                <b>Email:</b> free@samuraijs.com<br/>
                <b>Password:</b> free
            </div>
            <form className={s.boxInputLogin} onSubmit={formik.handleSubmit}>

                <div className={s.inputBox}>
                    <input className={s.loginInput}
                           placeholder={'Email'}
                           {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email &&
                        <small className={s.errorMsg}>{formik.errors.email}</small>}
                </div>

                <div className={s.inputBox}>
                    <input className={s.loginInput}
                           placeholder={'Password'}
                           {...formik.getFieldProps('password')}
                           type={'password'}/>
                    {formik.errors.password && formik.touched.password &&
                        <small className={s.errorMsg}>{formik.errors.password}</small>}
                </div>

                <label className={s.labelBox}>
                    <div className="checkbox">
                        <input className={s.customCheckbox}
                               type="checkbox"
                               id="color-1"
                               {...formik.getFieldProps('rememberMe')}/>
                        <label htmlFor="color-1">
                            Remember me
                        </label>
                    </div>
                </label>
                <button className={s.loginButton}>Login</button>
            </form>
        </div>
    )
})