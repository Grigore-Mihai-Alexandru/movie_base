import Image from "next/image"
import Link from "next/link";

const imagePath = "https://image.tmdb.org/t/p/original";

interface movie{
    id:String,
    title:String,
    poster_path:String,
    backdrop_path:String,
    release_date:String,
    genres:[genre],
}

type genre = {
    name:string,
    id:number,
}

const Movie: React.FC <movie> = (movie) => {
   
    return (
        <div className="">
            {movie &&
                <div className="relative w-full " style={{height:"600px"}}>
                    <Image fill={true} objectFit="cover" priority={true} quality={50} src={imagePath+movie.backdrop_path} alt="" />
                    <div className="absolute object-center bg-gradient-to-tr from-purple-500 w-full h-full">
                        <div className="max-w-5xl h-full flex flex-row justify-center items-center mx-4">
                            <div className="relative" style={{width:"20em",height:"400px"}}>
                                <Image className="rounded-md" priority={true} src={imagePath+movie.poster_path} quality={50} fill={true} objectFit="cover" alt="" />
                            </div>
                            <div >
                                <h2 className=" text-4xl px-2">{movie.title}  </h2>
                                <h3 className="text-3xl text-gray-300">({movie.release_date.slice(0,4)})</h3>
                                <div className="flex flex-row">
                                    {movie.genres.map( (genre) =>
                                        <h4 className="mx-2"><Link href={`/genres/${genre.id}`+`?genre_name=${genre.name.toLowerCase()}`}>{genre.name}</Link></h4>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

type context = {
    params:{
        id:string;
    }
}

export const getServerSideProps = async(context:context) =>{
    const apiKey = process.env.API_KEY
    const data = await fetch(`https://api.themoviedb.org/3/movie/${context.params.id}?api_key=${apiKey}`)
    const movie = await data.json()
    return {props:movie}
} 

export default Movie;


//https://api.themoviedb.org/3/movie/505642?api_key=3367b9fae21a703d1c49162540d30c81