'use client'
import Link from "next/link"
import { CiShoppingBasket } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "../../Search/Search";
import { useEffect, useState } from "react";
import style from "./NavbarMobile.module.css"
import DropdownSearchMobile from "./Dropdowns/BasicSearch/DropdownSearchMobile";
import DropdownAdvancedSearchMobile from "./Dropdowns/DropdownAdvancedSearchMobile/DropdownAdvancedSearchMobile";
import GenericDropdownSearch from "./Dropdowns/GenericDropdown";
import { usePathname, useRouter, useParams } from "next/navigation";
// import Navigations from "./Dropdowns/Navigations/Navigations";
import ProfileDropdown from "../NavbarPC/ProfileDropdown/ProfileDropdown";
import Navigations from "./Dropdowns/Navigations/Navigations";

// https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name

interface Props{
  isLoggedIn : boolean;
  isCustomer : boolean;
};

const NavbarMobile = (props: Props) => {
    const hamstyle = { color: "white", fontSize: "1.5em" }
  const [openSearch,setOpenSearch] = useState<boolean>(false);
  const [openSmartSearch,setOpenSmartSearch] = useState<boolean>(false);
  const [openNavigations,setOpenNavigations] = useState<boolean>(false);


  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  
  useEffect(() => {
    setOpenSmartSearch(false);
    setOpenSearch(false);
    setOpenNavigations(false);
  }, [pathname, params]);

  const handleSearchOnClick = (e: any) => {
    e.preventDefault();
    setOpenSmartSearch(false);
    setOpenNavigations(false);
    setOpenSearch(!openSearch);
  }

  const handleSmartSearchOnClick = (e: any) => {
    e.preventDefault();
    setOpenSearch(false);
    setOpenNavigations(false);
    const locale = (pathname.split("/").at(1));
    router.push(`/${locale}/smart-search`);
    // setOpenSmartSearch(!openSmartSearch);
  }

  const handleNavigationsOnClick = (e: any) => {
    e.preventDefault();
    setOpenSearch(false);
    setOpenSmartSearch(false);
    setOpenNavigations(!openNavigations);
  }
  
    return ( 
    <div>
      <nav id={style.navContainer} >
        <div id={style.homeButton}>
        <Link  href="/" ><IoHomeOutline size = '1.5em' style={hamstyle} /></Link>
        </div>
        <div id={style.searchButtonsArea}>

        <button onClick={handleSearchOnClick} className={style.searchButtons}>
            Search
        </button >
        
        <button onClick={handleSmartSearchOnClick} id={style.smartSearchButton}>Smart Search</button>


            </div>
        <div onClick={handleNavigationsOnClick} id={style.hamburger}>
        <GiHamburgerMenu style={hamstyle}/>
        </div>
      </nav>
      <div>
          {openSearch && <GenericDropdownSearch setOpen={setOpenSearch} isAdvanced={false} />}
          {openSmartSearch && <GenericDropdownSearch setOpen={setOpenSmartSearch} isAdvanced={true}/>}
          {openNavigations && <Navigations isLoggedIn={props.isLoggedIn} isCustomer={props.isCustomer} isMobile={true}/>}
          </div>
      </div>
    )
  }
  
  export default NavbarMobile