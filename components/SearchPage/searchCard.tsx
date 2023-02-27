
import Link from "next/link";
import ImageFallback from "../ImageWithFallback";

interface props{
    id:number,
    title:string,
    poster_path:string,
    overview:string | undefined,
    releaseDate:string,
}


const SearchCard: React.FC<props> = ({title, overview, id, poster_path, releaseDate}) => {
    return (
        <div className="w-full flex flex-row h-40 sm:m-4 my-4 overflow-hidden bg-gray rounded">
            <div className="relative col-1 h-full" style={{aspectRatio:"2/3"}}>
                <div style={{aspectRatio:"2/3"}}>
                    <Link href={"/movies/" + id}>
                        <ImageFallback name={title} poster_path={poster_path} />
                    </Link>
                </div>
            </div>
            <div className="col-1 p-2">
                <div className="flex flex-col">
                    <div className="col-1 flex flex-col pb-1">
                        <Link className="font-bold text-xl" href={"/movies/"+id.toString()} >{title}</Link>
                        {releaseDate}
                    </div>
                    <div className="col-1">
                        {overview !== undefined && overview.length > 100 &&
                            <>
                                {overview.slice(0,100)} ...
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default SearchCard;