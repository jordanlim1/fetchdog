import React from "react"
import { PopupProps } from "../../../utils/interfaces"
export default function Popup({show} : PopupProps){
    return (
        <p className={`popup ${show ? "show" : ""}`}>Added to favorites!</p>
    )
}