import Properties from "@/components/SearchResults/Properties";
import { PropertyAttribute } from "@/types/types";
import OwnerProperties from "./OwnerProperties";

interface Props {
    propertyAttributes: PropertyAttribute[];
    isMobile : boolean

}

const ManageProperties = (props : Props) => {
    return (
        <div>
            <OwnerProperties propertyAttributes={props.propertyAttributes} locationOverview={""} isMobile={props.isMobile} />
        </div>
    )
}
export default ManageProperties;