'use client'
import style from "./BigCheckbox.module.css";
interface Props {
    jsxnames: string
    val : boolean
    displayName : string
    imgPath : string,
    alt : string
    handler : any


}

// https://stackoverflow.com/questions/44116800/how-to-show-html-entity-using-react
const BigCheckbox = (props : Props) => {
    return (
    <label tabIndex={0} htmlFor={props.jsxnames} className={`${style.who} ${props.val && style.selected} `}>
        <img className={style.img} src={props.imgPath} alt={props.alt} />
        <strong> {props.displayName} {props.val && <>&#9989;</>} </strong>
        <input 
            
            type="checkbox" 
            name={props.jsxnames}
            id={props.jsxnames}
            checked={props.val} 
            onChange={props.handler} />
    </label>
    )

}

export default BigCheckbox