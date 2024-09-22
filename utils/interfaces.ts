import React, { SetStateAction } from "react";
import SelectSearch, {SelectedOptionValue, SelectedOption} from 'react-select-search';


export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
    favorite: boolean;
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
    getNewBreeds: () => void,
    handleSelectionChange: (selectedValue: SelectedOptionValue | SelectedOptionValue[], selectedOption: SelectedOption | SelectedOption[]) => void,
    getDogDetails: (ids: string[], nextQuery?: string | undefined, total?: number | undefined) => void,
    setCurrPage: React.Dispatch<SetStateAction<number | string>>

}

export interface HomeNavBarProps {
    getDogIds: () => void,
    setTotalPages: React.Dispatch<SetStateAction<number>>,
    setSelectedBreeds: React.Dispatch<SetStateAction<string[]>>,

}

export interface MainPageProps {
    addToFavorites: (dog: Dog) => void
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

export interface LogoutProps{
    name?: string,
    email?: string
}