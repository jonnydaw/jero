'use client'
import { usePathname, useRouter } from "next/navigation"
import style from "./Cards.module.css"

interface Props {
    cardName : string;
    cardContent: string;
    cardOnwardLink : string;
    ti: number
}
export const Cards = (props : Props) =>{
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e : any) => {
        e.preventDefault();
        const locale = (pathname.split("/").at(1));
        console.log("clicked")
        router.push(`/${locale}/profile/${props.cardOnwardLink}`)
    }

    const handleEnter = (e : any) => {
        if(e.key === "Enter"){
            e.preventDefault();
            const locale = (pathname.split("/").at(1));
            console.log("clicked")
            router.push(`/${locale}/profile/${props.cardOnwardLink}`)
        }
    }

    return(
        <div tabIndex={0} onClick={handleClick} onKeyDown={handleEnter} className={style.card}>
            <h2>{props.cardName}</h2>
            <p>{props.cardContent}</p>
        </div>
    )
} ;