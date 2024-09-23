import React, {useState} from "react"
import { DogCardProps, Dog } from '../../../utils/interfaces';


  

export default function DogCard({age, breed, image, name, zip_code, dog, addToFavorites}: DogCardProps){



    
   
    return (
        <div className="dog-cards" >


{addToFavorites ?  <button className="favoriteButton" onClick={() => addToFavorites!(dog!)} >
        
       
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          
          height="5vh"
          className={'notFavorited'}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1 4.5 2.09C13.09 4 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="purple" /* Purple outline */
            strokeWidth="2" 
          />
        </svg>
        </button> : ""}
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>Breed: {breed}</p>
            <p>Age: {age}</p>
            <p>Location: {zip_code}</p>
            
        </div>
    )
}