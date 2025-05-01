import { getTranslations } from "next-intl/server"
import style from "./all.module.css"

const locations = {
    "Cali": ["/cali.jpg", "image of cali"],
    "London": ["/london.jpeg", "image of london"], 
    "Luanda": ["/luanda.jpg", "image of luanda"],
    "Madrid": ["/madrid.jpeg", "image of madrid"], 
    "Rio de Janeiro": ["/rio.jpg", "image of rio"]
}

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