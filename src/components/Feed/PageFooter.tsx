import React, {useState} from "react"
import { BASE_URL } from "../../urls"

interface PageFooterProps {
    totalPages: number,
    nextQuery: string,
    getDogDetails: (ids: string[], nextQuery?: string, prevQuery?: string) => void
}

export default function PageFooter({totalPages, nextQuery, getDogDetails}: PageFooterProps){
    const [currPage, setCurrPage] = useState(1)
    const [prevQuery, setPrevQuery] = useState("")

    async function handlePrevPage(){
        if(currPage <= 1) return -1
        setCurrPage(currPage - 1)
        const res = await fetch(`${BASE_URL}${prevQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })


        const data = await res.json()
        console.log("newdata", data)
        setPrevQuery(data.prev)
        getDogDetails(data.resultIds, data.prev)


    }
    
    async function handleNextPage(){
        if(currPage >= totalPages) return -1
        
        setCurrPage(currPage + 1)


        const res = await fetch(`${BASE_URL}${nextQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })


        const data = await res.json()
        console.log("newdata", data)
        getDogDetails(data.resultIds, data.next)
    }
    

    return(
        <div>
            <button onClick={handlePrevPage}>Prev</button>
            {currPage} of {totalPages}
            <button onClick={handleNextPage}>Next</button>
        </div>
    )
}