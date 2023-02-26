import Pagination from "@/components/Pagination";

interface props{
    movies:{
        page:string,
        results:[{title:string}],
        total_pages:number,
    },
    pageNumber:number,
}

const SearchResults: React.FC <props> = ({movies, pageNumber}) => {
 console.log(movies)
    return (
        <>
        {movies.results && movies.results.length>0 &&
        <>
            <div>
                {movies.results.map(movie=>
                    <p>{movie.title}</p>
                )}        
            </div>
            <Pagination totalPages={movies.total_pages} pageNumber={pageNumber}  genreId={undefined}/>
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