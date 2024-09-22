import React from "react"
import logo from '../../images/logo.png';
import { HomeNavBarProps } from '../../../utils/interfaces';



export default function HomeNavbar({getDogIds, setTotalPages, setSelectedBreeds}: HomeNavBarProps){

    //bring user back to home page, reset all filters and totalPage to 1
    function handleClick(){
        getDogIds()
        setTotalPages(1)
        setSelectedBreeds([])
    }

    return (
        <div className="HomeNavbar">
            <h1 onClick={handleClick}>fetch <img src={logo} alt="logo"/></h1> 
            
            <button>Logout</button>
        </div>
    )
}