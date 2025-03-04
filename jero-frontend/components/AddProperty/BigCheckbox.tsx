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

const BigCheckbox = (props : Props) => {
    return (
    <label htmlFor={props.jsxnames} className={`${style.who} ${props.val && style.selected} `}>
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