"use client"
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {useRef, useState, useEffect} from 'react'
import SearchForm from './SearchForm';

interface props {
    width:number|undefined,
}

const Search: React.FC <props> = ({width}) => {
    const [clicked, setClicked] = useState<boolean>(false)
    const ref = useRef<any>(null)
    const searchFormRef = useRef<any>(null)
    //change search state
    useEffect(() => {
        const handleClickOutside = (event:Event) => {
            if ((ref.current) && (ref.current.contains(event.target)))
                setClicked(!clicked)
            else if(searchFormRef.current && searchFormRef.current.contains(event.target))
                setClicked(true)
            else if(ref.current && clicked &&!ref.current.contains(event.target))
                setClicked(false)
            };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ clicked ]);

    return (
    <>
        <div className='absolute right-0 p-4'>
            {!clicked &&
                <SearchIcon ref={ref} fontSize='large' className='cursor-pointer'/>
            }
            {clicked && 
                <SearchOffIcon ref={ref} fontSize='large' className='cursor-pointer'/>
            }
        </div>
        {clicked && 
        <SearchForm searchFormRef={searchFormRef}/>
        }
    </>
    
    )
}

export default Search;