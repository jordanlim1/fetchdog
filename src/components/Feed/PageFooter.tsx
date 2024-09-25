import React, {useState, Dispatch, SetStateAction, useEffect } from "react"
import { BASE_URL } from "../../../utils/urls"
import { PageFooterProps} from '../../../utils/interfaces';


export default function PageFooter({totalPages, nextQuery, setNextQuery, getDogDetails, selectedBreeds, currPage, setCurrPage}: PageFooterProps){
    //make currPage a string only to clear page number if user focuses on input
    const [prevQuery, setPrevQuery] = useState("")
    const [originalPage, setOriginalPage] = useState(0)
    const [isTyping, setIsTyping] = useState(false) //disable user from hitting prev or next page if searching for a page 



    async function handlePrevPage(){
        if(Number(currPage)  <= 1) return -1
        setCurrPage(Number(currPage) - 1)
        const res = await fetch(`${BASE_URL}${prevQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })


        const data = await res.json()
        if(data.prev) setPrevQuery(data.prev)
        setNextQuery(data.next)
        getDogDetails(data.resultIds)
    }
    
   
    async function handleNextPage(){
        if(Number(currPage)  >= totalPages) return -1
        
       
        setCurrPage(Number(currPage) + 1)

        const res = await fetch(`${BASE_URL}${nextQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })


        const data = await res.json()
        if(data.prev) setPrevQuery(data.prev)
        getDogDetails(data.resultIds, data.next)
    }
    


    

    function handleChange(e: any){

        setIsTyping(true)
        const value = e.target.value;

        if(value > totalPages) {
            alert("Please enter a valid page number")
            return -1
        }

       
        if(value === "") setCurrPage("")

        if(value > 0) setCurrPage(Number(value)); // Set the input to the new number
        
    }

    async function getCustomPage() {
        try {
          // Ensure currPage has a valid value; default to 1 if currPage is null or undefined
          const currentPage = currPage ?? 1;
          let url =''
          // Calculate the 'from' parameter for pagination
          const from = (currentPage === 1) ? 0 : ((Number(currentPage) - 1) * 12);
          
          // Construct the URL with the calculated 'from' value
          url = `${BASE_URL}/dogs/search?size=12&breeds=${selectedBreeds}&from=${from}`;

        if (nextQuery) {
            // Replace the 'from' parameter with the new value
            const updatedQueryWithAge = nextQuery.replace(/from=\d+/, `from=${from}`);
            url = `${BASE_URL}${updatedQueryWithAge}`;
          }




          const res = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: "include"
          });
      
       
          if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
          }
      
          const data = await res.json();
      
          // Set previous query if exists
          if (data.prev) {
            setPrevQuery(data.prev);
          }
      
          // Fetch dog details
          getDogDetails(data.resultIds, data.next);
      
        } catch (error) {
          // Handle errors
          console.error("Failed to fetch custom page:", error);
        }

        setIsTyping(false)
      }
      


function handleFocus(){
    setOriginalPage(Number(currPage))
}


async function handleBlur(){

   if (Number(currPage === 0) || currPage == "" ) {
    setCurrPage(originalPage);
    setIsTyping(false)

  } else if (originalPage !== currPage && Number(currPage) >= 1) {
    await getCustomPage();
  }

  
  };

    return(
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={isTyping}>Prev</button>
            <input onChange={handleChange} value={currPage}   onBlur={handleBlur} onFocus={handleFocus} /> <span> of {totalPages} </span>
            <button onClick={handleNextPage} disabled={isTyping}>Next</button>
        </div>
    )
}