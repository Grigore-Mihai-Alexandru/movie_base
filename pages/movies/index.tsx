import CriteriaSearch from "@/components/MoviesPage/CriteriaSearch/CriteriaSearch";
import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MoviesPage/moviesCard";
import { useRouter } from "next/router";
import Head from "next/head";

const apiKey = process.env.API_KEY;

interface Props{
    data:{
        page:number,
        results:[movie],
        total_pages:number,
    },
    genres:{
        genres:[{
            id:number,
            name:string,
        }]
    }
}

interface movie{
    id:number,
    title:string,
    poster_path:string,
}

const Movies: React.FC <Props> = ({data,genres}) => {
    const router = useRouter();
    let {page} = router.query;
    let pageNumber:number
    if(page==undefined)
        pageNumber = 1
    else
        pageNumber = parseInt(page.toString())

    return (
        <main className='grow relative min-w-full min-h-full'>
        <Head><title>Movies Page</title></Head> 
            <h1 className="text-center text-3xl m-10">Movies page</h1>
            <div className="flex flex-col items-center sm:items-start sm:flex-row md:mx-10">
                {
                    <CriteriaSearch genres={genres} />
                }
                {data.results == undefined  &&
                    <div className="text-4xl ">
                        <p className="text-center">No Results Found...</p>
                    </div>
                }
                {data.results  && data.results.length>0 &&
                    <div className="w-2/3 m-auto sm:w-3/4 ">
                        <div className="my-4">
                            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                                {data.results.map((movie: movie) => 
                                    <MovieCard key={movie.id} movie={movie}/>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
            {data.results  && data.results.length>0 &&
                <Pagination genreId={undefined} totalPages={data.total_pages} pageNumber={pageNumber} />
            }
        </main>
    );
}

type context = {
    query:{
        page:string | undefined,
        with_genres:string | undefined,
        release_date_gte:string | undefined,
        release_date_lte:string | undefined,
        with_runtime_gte:string | undefined,
        with_runtime_lte:string | undefined,
        sort_by:string | undefined,
    },
}

export const getServerSideProps = async(context:context) => {
    let pageNumber:string = '1';
    if(context.query.page != undefined)
        pageNumber = context.query.page
    let apiFetch = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}`;

    if(context.query.with_genres !== undefined)
        apiFetch = apiFetch + "&with_genres=" + context.query.with_genres
    if(context.query.release_date_gte !== undefined)
        apiFetch = apiFetch + "&release_date.gte=" + context.query.release_date_gte
    if(context.query.release_date_lte !== undefined)
        apiFetch = apiFetch + "&release_date.lte=" + context.query.release_date_lte
    if(context.query.with_runtime_gte !== undefined)
        apiFetch = apiFetch + "&with_runtime.gte=" + context.query.with_runtime_gte
    if(context.query.with_runtime_lte !== undefined)
        apiFetch = apiFetch + "&with_runtime.lte=" + context.query.with_runtime_lte
    if(context.query.sort_by !== undefined)
        apiFetch = apiFetch + "&sort_by=" + context.query.sort_by
    let genresApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`

    const movies = await fetch(apiFetch)
    const data = await movies.json();
    
    const genreData = await fetch(genresApi)
    const genres = await genreData.json()
    return {props:{data,genres}};
}
  

 
export default Movies;