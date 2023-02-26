import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MoviesPage/moviesCard";

const apiKey = process.env.API_KEY;

interface movie{
    id:number,
    title:String,
    poster_path:String,
    genres:[{
        id:number,
        name:string,
    }]
}

interface Props{
    genre:{
        page:number,
        results:[movie],
    },
    pageNumber:number,
    genreId:number,
    genreName:string,
}

const Genre: React.FC <Props> = ({genre, pageNumber, genreId, genreName}) => {
    let title = ""
    const genreArr = genreName.split(" ");
    if(genreArr.length == 1){
        title = genreArr.toString().slice(0,1).toUpperCase() + genreArr.toString().slice(1) +" "
    }
    else{
        for (let i = 0; i < genreArr.length; i++) {
            genreArr[i] = genreArr[i].charAt(0).toUpperCase() + genreArr[i].slice(1);
            title += genreArr[i] + " "
        }
    }
    
    
    return (
        <div className=" ">
            <div className="w-3/4 m-auto ">
                <h1 className="text-center text-3xl my-10">{title}Movies</h1>
                <div className="my-4">
                    {genre.results  && genre.results.length>0 &&
                        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                            {genre.results.map((movie: movie) => 
                                <MovieCard key={movie.id} movie={movie}/>
                                )}
                        </div>
                    }
                </div>
            </div>
            <Pagination pageNumber={pageNumber} genreId={genreId.toString()} />
        </div>
    );
}


type context = {
    params:{id:string|number},
    query:{
        page:string,
        genre_name:string,
    },
}

export const getServerSideProps = async(context:context) => {
    const genreId = context.params.id
    const genreName = context.query.genre_name.trim()
    let pageNumber:number = 1
    if(context.query.page!= undefined)
        pageNumber = parseInt(context.query.page)
    const apiFetch = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${apiKey}&page=${pageNumber}`;
    const data = await fetch(apiFetch)
    const genre = await data.json()
    return {props:{genre, pageNumber, genreId, genreName}}
}


export default Genre;