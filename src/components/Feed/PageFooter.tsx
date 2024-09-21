import React, {useState, Dispatch, SetStateAction, useEffect } from "react"
import { BASE_URL } from "../../urls"

interface PageFooterProps {
    totalPages: number,
    nextQuery: string,
    setNextQuery: React.Dispatch<SetStateAction<string>>
    getDogDetails: (ids: string[], nextQuery?: string, total?: number) => void,
    selectedBreeds: string[],
    currPage: number | string,
    setCurrPage: React.Dispatch<SetStateAction<number | string>>

}

export default function PageFooter({totalPages, nextQuery, setNextQuery, getDogDetails, selectedBreeds, currPage, setCurrPage}: PageFooterProps){
    //make currPage a string only to clear page number if user focuses on input
    const [prevQuery, setPrevQuery] = useState("")
    const [originalPage, setOriginalPage] = useState(0)
    const [search, setSearch] = useState(false)

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

        console.log("in footer", nextQuery)
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
    


    useEffect(() => {
  
      // Only run if currPage is not an empty string
      if (currPage !== "") {
        getCustomPage();
      }
    }, [search]); // Trigger only on currPage change

    function handleChange(e: any){
        setCurrPage(e.target.value)
        setSearch(!search)
    }

    async function getCustomPage() {
        try {
          // Ensure currPage has a valid value; default to 1 if currPage is null or undefined
          const currentPage = currPage ?? 1;
          let url =''
          // Calculate the 'from' parameter for pagination
          const from = (currentPage === 1) ? 0 : ((Number(currentPage)) * 12);
          console.log("from", from)
          // Construct the URL with the calculated 'from' value
          url = `${BASE_URL}/dogs/search?size=12&breeds=${selectedBreeds}&from=${from}`;

        if (nextQuery) {
            // Replace the 'from' parameter with the new value
            const updatedQueryWithAge = nextQuery.replace(/from=\d+/, `from=${from}`);
            url = `${BASE_URL}${updatedQueryWithAge}`;
          }




          // Make the fetch request
          const res = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: "include"
          });
      
          // Check if response is OK
          if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
          }
      
          const data = await res.json();
      
          // Set previous query if exists
          if (data.prev) {
            setPrevQuery(data.prev);
          }
      
          // Fetch dog details
          console.log('prev', data);
          getDogDetails(data.resultIds, data.next);
      
        } catch (error) {
          // Handle errors
          console.error("Failed to fetch custom page:", error);
        }
      }
      
function handleFocus(){
    setOriginalPage(Number(currPage))
    setCurrPage("")
}

const handleBlur = () => {
    if (currPage === "") {
      setCurrPage(currPage);  // Reset to default page if undefined
    }
  };

    return(
        <div className="pagination">
            <button onClick={handlePrevPage}>Prev</button>
            <input onChange={handleChange} value={currPage} onFocus={handleFocus} onBlur={handleBlur} /> <span> of {totalPages} </span>
            <button onClick={handleNextPage}>Next</button>
        </div>
    )
}