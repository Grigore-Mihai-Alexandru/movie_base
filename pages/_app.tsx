
import {useState, useEffect} from 'react'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Quicksand} from "@next/font/google"
import Footer from '@/components/Footer'
const quicksand = Quicksand({
  subsets:["latin"],
  weight:"400"
})


export default function App({ Component, pageProps }: AppProps) {
  const [width, setWidth] = useState<number|undefined>(undefined)
  
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
    <div className='flex flex-col min-h-screen '>
      <style jsx global>{`
        html {
          font-family: ${quicksand.style.fontFamily};
        }
      `}</style>
      <Navbar width ={width}/>
      <Component  {...pageProps} />
      <Footer/>

    </div>
  ) 
}
