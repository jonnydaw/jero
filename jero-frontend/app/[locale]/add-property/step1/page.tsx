import Step1AddProperty from "@/components/AddProperty/step1/Step1AddProperty";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";


const page = () => {
    const t = useTranslations('Step1');

    return(
        <div>
            <h1 style={{textAlign:"center"}}>{t('title')}</h1>
            <Step1AddProperty/>
        </div>        
    )
}

export default page;    