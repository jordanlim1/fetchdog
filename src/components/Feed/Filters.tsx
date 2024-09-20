import React, {useState, useEffect} from "react"
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';
import 'react-select-search/style.css'; 
import paw from '../../images/paw.png';
import { BASE_URL } from "../../urls";

interface FilterProps{
    breeds: {
        name:string,
        value: string, 
        key: string
    }[]
    selectedBreeds: string[],
    getNewBreeds: () => void,
    handleSelectionChange: (selectedValue: SelectedOptionValue | SelectedOptionValue[], selectedOption: SelectedOption | SelectedOption[]) => void,
    getDogDetails: (ids: string[], nextQuery?: string | undefined, total?: number | undefined) => void,

}

export default function Filters({breeds, selectedBreeds, handleSelectionChange, getDogDetails, getNewBreeds}: FilterProps){


    const [minAge, setMinAge] = useState("")
    const [maxAge, setMaxAge] = useState("")


    function setAges(e: React.ChangeEvent<HTMLInputElement>){
      const {name, value} = e.target
      if(name === "minAge") setMinAge(value)
      else if (name === "maxAge") setMaxAge(value)
    }


    async function handleAgeFilter(){

     if (minAge){
        const res = await fetch(`${BASE_URL}/dogs/search?size=12&breeds=${selectedBreeds}&sort=name:asc&ageMin=${minAge}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })


        const data = await res.json()
        console.log("minage", data)
        getDogDetails(data.resultIds, data.next, data.total)
        
     }
    else getNewBreeds()

    }

    return(
      <>
        <div className="filterByBreed">
                            
        <img className="paw" src={paw} alt="Paw Icon" />
        <SelectSearch
            placeholder="Breed"
            options={breeds}
            search
            value={selectedBreeds}
            onChange={handleSelectionChange}
        />
    </div>

    <div className="filterByAge">
        <img className="paw" src={paw} alt="Paw Icon" />
        <label htmlFor="minAge">
        <input placeholder="Min Age" name="minAge" type="number" value={minAge} onChange={setAges} />
        </label>
        <span> &mdash; </span>
        <label htmlFor="maxAge">
        <input placeholder="Max Age" name="maxAge" type="number" value={maxAge} onChange={setAges}/>
        </label>
        <button onClick={handleAgeFilter}>Go</button>
    </div>
    </>
    )
}