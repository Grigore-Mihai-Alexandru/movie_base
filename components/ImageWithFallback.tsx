"use client"
import Image from "next/image";
import { useState } from "react";


const imagePath = "https://image.tmdb.org/t/p/original"
const imgFallback = "/poster-placeholder.jpg"

interface props{
    poster_path:string,
    name:string,
}

const ImageFallback: React.FC <props> = ({poster_path, name}) => {
    const [imgSrc, setImgSrc] = useState<string>(imagePath + poster_path)
    
    return (
        <Image className="rounded w-full" blurDataURL="/poster-placeholder.jpg" 
        placeholder="blur" quality={20} priority={true} src={imgSrc}
        fill={true}
        onError={()=>setImgSrc(imgFallback)} alt={name}/>
    );
}
 
export default ImageFallback;