import Link from "next/link";
import ImageFallback from "../ImageWithFallback";

interface props{
    movie:{
        id:number,
        title:string,
        poster_path:string,
    }
}

const MovieCard: React.FC<props> = ({movie}) => {

    return (
        <div className="mx-auto flex flex-col object-fill w-full">
            <div className="mx-auto col-1 w-full relative" style={{aspectRatio:"2/3"}}>
                <Link className="w-full" href={"/movies/"+movie.id}>
                    <ImageFallback width={300} poster_path={movie.poster_path} priority={true} name={movie.title} />
                    <ImageFallback width={undefined} poster_path={movie.poster_path} priority={false} name={movie.title} />
                </Link>
            </div>
            <div>
                <h2 className="text-xl mb-0 m-auto"><Link href={"/movies/"+movie.id}>{movie.title}</Link></h2>
            </div>
        </div>
    );
}
 
export default MovieCard;