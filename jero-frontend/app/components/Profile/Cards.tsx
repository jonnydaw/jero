import style from "./Cards.module.css"
interface Props {
    cardName : string
    cardContent: string
}
export const Cards = (props : Props) =>{
    return(
        <div className={style.card}>
            <h2>{props.cardName}</h2>
            <p>{props.cardContent}</p>
        </div>
    )
} 