import Step1AddProperty from "@/components/AddProperty/step1/Step1AddProperty";
import { Link } from "@/i18n/routing";


const page = () => {
    return(
        <div>
            <h1>Step 1: Add your location</h1>
            <Step1AddProperty/>
            <Link href="/add_property/step2">Next</Link>
        </div>        
    )
}

export default page;    