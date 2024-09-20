import React, {useState, useEffect, useRef} from "react"
import { BASE_URL } from "../../urls"
import Navbar from "./HomeNavbar"
import DogCard from "./DogCard"
import PageFooter from "./PageFooter"
import Filters from "./Filters"
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';
import 'react-select-search/style.css'; 
import paw from '../../images/paw.png';


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
const [currPage, setCurrPage] = useState <number | string>(1)

const [nextPageQuery, setNextPageQuery] = useState("")


useEffect(() => {
    getDogBreeds()
    getDogIds()
}, [])

//once user selects a breed, fetch new data to update dog card state
// const isFirstRun = useRef(true); // Tracks if this is the first render

//   useEffect(() => {
//     // If it's the first run, skip the effect
//     if (isFirstRun.current) {
//       isFirstRun.current = false;  // Set the ref to false after the first render
//       return;
//     }

//     // Your effect logic here
//     getNewBreeds();
//   }, [selectedBreeds]);

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

const breeds = dogBreeds.map((breed: string, idx: number) => {
    return {name: breed, value: breed, key: `${breed}-${idx}` // Adding unique key for each option
}
})

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
async function getDogDetails(ids: string[], nextQuery?: string, total?:number){
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
     //for age filter
    if(total) setTotalPages(Math.floor(total / 12) + 1)

        console.log("in details", data, nextQuery)
    setDogs(data)
}




function handleSelectionChange(selectedValue: SelectedOptionValue | SelectedOptionValue[], selectedOption: SelectedOption | SelectedOption[]){
    if(selectedValue.toString() !== selectedBreeds[0]) 
    setSelectedBreeds([selectedValue.toString()]);
    setCurrPage(1)
    //If we want to select multiple breeds
    // if (Array.isArray(selectedValue)) {
    //     const stringValues = selectedValue.map(value => value.toString()); // Convert values to strings
    //     setSelectedBreeds(stringValues);
    //   }
}



//Potential approach if user wants to select multiple breeds from drop down bc the api does not automatically combine breed query

// async function getNewBreeds(){

//     console.log(selectedBreeds)
//     const allBreeds = selectedBreeds.map(async(breed) => {
//     const res = await fetch(`${BASE_URL}/dogs/search?size=4&breeds=${[breed]}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: "include"
//     })

//     const data = await res.json()

//     return data
//     })


//     const res = await Promise.all(allBreeds)
//     console.log(res)

//     let total = 0
//     for(let i = 0; i < res.length; i++){
//         total += res[i].total
//     }

//     setCurrBreedTotal(Math.floor(res[index].total/4) + 1)

//     setTotalPages(Math.floor(total /4) + 1)

//     if(res[index].next) {
//     setNextPageQuery(res[index].next)
//     }

//     getDogDetails(res[index].resultIds)
// }

async function getNewBreeds(){
    console.log("hello")
    const res = await fetch(`${BASE_URL}/dogs/search?size=12&breeds=${selectedBreeds}&sort=name:asc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const data = await res.json()
    setTotalPages(Math.floor(data.total / 12) + 1)
    console.log("in new breeds", data)
    setNextPageQuery(data.next)
    getDogDetails(data.resultIds)
}


    return (
            <div className="MainPage">
                <Navbar />
                    <main>
                    <section className="filter">
                        {/* <div className="filterByBreed">
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
                            <input placeholder="Min Age" type="number" />
                            </label>
                            <span> &mdash; </span>
                            <label htmlFor="maxAge">
                            <input placeholder="Max Age" type="number" />
                            </label>
                        </div> */}
                        <Filters breeds={breeds} selectedBreeds={selectedBreeds} getNewBreeds ={getNewBreeds} handleSelectionChange={handleSelectionChange} getDogDetails={getDogDetails}/>
                    </section>
    
                    <section className="CardHolder">
                        {dogs.map((dog: Dog, idx: number) => {
                            const { age, breed, img, name, zip_code } = dog;
                            return (
                                <DogCard
                                    key={`${dog.id}-${idx}`} // Make sure the key is unique and uses dog's id
                                    age={age}
                                    breed={breed}
                                    image={img}
                                    name={name}
                                    zip_code={zip_code}
                                />
                            );
                        })}
                    <PageFooter
                    totalPages={totalPages}
                    nextQuery={nextPageQuery}
                    setNextQuery={setNextPageQuery}
                    getDogDetails={getDogDetails}
                    selectedBreeds={selectedBreeds}
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                    />
                    
                    </section>
                    
                </main>
    
               
            </div>
        );
}