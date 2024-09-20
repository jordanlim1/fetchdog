import React, {useState, useEffect} from "react"
import { BASE_URL } from "../../urls"
import Navbar from "./HomeNavbar"
import DogCard from "./DogCard"
import PageFooter from "./PageFooter"
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';
import 'react-select-search/style.css'; 


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
const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
const [totalPages, setTotalPages] = useState(1)
const [nextPageQuery, setNextPageQuery] = useState("")

useEffect(() => {
    getDogBreeds()
    getDogIds()
}, [])

//once user selects a breed, fetch new data to update dog card state
useEffect(() => {
    getNewBreeds()
}, [selectedBreeds])

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
    const res = await fetch(`${BASE_URL}/dogs/search?size=12&sort=breed:asc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const data = await res.json()

    getDogDetails(data.resultIds)
}


//nextQuery has to be propped drilled down because of the initial fetch in parent component which will give us the first next url
async function getDogDetails(ids: string[], nextQuery?: string){
    const res = await fetch(`${BASE_URL}/dogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
        credentials: 'include',
      });


    const data: Dog[] = await res.json()
    if(nextQuery) setNextPageQuery(nextQuery)
    setDogs(data)
}


const breeds = dogBreeds.map((breed: string, idx: number) => {
    return {name: breed, value: breed, key: `${breed}-${idx}` // Adding unique key for each option
}
})

function handleSelectionChange(selectedValue: SelectedOptionValue | SelectedOptionValue[], selectedOption: SelectedOption | SelectedOption[]){
    setSelectedBreeds([selectedValue.toString()]);
}




async function getNewBreeds(){
    const res = await fetch(`${BASE_URL}/dogs/search?size=12&breeds=${selectedBreeds}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const data = await res.json()
    setTotalPages(Math.floor(data.total / 10) + 1)
    console.log(data)
    setNextPageQuery(data.next)
    getDogDetails(data.resultIds)
}


    return (
        <div className="container">
            <Navbar />
            <div className="filter"> 
                <h2> Dog Profiles </h2> 
                <span>Filter By </span>
                <div style={{display: "flex", alignItems: "center", border:"none", height: "5vh"}}> 
                    <span style={{marginRight:"10px"}}>Breed </span>
                    <SelectSearch
                        placeholder="Select..."
                        options={breeds}
                        search
                        value={selectedBreeds}
                        onChange={handleSelectionChange}
                    />

                </div>
                <span> Age </span>
                <span> Zipcode </span>
            
            </div>

            <div className="MainPage">
            {dogs.map((dog: Dog, idx: number) => {
                const {age, breed, img, name, zip_code} = dog
                return <DogCard age={age} breed={breed} image={img} name={name} zip_code={zip_code} key={`${dog}+${idx}`}  />
            })}
            </div>
            <PageFooter totalPages={totalPages} nextQuery={nextPageQuery} getDogDetails={getDogDetails}/>
        </div>
    )
}