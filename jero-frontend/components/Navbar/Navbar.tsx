
import { userAgent } from "next/server";
import Link from "next/link"
import style from "./NavbarPC.module.css"
import Search from "../Search/Search"
import { CiShoppingBasket } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import NavbarPC from "./NavbarPC/NavbarPC";
import { headers } from "next/headers"
import { getSelectorsByUserAgent } from "react-device-detect"
import NavbarMobile from "./NavbarMobile/NavbarMobile";
// https://stackoverflow.com/questions/59494037/how-to-detect-the-device-on-react-ssr-app-with-next-js
// danmar varela
type Props = {
  isLoggedIn : boolean;
  isCustomer : boolean
}

const Navigation = async (props: Props) => {
  const {isMobile} = getSelectorsByUserAgent(
      (await headers()).get("user-agent") ?? ""
  )
  return (
      <>
        {isMobile ? (
            < NavbarMobile isLoggedIn={props.isLoggedIn} isCustomer={props.isCustomer}/>
        ) : (
            <NavbarPC isLoggedIn={props.isLoggedIn} isCustomer={props.isCustomer}/>
        )}
      </>
  )
}

export default Navigation
