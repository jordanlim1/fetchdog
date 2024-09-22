import React, {useState, useEffect, SetStateAction} from "react"
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';
import 'react-select-search/style.css'; 
import paw from '../../images/paw.png';
import { BASE_URL } from "../../../utils/urls";
import { FilterProps } from '../../../utils/interfaces';



export default function Filters({breeds, selectedBreeds, handleSelectionChange, getDogDetails, getNewBreeds, setCurrPage}: FilterProps){


    const [minAge, setMinAge] = useState("")
    const [maxAge, setMaxAge] = useState("")


    function setAges(e: React.ChangeEvent<HTMLInputElement>){
      const {name, value} = e.target
      if(Number(value) < 0) {
        alert("Please enter a valid age")
        return -1
      }
      if(name === "minAge") setMinAge(value)
      else if (name === "maxAge") setMaxAge(value)
    }


    async function handleFilters(){


    setCurrPage(1)

    //if no age requirements, just fetch the breed
    if(!minAge && !maxAge) return getNewBreeds()
    
    let url = `${BASE_URL}/dogs/search?size=12&breeds=${selectedBreeds}&sort=name:asc`;

    // Check for minAge and maxAge to adjust the query string
    if (minAge && maxAge) {
      url += `&ageMin=${minAge}&ageMax=${maxAge}`;
    } else if (minAge) {
      url += `&ageMin=${minAge}`;
    } else if (maxAge) {
      url += `&ageMax=${maxAge}`;
    }


    try{ 
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })


        const data = await res.json()
        getDogDetails(data.resultIds, data.next, data.total)
      
    }catch(err){
        console.log("Error in filter component", err)
    }

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
        <button className="filterSearch" onClick={handleFilters} >Search</button>
    </div>
    </>
    )
}