import { Dispatch, SetStateAction } from "react"
import styleContainer from "./Container.module.css"
import style from "./GenericSearchMobile.module.css"
import Search from "@/components/Search/Search"
import AdvancedSearchMobile from "@/components/AdvancedSearch/AdvanceSearchMobile/AdvancedSearchMobile"
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
interface Props {
    setOpen : Dispatch<SetStateAction<boolean>>
    //searchComponent : React.FC;
    isAdvanced : boolean
}

export const DropdownSearch = (props : Props) => {
    const t =  useTranslations('SearchBar')
    const handleClose = (e : any) => {
        props.setOpen(false);
    }
    return(
        <div id={styleContainer.container}>
        <div id={style.buttonContainer}>
            <button id={style.close}onClick={handleClose}>{t('close')}</button>    
        </div>            
            {props.isAdvanced ? <AdvancedSearchMobile/> :<Search isMobileSearch={true}/>}
        </div>
    )
}

export default DropdownSearch