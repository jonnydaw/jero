'use client'
import style from "./filter.module.css"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { styleText } from "util";
const Filters = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname()

    const updateSp = (e : any) => {
        const params = new URLSearchParams(searchParams);
        //console.log(params)

        //params.set("none")
        //const newParams = {...searchParams , "sort" : e.target.name}
        //console.log(newParams)
        if(e.target.name === "none"){
            console.log("hi")
            params.delete("sort")
        }else{
            params.set("sort",e.target.name)
        }
        console.log(params)
        const locale = (pathname.split("/").at(1));

        router.push(`/${locale}/search-property?${params.toString()}`);
        // params.set(sear)
       // params.set("sort", e.target.name || "");
        //console.log(params)
    }





    return (
        <div id={style.container}>
            <div id={style.otherfilter}>
                <h4>Sort by</h4>
            <button 
                name="DESC"
                className="basicButton"
                onClick={updateSp}
                >DESC</button>
            
            <button 
                className="basicButton"
                name="ASC"
                onClick={updateSp}>
                    ASC
            </button>
            </div>
            <div id={style.rightFilter}>
            <button     
                className="basicButton"
                name="none"
                onClick={updateSp}>
                    RESET
            </button>
            </div>
            
            {/* <button className="basicButton"></button>
            
            <button className="basicButton"></button> */}
        </div>
    )
}

export default Filters