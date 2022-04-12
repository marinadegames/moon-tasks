import React from "react";

type propsType = {
    title: string
}

export const Button = (props: propsType) => {
    return (
        <button>{props.title}</button>
    )
}