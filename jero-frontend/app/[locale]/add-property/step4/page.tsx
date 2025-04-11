import Step4Amenities from "@/components/AddProperty/step4/Step4Amenities";
import { Link } from "@/i18n/routing";

const page = () => {
    return(
        <div>
            <Step4Amenities isUpdate={false} data={null} propertyId={""}/>
        </div>        
    )
}

export default page;