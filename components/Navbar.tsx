"use client"
import {useState, useRef, useEffect} from 'react'
import Link from "next/link";
import Search from "./Search";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

interface props {
    width:number|undefined,
}

const Navbar: React.FC <props>= ({width}) => {
    const [collapse, setCollapse] = useState<boolean>(false);

    useEffect(()=>{
        if (collapse && typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }else if(!collapse)
            document.body.style.overflow = 'auto';
    },[collapse])

    const changeCollapse = () => {
        setCollapse(!collapse);
    }
    
    useEffect(()=>{
        document.addEventListener("click", (e:any) => {
            const button = e.target.closest("#sidebar-button")
            const sideLinks = e.target.closest("#sidenav ul li a")
            const sidenav = e.target.closest("#sidenav")
            if(sidenav===null && button===null){
                setCollapse(false)
            }else if(sideLinks!==null)
                setCollapse(false)
        })
    },[collapse])


    //cleanup after width size
    useEffect(()=>{
        if(width != undefined && width>600)
        setCollapse(false)
    },[width])
    
    //cleanup after route change
    const router = useRouter()
    const path = router.pathname
    
    useEffect(() => {
        setCollapse(false)
    }, [path])
    
    return (
        <nav className="relative h-16 text-white flex flex-row border-b-2 border-zinc-50 z-[100]">
            
            {width != undefined && width > 600 &&
            <>
                <ul className="list-none flex text-2xl p-4">
                    <li className="mx-2 hover:scale-105 transition-all duration-100 hover:text-[gray]">
                        <Link href={"/"} className="">Home</Link>
                    </li>
                    <li className="mx-2 hover:scale-105 transition-all duration-100 hover:text-[gray]">
                        <Link href={"/movies"}>Movies</Link>
                    </li>
                    <li className="mx-2 hover:scale-105 transition-all duration-100 hover:text-[gray]">
                        <Link href={"/genres"}>Genres</Link>
                    </li>
                </ul>
            </>
            }
            {width != undefined && width <=600 &&
            <span id='sidebar-button' className='p-4 relative'>
                <MenuIcon className='cursor-pointer' onClick={changeCollapse}/>
            </span>
            }
            {width != undefined && width <=600 && 
                <Sidebar width={width} collapse={collapse} setCollapse={setCollapse}/>
            }
            <Search width = {width}/>
            
        </nav>
    );
}

export default Navbar;