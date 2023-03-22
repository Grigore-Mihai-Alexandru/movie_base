"use client"
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import Image from 'next/image';
import Link from 'next/link';

interface props {
    trailers:[{
        backdrop_path:string,
        title:string,
        id:number,
        video:boolean
        videoData:videos
    }],
    video:string|undefined,
    setVideo:React.Dispatch<React.SetStateAction<string | undefined>>
}

interface videos{
    results:[{
        key:string,
        official:boolean,
        published_at:string,
    }]
}

const Trailers: React.FC <props> = ({trailers, video, setVideo}) => {
    return (
        <div className='my-5 text-lg sm:text-xl md:text-2xl'>
            <p className='text-bold px-2'>Latest Trailers</p>
            <div className='overflow-x-scroll flex my-5'>
                {trailers !== undefined && trailers.length > 0 &&
                    trailers.map(movie=>{
                        if(movie.videoData?.results !== undefined && movie.videoData.results.length>0){
                            return(
                            <div key={movie.id} className=''>
                                <div className='relative h-36 sm:h-52 aspect-video mx-2 sm:mx-4 hover:scale-110 transition-all duration-200 overflow-visible'>
                                    <Image fill={true} className='flex object-cover' 
                                    src={`https://i.ytimg.com/vi/${movie.videoData.results[0].key}/hqdefault.jpg`}
                                    alt='...' sizes=' (max-width:768px)50vw, 33vw'
                                    />
                                    <div className='h-full flex justify-center align-middle w-full relative'>
                                        <button className='absolute h-full' onClick={()=>setVideo(movie.videoData.results[0].key)}>
                                            <PlayCircleFilledWhiteIcon fontSize='large' 
                                            className='scale-150 transition-all duration-200 '/>
                                        </button>
                                    </div>
                                </div>
                                <div className='text-center my-2'>
                                    <Link href={"movies/" + movie.id} className='text-lg hover:text-blue-300'>{movie.title}</Link>
                                </div>
                            </div>
                        )}
                    })
                }
            </div>
        </div>
    );
}
export default Trailers;


