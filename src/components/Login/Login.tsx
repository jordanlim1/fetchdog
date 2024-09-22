import React, {useState, useEffect} from "react"
import Navbar from "./LoginNavbar.tsx"
import Footer from "./Footer.tsx"
import Dog4 from "../../images/dog4.png"

import Dog3 from "../../images/dog3.jpg"
import Dog2 from "../../images/dog2.jpg"
import Dog1 from "../../images/dog1.jpg"
import { useNavigate } from "react-router"
import {BASE_URL} from "../../../utils/urls.ts"
export default function Login(){
const [credentials, setCredentials] = useState({name: "", email: ""})
const navigate = useNavigate()
function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setCredentials((prev: {name: string, email: string}) => ({
        ...prev,
        [e?.target?.name] : e?.target?.value
    }))
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const body ={
        name: credentials.name,
        email: credentials.email
    }

try{
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body),
        credentials: "include"
    })

   if(!res.ok) {
    alert("Invalid email or name. Please try again! ")
    setCredentials({name:"", email: ""})
   }
   else {
    navigate("/main")
   }

} catch(err){
    console.log("Error in login", err)
}
}

    return (
    <div> 
        <Navbar />

        <div className="login-page">
        <div className="left">
            <img src={Dog1} />
            <img src={Dog2}/>
            <img src={Dog3} />
            <img src={Dog4} />
        </div>

        <div className="credentials-container">
            <p id="loginCalltoAction"> Become part of Fetch today!</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <input placeholder="Name"name="name" value={credentials.name} onChange={handleChange} required/>
                </label>
                <label htmlFor="email">
                    <input placeholder="Email" name="email" value={credentials.email} onChange={handleChange} required/>
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
        <Footer/>
    </div>
    )
}