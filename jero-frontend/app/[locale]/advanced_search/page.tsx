 import { AdvancedSearchPC } from "@/app/components/AdvancedSearch/AdvancedSearchPC/AdvancedSearchPC"
import AdvancedSearchMobile from "@/app/components/AdvancedSearch/AdvanceSearchMobile/AdvancedSearchMobile"
import { headers } from "next/headers"
 import { getSelectorsByUserAgent } from "react-device-detect"

const page = async () => {
     const {isMobile} = getSelectorsByUserAgent(
         (await headers()).get("user-agent") ?? ""
     )
    return (
        <div>
            <h1>advance search</h1>
            <>
            {isMobile ? (
             < AdvancedSearchMobile/>
         ) : (
             <AdvancedSearchPC/>
         )}
      </>
        </div>
    )
}

export default page