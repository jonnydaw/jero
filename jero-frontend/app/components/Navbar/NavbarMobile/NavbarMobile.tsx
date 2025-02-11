'use client'
import Link from "next/link"
import { CiShoppingBasket } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "../../Search/Search";
import { useState } from "react";
import style from "./NavbarMobile.module.css"
import DropdownSearchMobile from "./Dropdowns/BasicSearch/DropdownSearchMobile";
import DropdownAdvancedSearchMobile from "./Dropdowns/AdvancedSearch/DropdownAdvancedSearchMobile";

// https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name

interface Props{};

const NavbarMobile = (props: Props) => {
    const hamstyle = { color: "white", fontSize: "1.5em" }
  const [openSearch,setOpenSearch] = useState<boolean>(false);
  const [openSmartSearch,setOpenSmartSearch] = useState<boolean>(false);
  
  const handleSearchOnClick = (e: any) => {
    e.preventDefault();
    setOpenSmartSearch(false);
    setOpenSearch(!openSearch);
  }

  const handleSmartSearchOnClick = (e: any) => {
    e.preventDefault();
    setOpenSearch(false);
    setOpenSmartSearch(!openSmartSearch);
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
            <button onClick={handleSmartSearchOnClick} className={style.searchButtons}>
                Smart Search
            </button>
            </div>
        <div id={style.hamburger}>
        <GiHamburgerMenu style={hamstyle}/>
        </div>
      </nav>
      <div>
          {openSearch && <DropdownSearchMobile setOpen={setOpenSearch} />}
          {openSmartSearch && <DropdownAdvancedSearchMobile />}
          </div>
      </div>
    )
  }
  
  export default NavbarMobile