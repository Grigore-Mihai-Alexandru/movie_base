import Head from "next/head";
import Link from "next/link";

const apiKey = process.env.API_KEY

interface Props{
    genres:[genre],
}

interface genre{
    id:number,
    name:string,
}


const Genres: React.FC <Props> = ({genres}) => {
    return (
        <><Head><title>Genres Page</title></Head> 
        <div className="w-3/4 m-auto ">
            <h1 className="text-center text-3xl m-10">Movie Genres</h1>
            <div className="my-4">
                <ul className="list-none text-2xl">
                    {genres.length>0 && genres.map( genre =>
                        <li key={genre.id} className="py-2 hover:text-3xl hover:font-bold hover:p-6 ease-in duration-200">
                            <Link href={"/genres/"+genre.id+`?genre_name=${genre.name.trim().toLowerCase()}`}>{genre.name}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
        </>
    );
}
 


export const getServerSideProps = async() => {
    const fetchApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    const data = await fetch(fetchApi)
    const genres = await data.json()
    return {props:genres}
}

export default Genres;