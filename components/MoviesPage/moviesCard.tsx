
import Image from "next/image";
import Link from "next/link";

const imagePath = "https://image.tmdb.org/t/p/original";


interface props{
    movie:{
        id:number,
        title:String,
        poster_path:String,
    }
}


const MovieCard: React.FC<props> = ({movie}) => {
    const imgUrl = imagePath + movie.poster_path

    return (
        <div className="mx-auto ">
            <Link href={"/movies/"+movie.id}>
                <Image src={imgUrl} priority={true} blurDataURL="/poster-placeholder.jpg" placeholder="blur" quality={30} width={320} height={400} alt=""/>
            </Link>
            <h2 className="text-xl mb-0 m-auto"><Link href={"/movies/"+movie.id}>{movie.title}</Link></h2>
        </div>
    );
}
 
export default MovieCard;