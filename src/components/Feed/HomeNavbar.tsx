import React from "react"
import logo from '../../images/logo.png';

export default function HomeNavbar(){
    return (
        <div className="HomeNavbar">
            <h1>fetch <img src={logo} alt="logo"/></h1> 
            
            <button>Logout</button>
        </div>
    )
}