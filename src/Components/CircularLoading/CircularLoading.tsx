import s from './CircularLoading.module.css'

export const CircularLoading = () => {
    return (
        <div className={s.container}>
            <div className={s.circularLoading}/>
        </div>
    )
}