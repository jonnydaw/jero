'use client'
import { PropertyAttribute } from "@/types/types";
import style from "./propertcard.module.css"
import { Link } from "@/i18n/routing";
import ModalUpdate from "@/components/Profile/ManageProperties/ModalUpdate/ModalUpdate"
import axios from "axios";
import { inDevEnvironment } from "@/base";
import { useTranslations } from "next-intl";
interface Props {
    propertyAttribute : PropertyAttribute;
}
const PropertyCardOwner = (props : Props) => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const t = useTranslations('PropertyCard');
    const t2 = useTranslations("PropertyCardOwner")

     const handleDelete = async (e : any) => {
            e.preventDefault();
            if(!confirm(t('youSure'))){
                return;
            }
            try {
                const response = await axios.delete(`${baseApi}/property/delete-property/${props.propertyAttribute.id}`,
                    { withCredentials: true}
                );
                console.log("hi" + response.data);
                alert(t('deleted'))
                location.reload();

            } catch (error : any) {
                console.log(error)
                //onsole.log('Login failed:', error.response ? error.response.data : error.message);
            }
        }
    return(
        <div 
            className={style.card}>

                <h3>{props.propertyAttribute.title.length > 0 ? props.propertyAttribute.title : t('noTitle') }</h3>
                <img src={props.propertyAttribute.mainImage} alt="Main Property Image" />
                <strong style={{marginTop : "0.5em"}}>£{Number(props.propertyAttribute.pricePerNight)} {t2('perNight')}</strong>
                <em style={{marginBottom : "0.5em"}}>{t('extra')} £{Number(props.propertyAttribute.extraGuestPriceIncrease)}</em>
                <p style={{margin : "0em"}}>{props.propertyAttribute.displayLocation}</p>
                <p>{props.propertyAttribute.percentile > 0 ? `${t('ratedHigher')} ${~~props.propertyAttribute.percentile}%` : t('noReviews') }</p>
                <div style={{display : "flex", justifyContent : "center", alignItems: "center"}}>
                <button onClick={handleDelete} className="basicButton" style={{backgroundColor : "#FF746C", marginRight: "0.5em"}}>{t2('delete')}</button>
                {/* <button style={{marginLeft: "0.5em"}} className="basicButton">Update</button> */}
                <ModalUpdate propertyId={props.propertyAttribute.id}/>

                </div>
                
                
        </div>
    )
}

export default PropertyCardOwner;