import { getTranslations } from "next-intl/server"
import style from "./all.module.css"

const locations = {"london": ["/london.jpeg", "image of london"], 
    "madrid": ["/madrid.jpeg", "image of madrid"], "cali": ["/cali.jpg", "image of cali"]}

const All = async () => {
    const t = await getTranslations('HomePage')

    return(
        <div id={style.container}>
            <div id={style.subcontainer}>
            <h1>{t('ourLocations')}</h1>
            <div id={style.locations}>
                {Object.entries(locations).map(([key, value]) => (
                    <div key={key} className={style.location}>
                        <img src={value[0]} alt={value[1]} />
                        <h2>{key}</h2>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default All;