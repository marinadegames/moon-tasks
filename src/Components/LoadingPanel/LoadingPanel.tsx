import s from './LoadingPanel.module.css'
import {memo} from "react";
import {StatusesType} from "../../redux/appReducer";

type PropsType = {
    status: StatusesType
    speed: string
}

export const LoadingPanel = memo((props: PropsType) => {

        // return
        return (
            <div className={s.loadContainer}>
                <div className={props.status === 'loading' ? s.loadingPanelBOX : s.loadContainer_HIDDEN}
                     style={{animationDuration: `${props.speed}`}}>
                    <div className={s.loadingPanel}/>
                </div>
            </div>
        )
    }
)