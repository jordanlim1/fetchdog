import React from "react"

interface DogProps {
    age: number,
    breed: string,
    image: string,
    name: string,
    zip_code: string,
}

export default function DogCard({age, breed, image, name, zip_code}: DogProps){
    return (
        <div className="dogCards">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>Breed: {breed}</p>
            <p>Age: {age}</p>
            <p>Location: {zip_code}</p>
           
        </div>
    )
}