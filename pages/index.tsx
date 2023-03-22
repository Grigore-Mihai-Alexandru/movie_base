import CarouselHome from '@/components/HomePage/Carousel';
import Trailers from '@/components/HomePage/Trailers';
import Head from 'next/head'
import React from 'react';

interface props{
  trendingMovies:{
    page:number,
    results:[{
      title:string,
      id:number,
      backdrop_path:string,
      genre_ids:[string],
    }],
  },
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

const Home: React.FC <props> = ({video,setVideo,trendingMovies,trailers}) => {

  return (
    <>
      <Head>
        <title>MovieBase</title>
        <meta name="description" content="Made by Grigore Mihai-Alexandru" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className='grow relative min-w-full min-h-full my-5'>
        <h1 className='text-xl md:text-3xl p-2 sm:p-4'>Trending</h1>
        <CarouselHome trendingMovies = {trendingMovies}/>
        {/* <Trailers setVideo={setVideo} video={video} trailers={trailers}/> */}
      </main>
    </>
  )
}
export default Home;

const apiKey = process.env.API_KEY
export const getServerSideProps = async() => {
  let apiFetch = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  const data = await fetch(apiFetch)
  const trendingMovies = await data.json();

  const fetchData = await fetch("http://localhost:3000/api/trailers")
  const trailers = await fetchData.json()

  return {props:{trendingMovies,trailers:trailers}};
}