"use client"
import Link from "next/link";

interface props{
    genre:{
        id:number,
        name:string,
        backdrop_path:string,
    },
    setImageSrc:any,

}

const GenreButton: React.FC <props> = ({genre, setImageSrc}) => {
    return (
        <li onMouseEnter={()=>setImageSrc(genre.backdrop_path)} 
            className=" py-2 hover:text-xl hover:sm:text-3xl hover:font-bold hover:p-6 ease-in duration-200">
            <Link href={"/genres/" + genre.id + `?genre_name=${genre.name.trim().toLowerCase()}`}>{genre.name}</Link>
        </li>
    );
}
 
export default GenreButton;