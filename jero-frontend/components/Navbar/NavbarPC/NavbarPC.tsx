import style from "./NavbarPC.module.css"
import { CiShoppingBasket } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import Search from "../../Search/Search";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import { Link } from "@/i18n/routing";
// import GroupedButtons from "./GroupedButtons/GroupedButtons";

// https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name

interface Props{
  isLoggedIn : boolean;
  isCustomer : boolean;
};

const NavbarPC = (props: Props) => {
  
    return ( 
      <nav className={style.navContainer} >
        <div className={style.singleLink}>
        <Link aria-label="go to home page" className={`${style.links} ${style.button}`} href="/"><IoHomeOutline size = '1.5em' /></Link>
        </div>

          <div className={style.searchBar}>
          <Search isMobileSearch={false} />
          </div>
          {/* <NavButton Icon={CgProfile} prompt='login' /> */}
          
          <ProfileDropdown isLoggedIn={props.isLoggedIn} isCustomer={props.isCustomer} isMobile={false}/>

          {/* <GroupedButtons/> */}
      </nav>
    )
  }
  
  export default NavbarPC