"use client"

import GenreButton from "@/components/GenrePage/GenreButton";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const imagePath = "https://image.tmdb.org/t/p/"

interface Props{
    genres:[genre],
}

interface genre{
    id:number,
    name:string,
    backdrop_path:string,
}


const Genres: React.FC <Props> = ({genres}) => {
    const[imageSrc, setImageSrc] = useState<string>(imagePath + "original" + genres[0].backdrop_path)

    return (
        <><Head><title>Genres Page</title></Head>
        <div className="w-3/4 m-auto ">
            <h1 className="text-center text-3xl m-10">Movie Genres</h1>
            <div className="my-4">
                {genres.length>0 &&
                <div className="flex h-full">
                    <div className="absolute z-0 right-0 w-full " style={{height:"700px"}}>
                        <Image className="absolute object-cover" priority={true} quality={50} 
                        src={imagePath + "w500" + imageSrc} fill={true} alt="" />
                        <Image className="absolute object-cover" quality={50} 
                        src={imagePath + "original" + imageSrc} fill={true} alt="" />
                        <div className=" absolute z-10 w-full h-full" style={{
                            background: "linear-gradient(94deg, rgba(61,61,64,0.9) 11%, rgba(61,61,64,0.4) 50%, rgba(61,61,64,1) 91%)",
                        }}></div>
                    </div>
                    <div className="overflow-y  z-10 w-full h-full" >
                        <ul className="overflow-y list-none text-lg sm:text-2xl ">
                            {genres.map(genre =>
                                <GenreButton key={genre.id} genre={genre} setImageSrc={setImageSrc}/>
                            )}
                        </ul>
                    </div>
                </div>
                }
            </div>
        </div>
        </>
    );
}
 

export const getServerSideProps = async() => {
    //get a secure route for api/genres
    const fetchedData = await fetch("/api/genres")
    const data = await fetchedData.json()
    return {props:{genres:data}}
}
export default Genres;


