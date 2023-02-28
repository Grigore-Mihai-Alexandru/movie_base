import Head from "next/head";
import Image from "next/image"
import Link from "next/link";

const imagePath = "https://image.tmdb.org/t/p/";

interface movie{
    id:string,
    title:string,
    poster_path:string,
    backdrop_path:string,
    release_date:string,
    runtime:number,
    genres:[genre],
    overview:string | undefined,
}

type genre = {
    name:string,
    id:number,
}

const Movie: React.FC <movie> = (movie) => {
    console.log(movie)
    return (
        <main className='grow relative min-w-full min-h-full'>
        <Head><title>{movie.title}</title></Head> 
            {movie &&
                <div className="relative w-full " style={{height:"600px"}}>
                    <Image fill={true} objectFit="cover" priority={true} 
                    quality={50} src={imagePath + "w500" + movie.backdrop_path} alt="" />
                    <Image fill={true} objectFit="cover"
                    quality={50} src={imagePath + "original" + movie.backdrop_path} alt="" />
                    <div className="absolute w-full h-full" style={{background: "rgba(61,61,64,0.7)"}}>
                        <div className="max-w-5xl h-full flex flex-row justify-center items-center mx-auto">
                            <div className="relative w-48 sm:w-64" style={{aspectRatio:"2/3",height:"400px"}}>
                                <Image className="rounded-md" priority={true} src={imagePath + "w300" + movie.poster_path} 
                                quality={30} fill={true} objectFit="cover" alt="" />
                                <Image className="rounded-md" src={imagePath + "original" + movie.poster_path} 
                                quality={30} fill={true} objectFit="cover" alt="" />
                            </div>
                            <div>
                                <div className=" text-4xl px-2">
                                    {movie.title}  
                                    <span className="text-3xl text-gray-300"> ({movie.release_date.slice(0,4)})</span>
                                </div>
                                <div className="flex flex-row">
                                    <ul className="list-disc sm:flex sm:flex-row">
                                        <li className="mx-2">
                                            <ul className="list-none flex flex-row">
                                                {movie.genres.map( (genre) =>
                                                    <li className="px-2">
                                                        <Link href={`/genres/${genre.id}`+`?genre_name=${genre.name.toLowerCase()}`}>
                                                            {genre.name}
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </li>
                                        <li className="mx-2">{ runtime(movie.runtime)}</li>
                                    </ul>

                                </div>
                                <div className="p-2">
                                    {movie.overview !== undefined &&
                                    <p>{movie.overview}</p>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
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


function runtime (movieRuntime:number){
    let run = movieRuntime
    let result:string = ""
    let i = 0
    while(run >= 60){
        i++
        run -= 60
    }
    if(i>0)
        result = i.toString() + "h "
    if(run>0)
        result = result + run + "min" 
    return result
}