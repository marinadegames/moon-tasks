import s from './CircularLoadingSmall.module.css'

type PropsType = {
    isInitialized?: boolean
}
export const CircularLoadingSmall = ({isInitialized}: PropsType) => {
    return (
        <>
            {isInitialized
                ?
                <div className={s.container}>
                    <div className={s.circularLoading}/>
                </div>
                : null}
        </>
    )

}