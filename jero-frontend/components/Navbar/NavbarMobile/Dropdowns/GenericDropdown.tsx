import { Dispatch, SetStateAction } from "react"
import styleContainer from "./Container.module.css"
import style from "./GenericSearchMobile.module.css"
import Search from "@/components/Search/Search"
import AdvancedSearchMobile from "@/components/AdvancedSearch/AdvanceSearchMobile/AdvancedSearchMobile"
interface Props {
    setOpen : Dispatch<SetStateAction<boolean>>
    //searchComponent : React.FC;
    isAdvanced : boolean
}

export const DropdownSearch = (props : Props) => {

    const handleClose = (e : any) => {
        props.setOpen(false);
    }
    return(
        <div id={styleContainer.container}>
        <div id={style.buttonContainer}>
            <button id={style.close}onClick={handleClose}>X</button>    
        </div>            
            {props.isAdvanced ? <AdvancedSearchMobile/> :<Search isMobileSearch={true}/>}
        </div>
    )
}

export default DropdownSearch