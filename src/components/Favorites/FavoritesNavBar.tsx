import React from "react"
import { useNavigate } from "react-router";
import logo from '../../images/logo.png';
import Logout from "../../Logout";

export default function FavoritesNavBar(){

const navigate = useNavigate()

function handleClick(){
    navigate('/main')
}


    return (
        <div className="home-navbar">
            <h1 onClick={handleClick}>fetch <img src={logo} alt="logo"/></h1> 
            
           <Logout/>
        </div>
    )
}
