import Image from "next/image";
import Link from "next/link";

const imagePath = "https://image.tmdb.org/t/p/"

interface props{
  trendingMovies:{
      page:number,
      results:[{
      title:string,
      id:number,
      backdrop_path:string,
      genre_ids:[string],
    }],
  }
}

const CarouselHome: React.FC<props> = ({trendingMovies}) => {
  let i=0
  let movies = [] 
  for(i=0; i<5; i++){
    movies.push(trendingMovies.results[i])
  }
  i=0
  return (
    <div id="animation-carousel" className="relative max-h-80 md:max-h-[500px] w-full m-auto min-h-52 aspect-video" data-carousel="slide">
      <div className="relative h-full overflow-hidden rounded-lg ">
        {movies !== undefined && movies.length > 0 &&
          movies.map(movie =>
            <div key={movie.id} id={"carousel-item-" + i} 
            className="duration-700 ease-in-out select-none absolute inset-0 transition-transform transform translate-x-0 z-20" 
            data-carousel-item
            >
              <Image src={imagePath +"original" + movie.backdrop_path}  fill={true}
              className="absolute block w-full object-cover" alt="..." 
              sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 100vw,"
              />
              <div className="absolute z-30 w-full h-full" style={{background:"rgba(61,61,64,0.5"}}>
                <span>
                  <p className="top-2 right-2 text-bold absolute z-30 text-lg md:text-2xl">{movie.title}</p>
                </span>
              </div>
              <div className="absolute h-full w-full translate-y-1/2 translate-x-1/4  z-30 ">
                <Link href={'/movies/'+movie.id} type="button" 
                  className="text-base sm:text-lg md:text-2xl rounded bg-black px-2 py-1 sm:px-4 sm:py-2 hover:scale-110 transition-all duration-150" >
                  Watch now
                </Link>
              </div>
            </div>
          )
        }
      </div>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-2 sm:bottom-5 left-1/2 bg-black rounded">
      {movies !== undefined && movies.length > 0 &&
          movies.map(movie =>
            <button key={movie.id} type="button" 
            className="w-3 h-3 bg-gray rounded-full" 
            aria-current={i === 0 ? "true" :"false"} aria-label={"Slide "+ i} 
            data-carousel-slide-to={i++}>
            </button>
          )}
      </div>
      <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-4 h-4 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-4 h-4 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default CarouselHome;