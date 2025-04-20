'use client'
import { useTranslations } from "next-intl";
import style from "./filter.module.css"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { styleText } from "util";
const Filters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const t = useTranslations('Filters');

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
                <h4>{t('sortBy')}</h4>
            <button 
                name="DESC"
                className="basicButton"
                onClick={updateSp}
                >
                    {t('desc')}</button>
            
            <button 
                className="basicButton"
                name="ASC"
                onClick={updateSp}>
                    {t('asc')}
            </button>
            </div>
            <div id={style.rightFilter}>
            <button     
                className="basicButton"
                name="none"
                onClick={updateSp}>
                    {t('reset')}
            </button>
            </div>
            
            {/* <button className="basicButton"></button>
            
            <button className="basicButton"></button> */}
        </div>
    )
}

export default Filters