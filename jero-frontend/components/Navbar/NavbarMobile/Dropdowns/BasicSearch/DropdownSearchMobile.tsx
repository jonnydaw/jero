import { Dispatch, SetStateAction } from "react"
import Search from "../../../../Search/Search"
import styleContainer from "../Container.module.css"
import style from "./DropdownSearchMobile.module.css"
interface Props {
    setOpen : Dispatch<SetStateAction<boolean>>
}

export const DropdownSearchMobile = (props : Props) => {

    const handleClose = (e : any) => {
        props.setOpen(false);
    }
    return(
        <div id={styleContainer.container}>
        <div id={style.buttonContainer}>
            <button id={style.close}onClick={handleClose}>Close</button>    
        </div>            
            <Search isMobileSearch={true}/>
        </div>
    )
}

export default DropdownSearchMobile