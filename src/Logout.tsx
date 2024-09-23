import React, {useState, useEffect} from "react"
import { BASE_URL } from "../utils/urls";
import { useNavigate } from "react-router";

export default function Logout(){

const navigate = useNavigate()

    async function handleLogout(){
        try {
        const res = await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })


        if(res.ok) navigate('/')
    }  catch(err){
    console.log("Error in logout component", err)
    }
    }
    return (
        <button id="logout" onClick={handleLogout}>Logout</button>
    )
}
