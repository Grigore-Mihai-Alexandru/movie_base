"use client"
import {useState} from 'react'

interface props{
    searchFormRef:any
}

const SearchForm: React.FC <props> = ({searchFormRef}) => {
    const [movieSearch, setMovieSearch] = useState<string>("")
    
    
    return (
        <div ref={searchFormRef} className="absolute translate-y-16 bg-gray w-full z-50">
            <form action='/search'>
                <div className="relative w-full bg-gray">
                    <input type="search" name='query' id="search-dropdown" autoComplete="off"
                        className="block p-2.5 w-full z-20 text-sm text-white bg-gray rounded-r-lg border-l-gray-50 
                        border-l-2 border border-gray focus:ring-gray focus:border-gray" 
                        placeholder="Search for a movie..." required onChange={(e)=>setMovieSearch(e.target.value)}/>
                    <button type="submit" 
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-sky-500/100
                        border border-blue-700 hover:bg-sky-300/100  focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
                
            </form>
        </div>
    );
}
 
export default SearchForm;