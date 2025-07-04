 import { AdvancedSearchPC } from "@/components/AdvancedSearch/AdvancedSearchPC/AdvancedSearchPC"
import AdvancedSearchMobile from "@/components/AdvancedSearch/AdvanceSearchMobile/AdvancedSearchMobile"
import { headers } from "next/headers"
 import { getSelectorsByUserAgent } from "react-device-detect"

const page = async () => {
     const {isMobile} = getSelectorsByUserAgent(
         (await headers()).get("user-agent") ?? ""
     )
    return (
        <div>

             <AdvancedSearchPC/>

        </div>
    )
}

export default page