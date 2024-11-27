'use client'
import Link from "next/link"
import style from "./Navbar.module.css"
import { CiShoppingBasket } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import Search from "../../Search/Search";
import { useState } from "react";
import GroupedButtons from "./GroupedButtons/GroupedButtons";

// https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name

interface Props{};

const NavbarPC = (props: Props) => {
  // const [openDialog,setOpenDialog] = useState<boolean>(false);
  
    return ( 
      <nav className={style.navContainer} >
        <div className={style.singleLink}>
        <Link className={style.links} href="/"><IoHomeOutline size = '1.5em' /></Link>
        </div>

          <div className={style.searchBar}>
          <Search />
          </div>

          <GroupedButtons/>
      </nav>
    )
  }
  
  export default NavbarPC