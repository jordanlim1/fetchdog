import React, {useState, useEffect, useRef} from "react"
import { BASE_URL } from "../../../utils/urls"
import { RESULTS_PER_PAGE } from "../../../utils/constants"
import MainNavbar from "./MainNavbar"
import DogCard from "./DogCard"
import PageFooter from "./PageFooter"
import Filters from "./Filters"
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';
import 'react-select-search/style.css'; 
import { MainPageProps, Dog } from '../../../utils/interfaces';
import ActiveFilters from "./ActiveFilters"
import Popup from "./Popup"

export default function MainPage({addToFavorites, show}: MainPageProps){

    

const [dogBreeds, setDogBreeds] = useState<string[]>([])
const [dogs, setDogs] = useState<Dog[]>([])
const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
const [totalPages, setTotalPages] = useState(1)
const [currPage, setCurrPage] = useState <number | string>(1)
const [nextPageQuery, setNextPageQuery] = useState("")
const [showPopup, setShowPopup] = useState(false);
const [activeFilterTags, setActiveFilterTags] = useState(false)
const [breedFilterTags, setBreedFilterTags] = useState<string[]>([])

useEffect(() => {
    getDogBreeds()
    getDogIds()
}, [])

// function backToTop(){
//     document.getElementById("home-navbar")?.scrollIntoView({   behavior: 'smooth' })
// }

// useEffect(() =>{
//     backtotop()
// }, [dogs])


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
    return {name: breed, value: breed, key: `${breed}-${idx}` 
}
})

async function getDogIds(){
    const res = await fetch(`${BASE_URL}/dogs/search?size=${RESULTS_PER_PAGE}&sort=breed:asc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    //intial page load reset everything

    setTotalPages(1)
    setCurrPage(1)
    setCurrPage(Number(1))
    setSelectedBreeds([])
    setBreedFilterTags([])
    setActiveFilterTags(false)
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
    if(total) setTotalPages(Math.floor(total / RESULTS_PER_PAGE))
    
    setDogs(data)
    

}




function handleSelectionChange(selectedValue: SelectedOptionValue | SelectedOptionValue[], selectedOption: SelectedOption | SelectedOption[]){


    if (Array.isArray(selectedValue)) {
        const stringValues = selectedValue.map(value => value.toString()); // Convert values to strings
        setSelectedBreeds(stringValues);
      }

}




    return (
            <div className="home-page">
                <MainNavbar getDogIds={getDogIds} />
                    <main>
                    <section className="filter">
                        <Filters breeds={breeds} selectedBreeds={selectedBreeds}  
                        handleSelectionChange={handleSelectionChange} getDogDetails={getDogDetails} setCurrPage={setCurrPage} 
                        setBreedFilterTags={setBreedFilterTags} 
                        getDogIds ={getDogIds} setActiveFilterTags={setActiveFilterTags} 
                        />
                    </section>
    
            {activeFilterTags ? <ActiveFilters setActiveFilterTags={setActiveFilterTags} selectedBreeds={selectedBreeds} setSelectedBreeds={setSelectedBreeds} breedFilterTags={breedFilterTags} setBreedFilterTags={setBreedFilterTags} /> : "" }
                    <section className="card-holder">
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
    
               <Popup show={show}/>
            </div>
        );
}