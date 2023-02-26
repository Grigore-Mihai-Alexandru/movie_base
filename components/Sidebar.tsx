"use client"
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

interface props{
    collapse:boolean,
    setCollapse:any,
    width:number,
}

const Sidebar: React.FC <props> = ({collapse, setCollapse, width}) => {

    function handleClose(){
        setCollapse(false)
    }

    return (
    <>
    {width!=undefined &&
        <div id='sidenav' className='absolute z-50 sidebar h-screen '
            style={{
                visibility:collapse?"visible":"hidden",
                opacity:!collapse?0:1,
                transition:"all 0.3s",
                width:width>280 ?"280px":"100%",
                transform:collapse?"translateX(0px)":"translateX(-200px)"
            }}> 
            
            <div className='p-4'>
                <CloseIcon className='cursor-pointer' onClick={()=>handleClose()}/>
            </div>
            <ul className="list-none flex flex-col text-2xl p-2">
                <li className="px-4 my-2">
                    <Link href={"/"} className="">Home</Link>
                </li>
                <li className="px-4 my-2">
                    <Link href={"/movies"}>Movies</Link>
                </li>
                <li className="px-4 my-2">
                    <Link href={"/genres"}>Genres</Link>
                </li>
            </ul>
        </div>
    }
    </>
    );
}

export default Sidebar;