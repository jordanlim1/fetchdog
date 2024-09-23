import React, {SetStateAction, useEffect} from "react"

import { ActiveFiltersProps } from "../../../utils/interfaces";
export default function ActiveFilters({setActiveFilterTags, selectedBreeds, setSelectedBreeds, breedFilterTags, setBreedFilterTags} : ActiveFiltersProps){



function handleDeleteTag(event?: React.MouseEvent<HTMLButtonElement>){

    const breedToDelete = event?.currentTarget.value;

    const updatedTags = selectedBreeds.filter((breed) =>{
            return breed !== breedToDelete
    })

    console.log(updatedTags)

    if(updatedTags.length === 0) {

        setActiveFilterTags(false)  
    }

    setSelectedBreeds(updatedTags)
    setBreedFilterTags(updatedTags)

    //trigger clicking of "Search" to refetch breed results if user deletes a breed filter tag
    setTimeout(() => {
        const targetButton = document.getElementById('filterButton');
        if (targetButton) {
            targetButton.click(); // Trigger the button click
        }
    }, 0);


}




    return (
        <div className="active-filter-tags">
            <p className="filters-applied">Filters Applied: </p>

            {breedFilterTags.sort((a,b) => a.localeCompare(b)).map((breedTag, idx) => {
                return <p key={`${breedTag}+${idx}`}  className="filter-tag">
                {breedTag} 
                {breedTag.length > 2 ? <button onClick={handleDeleteTag} value={breedTag}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              </button> : ""}
              </p>
            })}
        </div>
    )
}