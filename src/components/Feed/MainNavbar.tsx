import React from "react"
import logo from '../../images/logo.png';
import { MainNavBarProps } from '../../../utils/interfaces';
import { useNavigate } from "react-router";
import Logout from "../../Logout";

export default function MainNavbar({getDogIds}: MainNavBarProps){

    const navigate = useNavigate()


    //bring user back to home page, reset all filters and totalPage to 1
    function handleClick(){
        getDogIds()
    }

    return (
        <div className="home-navbar">
            <h1 onClick={handleClick}>fetch <img src={logo} alt="logo"/></h1> 
            
            <div className="navbar-buttons"> 
            <button onClick={() => navigate('/favorites')}>Favorites</button>
            <Logout  />
            </div>
        </div>
    )
}