import React, {useState} from "react"
import { Dog, FavoriteDogsProps } from "../../../utils/interfaces"
import DogCard from "../Feed/DogCard"
import FavoritesNavBar from "./FavoritesNavBar"
import { BASE_URL } from "../../../utils/urls"
import Modal from "./Modal"
import paw from '../../images/paw.png';

export default function FavoriteDogs({favoriteDogs}: FavoriteDogsProps){

console.log(favoriteDogs)
const [match, setMatch] = useState<Dog | undefined>()
const [showModal, setShowModal] = useState(false)

    async function findMatch(){

        const favoriteDogIds = favoriteDogs.map((dog) => {
            return dog.id
        })


        const res = await fetch(`${BASE_URL}/dogs/match`, {
                    method: 'POST',
                    body: JSON.stringify(favoriteDogIds),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include"
            })
            
        const data = await res.json()


       const perfectMatch = favoriteDogs.filter((dog) => {
            if(data.match == dog.id) {
                return true;
            }

            return false
        })



        setMatch(perfectMatch[0])

        setShowModal(true)
    }


    function onClose(){
        setShowModal(false)
    }
    

    return (
        <div className="home-page">
        <FavoritesNavBar />
        <main>
        <h2 className="favorite-page-header">The best companions are the ones you choose with your heart.</h2>
        <section className="favorites-cardholder">
            {favoriteDogs.map((favoriteDog, idx) => {
                const { age, breed, img, name, zip_code } = favoriteDog;
                return (
                    <DogCard
                        key={`${favoriteDog.id}-${idx}`} // Make sure the key is unique and uses dog's id
                        age={age}
                        breed={breed}
                        image={img}
                        name={name}
                        zip_code={zip_code}
   
                    />
                )
            })}

        </section>

        <div className="match-button"> 
            <button onClick={findMatch}>
                <img src={paw} className="match-paw"/>
                Find My Perfect Match!
            </button>
        </div>

        </main>

        <Modal match={match!} showModal={showModal} onClose={onClose}/>
        </div>
    )
}