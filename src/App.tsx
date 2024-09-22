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
    favorite: boolean;
  }
  

export default function App(){

const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([{
    "img": "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11365.jpg",
    "name": "Lea",
    "age": 11,
    "breed": "Affenpinscher",
    "zip_code": "36032",
    "id": "RHGFTIcBOvEgQ5OCx8A1",
    "favorite": false
}, {
    "img": "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11365.jpg",
    "name": "Lea",
    "age": 11,
    "breed": "Affenpinscher",
    "zip_code": "36032",
    "id": "RHGFTIcBOvEgQ5OCx8A1",
    "favorite": false
},{
    "img": "https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_11365.jpg",
    "name": "Lea",
    "age": 11,
    "breed": "Affenpinscher",
    "zip_code": "36032",
    "id": "RHGFTIcBOvEgQ5OCx8A1",
    "favorite": false
}])



    function addToFavorites(dog: Dog) {
        if(!favoriteDogs.includes(dog))setFavoriteDogs((prev) => [...prev, dog])

            console.log(dog)
    }


    return (
        <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path ='/' element = {<MainPage addToFavorites={addToFavorites}/>} />  */}
          <Route path='/' element={<FavoriteDogs favoriteDogs={favoriteDogs} />}/>
        </Routes>
      </Router>
    )
}