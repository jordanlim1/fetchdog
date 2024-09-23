import React, {useRef, useEffect} from "react"
import DogCard from "../Feed/DogCard"
import { ModalProps } from "../../../utils/interfaces";

export default function Modal({match, showModal, onClose}: ModalProps){

    if(!showModal) return null;


    const { age, breed, img, name, zip_code } = match;


    return (
        <div className="modal-overlay">
            <div className="modal-content"> 
            <h2 id="modalText">Your paw-fect companion awaits!</h2>
            <DogCard
                age={age}
                breed={breed}
                image={img}
                name={name}
                zip_code={zip_code}
            />

            <button onClick={() => onClose()}>Close</button>
            </div>
        </div>
    )
}