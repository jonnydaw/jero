import { Dispatch, SetStateAction } from "react"
import styleContainer from "./Container.module.css"
import style from "./GenericSearchMobile.module.css"
import Search from "@/app/components/Search/Search"
import AdvancedSearch from "@/app/components/AdvancedSearch/AdvancedSearch"
interface Props {
    setOpen : Dispatch<SetStateAction<boolean>>
    //searchComponent : React.FC;
    isAdvanced : boolean
}

export const GenericDropdownSearch = (props : Props) => {

    const handleClose = (e : any) => {
        props.setOpen(false);
    }
    return(
        <div id={styleContainer.container}>
        <div id={style.buttonContainer}>
            <button id={style.close}onClick={handleClose}>X</button>    
        </div>            
            {props.isAdvanced ? <AdvancedSearch isMobileSearch={true}/> :<Search isMobileSearch={true}/>}
        </div>
    )
}

export default GenericDropdownSearch