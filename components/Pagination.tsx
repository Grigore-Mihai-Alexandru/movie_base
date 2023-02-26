import Link from "next/link";
import { useRouter } from "next/router";

interface props{
    pageNumber:number,
    genreId:string|undefined,
    totalPages:number,
}


const Pagination: React.FC <props> = ({pageNumber, genreId, totalPages}) => {
    const router = useRouter()
    const { genre_name, with_genres, with_runtime_gte, with_runtime_lte, release_date_gte, release_date_lte} = router.query
    const {query} = router.query
    const path = router.pathname

    let startPage = pageNumber - 2;
    let endPage = pageNumber + 2;
    startPage = Math.max(1, pageNumber - 2);
    endPage = Math.min(pageNumber + 2, totalPages);
    let linkBase:string = ""
    if(genreId !== undefined)
        linkBase =`/genres/${genreId !== undefined ?genreId + "?genre_name=" + genre_name + "&" :""}`
    else if(query !== undefined){
        linkBase = path +`?query=${query}&`
    }
    else {
        linkBase = `${linkBase}${path}?`
        
        linkBase +=     
                with_genres !== undefined ? "with_genres=" + with_genres + "&" :"" +
                with_runtime_gte !== "" && with_runtime_gte !== undefined ? "with_runtime_gte=" + with_runtime_gte + "&" :"" +
                with_runtime_lte !== "" && with_runtime_lte !== undefined ? "with_runtime_lte=" + with_runtime_lte + "&" :"" +
                release_date_gte !== "" && release_date_gte !== undefined ? "release_date_gte=" + release_date_gte + "&" :"" +
                release_date_lte !== "" && release_date_lte !== undefined ? "release_date_lte=" + release_date_lte + "&" :""
    }

    const paginationLinks = () =>{
        let content = []
        let pages = pageNumber || 1
        while(startPage < pages){
            content.push(<Link key={startPage} className='mx-2' href={`${linkBase}page=${startPage}`}>{startPage}</Link>)
            startPage++
        }
        while(endPage >= pages){
            content.push(<Link key={pages} className='mx-2' href={`${linkBase}page=${pages}`}>{pages}</Link>)
            pages++
        }
        return content;
    }


    return (
        <div className="text-center text-2xl m-5">
            <div>
                {pageNumber >1 &&
                    <Link className="mx-2" href={`${linkBase}page=${pageNumber-1}`}>🡸Previous</Link>
                }
                {paginationLinks()}
                {pageNumber <totalPages &&
                    <Link className="mx-2" href={`${linkBase}page=${pageNumber+1}`}>Next🡺</Link>
                }
            </div>
            <p>PAGE</p>
        </div>
    );
}
 
export default Pagination;