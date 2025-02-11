
import styleMobile from "./AdvancedSearchMobile.module.css"
import stylePc from "./AdvancedSearchPC.module.css"

interface Props {
    isMobileSearch : boolean
}

export const AdvancedSearch = (props : Props) => {
    return(
        <div>
            <ul id={styleMobile.items}>
                <li>When</li>
                <li>Weather (at time of travel)</li>
                <li>Attractions (museum party)</li>
                <li>Time to get there</li>
                <li>Language strenght</li>
                <li></li>
            </ul>
        </div>
    )
}

export default AdvancedSearch
