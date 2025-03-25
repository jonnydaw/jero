import ProfileDropdown from "@/components/Navbar/NavbarPC/ProfileDropdown/ProfileDropdown"
import { TbRuler2 } from "react-icons/tb";

import styleContainer from "../Container.module.css"

interface Props {
    isLoggedIn : boolean;
    isCustomer : boolean;
    isMobile : boolean;

}

const Navigations = (props : Props) => {
    return(
        <div id={styleContainer.container}>
        <ProfileDropdown isLoggedIn={props.isLoggedIn} isCustomer={props.isCustomer} isMobile={true}/>
        </div>
    )
}

export default Navigations