import Step2AddImages from "@/components/AddProperty/step2/Step2AddImages";
import { Link } from "@/i18n/routing";

const page = () => {
    return(
        <div>
                <Step2AddImages/>
            <Link href="/add_property/step1">Back</Link>
        </div>        
    )
}

export default page;