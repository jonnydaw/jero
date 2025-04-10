import Step2AddImages from "@/components/AddProperty/step2/Step2AddImages";
import { Link } from "@/i18n/routing";

const page = () => {
    return(
        <div>
                <Step2AddImages isUpdate={false} getter={null} setter={null}/>
        </div>        
    )
}

export default page;