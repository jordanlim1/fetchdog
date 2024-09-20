import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import MainPage from "./components/Feed/MainPage";

export default function App(){


    return (
        <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path ='/' element = {<MainPage />} /> 
        </Routes>
      </Router>
    )
}