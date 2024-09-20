import React, {useState, useEffect} from "react"
import { BASE_URL } from "../../urls"
import Navbar from "./HomeNavbar"
import DogCard from "./DogCard"

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }
  

export default function MainPage(){

const [dogBreeds, setDogBreeds] = useState<string[]>([])
const [dogs, setDogs] = useState<Dog[]>([])

useEffect(() => {
    getDogBreeds()
    getDogIds()
}, [])

async function getDogBreeds(){
    const res = await fetch(`${BASE_URL}/dogs/breeds`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const data = await res.json()
    setDogBreeds(data)
}

async function getDogIds(){
    const res = await fetch(`${BASE_URL}/dogs/search?size=24`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const data = await res.json()
    getDogDetails(data.resultIds)
}


async function getDogDetails(ids: string[]){
    const res = await fetch(`${BASE_URL}/dogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
        credentials: 'include',
      });


    const data: Dog[] = await res.json()
    setDogs((prev) => [...prev, ...data])
}




    return (
        <div className="container">
            <Navbar />
            <div className="MainPage">
            {dogs.map((dog, idx) => {
                const {age, breed, img, name, zip_code} = dog
                return <DogCard age={age} breed={breed} image={img} name={name} zip_code={zip_code} />
            })}


            </div>
        </div>
    )
}