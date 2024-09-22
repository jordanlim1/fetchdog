import React, {useState} from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import MainPage from "./components/Feed/MainPage";
import Favorites from "./components/Feed/Favorites";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
    favorite: boolean;
  }
  

export default function App(){

const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([])



    function addToFavorites(dog: Dog) {
        setFavoriteDogs((prev) => [...prev, dog])
       
    }


    return (
        <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path ='/' element = {<MainPage addToFavorites={addToFavorites}/>} /> 
          <Route path='/favorites' element={<Favorites favoriteDogs={favoriteDogs/>}/>
        </Routes>
      </Router>
    )
}