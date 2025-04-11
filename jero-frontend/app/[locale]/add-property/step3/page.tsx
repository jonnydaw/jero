import Step3GuestManagement from "@/components/AddProperty/step3/Step3GuestManagement";
import { Link } from "@/i18n/routing";

const page = () => {
    return(
        <div>
                <Step3GuestManagement isUpdate={false} data={null} propertyId={null}/>
        </div>        
    )
}

export default page;