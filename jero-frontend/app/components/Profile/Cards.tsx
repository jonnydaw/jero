import style from "./Cards.module.css"
interface Props {
    cardName : string
}
export const Cards = (props : Props) =>{
    return(
        <div className={style.card}>
            <h2>{props.cardName}</h2>
        </div>
    )
} 