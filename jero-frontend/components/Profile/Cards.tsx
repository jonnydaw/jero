'use client'
import { usePathname, useRouter } from "next/navigation"
import style from "./Cards.module.css"
interface Props {
    cardName : string;
    cardContent: string;
    cardOnwardLink : string
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

    return(
        <div onClick={handleClick} className={style.card}>
            <h2>{props.cardName}</h2>
            <p>{props.cardContent}</p>
        </div>
    )
} ;