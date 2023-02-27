import Pagination from "@/components/Pagination";
import SearchCard from "@/components/SearchPage/searchCard";
import Head from "next/head";
import { useRouter } from "next/router";

interface props{
    movies:{
        page:string,
        results:[{
            id:number,
            title:string,
            poster_path:string,
            overview:string | undefined,
            release_date:string,
        }],
        total_pages:number,
    },
    pageNumber:number,
}

const SearchResults: React.FC <props> = ({movies, pageNumber}) => {
    const router = useRouter()
    const {query} = router.query
    console.log(movies)
    
    return (
        <><Head><title>Search</title></Head> 
            {movies.results && movies.results.length>0 &&
            <>
                <div className="flex flex-col sm:flex-row w-full px-8 my-12">
                    <div className="col-1 sm:w-1/4">
                        <p className="text-3xl font-bold">Search Results For: {query} </p>
                    </div>
                    <div className="col-1 sm:w-3/4">
                        {movies.results.map(movie=>
                            <SearchCard 
                            key={movie.id} 
                            id={movie.id} 
                            poster_path={movie.poster_path} 
                            title={movie.title}
                            overview={movie.overview}
                            releaseDate={movie.release_date}
                            />
                        )}        
                    </div>
                        
                </div>
                <Pagination totalPages={movies.total_pages} pageNumber={pageNumber} genreId={undefined}/>
            </>
            }
            { movies.results.length == 0 && 
                <div>
                    No Results Founds...
                </div>
            }
        </>
    );
}

interface context{
    query:{
        query:string,
        page:string | undefined,
    },
}

export const getServerSideProps  = async(context:context) => {
    let query = context.query.query
    const apiKey = process.env.API_KEY
    let pageNumber:number = 1
    if(context.query.page !== undefined)
        pageNumber = parseInt(context.query.page)

    let apiFetch = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${pageNumber}&api_key=${apiKey}`

    const data = await fetch(apiFetch)
    const movies = await data.json()

    return{props:{movies, pageNumber}}
}

 
export default SearchResults;