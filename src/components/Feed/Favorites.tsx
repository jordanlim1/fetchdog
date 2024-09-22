import React, {useState} from "react"
import { Dog, FavoritesProps } from "../../../utils/interfaces"
import DogCard from "./DogCard"

export default function Favorites({favoriteDogs}: FavoritesProps){




    return (
        <div>
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

        </div>
    )
}