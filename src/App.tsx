import React, {useState} from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import MainPage from "./components/Feed/MainPage";
import FavoriteDogs from "./components/Favorites/FavoriteDogs";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }
  

export default function App(){

const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([])
const [showPopup, setShowPopup] = useState(false);



    function addToFavorites(dog: Dog) {
        const isAlreadyFavorite = favoriteDogs.some(favoriteDog => favoriteDog.id === dog.id);
    
        if (!isAlreadyFavorite) {
            setFavoriteDogs((prev) => [...prev, dog]);
        }    


        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000); 
    }


    return (
        <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path ='/' element = {<MainPage addToFavorites={addToFavorites} show={showPopup} />} /> 
          <Route path='/favorites' element={<FavoriteDogs favoriteDogs={favoriteDogs} />}/>
        </Routes>
      </Router>
    )
}