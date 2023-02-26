"use client"
import {useState} from 'react'

interface props{
    searchFormRef:any
}
// /search/movie

const SearchForm: React.FC <props> = ({searchFormRef}) => {
    const [movieSearch, setMovieSearch] = useState<string>("")
    
    
    return (
        <div ref={searchFormRef} className="absolute translate-y-16 bg-white w-full z-50">
            <form action='/search'>
                <input 
                    className="w-full h-12 px-2 bg-gray focus:border-0" 
                    type="text" placeholder="Search for a movie..." name='query'
                    onChange={(e)=>setMovieSearch(e.target.value)}
                />
            </form>
        </div>
    );
}
 
export default SearchForm;