import { propagateServerField } from "next/dist/server/lib/render-server";
import style from "./host.module.css"
import { getTranslations } from "next-intl/server";
interface Props {
    totalGuests: number;
    totalEarnings: number;
}
const Host = async (props: Props) => {
    const t = await getTranslations('HomePage')
    return (
        <div id={style.container}>
            <div id={style.subcontainer}>
                <h1>{t('earnings')}: £{props.totalEarnings}</h1>
                <h1>{t('guests')}: {props.totalGuests}</h1>
            </div>
        </div>
    )
}

export default Host;