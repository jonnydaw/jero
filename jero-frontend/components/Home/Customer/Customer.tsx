import { LatLons } from "@/types/types"
import style from "./customer.module.css"
import HomePageMap from "./HomePageMap";
import { getTranslations } from "next-intl/server";
interface Props {
    latLons : LatLons[];
}
const Customer = async (props : Props) => {
    const t = await getTranslations('HomePage')

    return (
        <div id={style.container}>
            <div id={style.subcontainer}>
                <h1>{t('youBeen')}</h1>
            </div>
            <HomePageMap latLongs={props.latLons}/>
        </div>
    )
}

export default Customer