import React, { SetStateAction } from "react";
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';




export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;

  }
  

export interface DogCardProps {
    age: number,
    breed: string,
    image: string,
    name: string,
    zip_code: string,
    dog?: Dog,
    addToFavorites?: (dog: Dog) => void
}

export interface FilterProps{
    breeds: {
        name:string,
        value: string, 
        key: string
    }[]
    selectedBreeds: string[],
    handleSelectionChange: (selectedValue: SelectedOptionValue | SelectedOptionValue[], selectedOption: SelectedOption | SelectedOption[]) => void,
    getDogDetails: (ids: string[], nextQuery?: string | undefined, total?: number | undefined) => void,
    setCurrPage: React.Dispatch<SetStateAction<number | string>>,
    setBreedFilterTags: React.Dispatch<SetStateAction<string[]>>,
    getDogIds: () => void,
    setActiveFilterTags: React.Dispatch<SetStateAction<boolean>>

}

export interface MainNavBarProps {
    getDogIds: () => void,

}

export interface MainPageProps {
    addToFavorites: (dog: Dog) => void,
}

export interface PageFooterProps {
    totalPages: number,
    nextQuery: string,
    setNextQuery: React.Dispatch<SetStateAction<string>>
    getDogDetails: (ids: string[], nextQuery?: string, total?: number) => void,
    selectedBreeds: string[],
    currPage: number | string,
    setCurrPage: React.Dispatch<SetStateAction<number | string>>

}

export interface FavoriteDogsProps {
    favoriteDogs: Dog[]
}

export interface ModalProps {
    match: Dog,
    showModal: boolean,
    onClose: () => void
}




export interface ActiveFiltersProps{
    setActiveFilterTags: React.Dispatch<SetStateAction<boolean>>,
    selectedBreeds: string[],
    setSelectedBreeds: React.Dispatch<SetStateAction<string[]>>,
    breedFilterTags: string[],
    setBreedFilterTags: React.Dispatch<SetStateAction<string[]>>,
}
