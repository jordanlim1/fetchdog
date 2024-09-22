import React, {useState, useEffect, useRef} from "react"
import { BASE_URL } from "../../../utils/urls"
import Navbar from "./HomeNavbar"
import DogCard from "./DogCard"
import PageFooter from "./PageFooter"
import Filters from "./Filters"
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';
import 'react-select-search/style.css'; 
import { MainPageProps, Dog } from '../../../utils/interfaces';

export default function MainPage({addToFavorites}: MainPageProps){

const [dogBreeds, setDogBreeds] = useState<string[]>([])
const [dogs, setDogs] = useState<Dog[]>([])
const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
const [totalPages, setTotalPages] = useState(1)
const [currPage, setCurrPage] = useState <number | string>(1)
const [nextPageQuery, setNextPageQuery] = useState("")
const [showPopup, setShowPopup] = useState(false);


useEffect(() => {
    getDogBreeds()
    getDogIds()
}, [])

async function getDogBreeds(){
    console.log("im called")
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
    console.log("dog details", data)
    const updatedDogs = data.map((dog) => ({
        ...dog, // Spread the existing dog properties
        favorite: false // Add a favorite key with a default value of false
    }));
    if(nextQuery) setNextPageQuery(nextQuery)
     //for age filter
    if(total) setTotalPages(Math.floor(total / 12) + 1)
    
    setDogs(updatedDogs)
}




function handleSelectionChange(selectedValue: SelectedOptionValue | SelectedOptionValue[], selectedOption: SelectedOption | SelectedOption[]){
    if(selectedValue.toString() !== selectedBreeds[0]) 
    setSelectedBreeds([selectedValue.toString()]);
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
    const res = await fetch(`${BASE_URL}/dogs/search?size=12&breeds=${selectedBreeds}&sort=name:asc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    const data = await res.json()
    setTotalPages(Math.floor(data.total / 12) + 1)
    setNextPageQuery(data.next)
    getDogDetails(data.resultIds)
}


    return (
            <div className="MainPage">
                <Navbar getDogIds={getDogIds} setTotalPages ={setTotalPages} setSelectedBreeds ={setSelectedBreeds}/>
                    <main>
                    <section className="filter">
                        <Filters breeds={breeds} selectedBreeds={selectedBreeds} getNewBreeds ={getNewBreeds} handleSelectionChange={handleSelectionChange} getDogDetails={getDogDetails} setCurrPage={setCurrPage}/>
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
                                    dog={dog}
                                    addToFavorites={addToFavorites}
                                    
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