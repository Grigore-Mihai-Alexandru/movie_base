import {useState, useEffect} from 'react'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Quicksand} from "@next/font/google"
import Footer from '@/components/Footer'
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router'

const quicksand = Quicksand({
  subsets:["latin"],
  weight:"400"
})


export default function App({ Component, pageProps }: AppProps) {
  const [width, setWidth] = useState<number | undefined>(undefined)
  const router = useRouter()
  const [video, setVideo] = useState<string | undefined>(undefined)

  useEffect(()=>{
    if(video !== undefined)
      document.getElementById('main')!.classList.add('blur-sm')
    else document.getElementById('main')?.classList.remove('blur-sm')
  },[video])
  useEffect(()=>{
    setVideo(undefined)
  },[router])

  useEffect(()=>{
    setWidth(window.innerWidth)
  },[])

  // window width for props
  useEffect(()=>{
    window.addEventListener('resize',(e)=>{
        setTimeout(()=>setWidth(()=>window.innerWidth),100)
    })
    return(()=>
        window.addEventListener('resize',(e)=>{
            setTimeout(()=>setWidth(()=>window.innerWidth),100)
        })
    )
  },[width])

  return(
    <>
      <div id='main' className='flex flex-col min-h-screen '>
        <style jsx global>{`
          html {
            font-family: ${quicksand.style.fontFamily};
          }
        `}</style>
        
        <Navbar width ={width}/>
        <Component  {...pageProps} width={width} setVideo={setVideo} video={video}/>
        <Footer/>
      </div>
      
      {/* <div className='absolute top-0 z-[9999999] h-full w-full bg-transparent' hidden={video === undefined}>
        <div className='fixed h-full w-full flex justify-center'>
          <div className='absolute top-0 bottom-0 sm:w-3/4 lg:w-1/2 m-auto h-fit flex flex-col  bg-[rgb(0,0,0)]'>
            <div className='flex flex-row justify-between p-1 sm:p-2 md:p-4'>
              <p className='text-bold'>Official Trailer</p>
              <button onClick={() => setVideo(undefined)}>
                <CloseIcon/> 
              </button>
            </div>
            <iframe className='w-full aspect-video' src={"https://www.youtube-nocookie.com/embed/" + video} allow='encrypted-media' allowFullScreen={true}></iframe> 
          </div>
        </div>
      </div> */}
    </>
  ) 
}
