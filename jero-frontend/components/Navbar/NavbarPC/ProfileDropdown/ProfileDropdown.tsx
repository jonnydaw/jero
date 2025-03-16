import Link from "next/link";
import style from "./profiledropdown.module.css"
import buttonStyle from "../NavbarPC.module.css"

import { CgProfile } from "react-icons/cg";
import { cookies } from "next/headers";


const ProfileDropdown = async () => {

    const parseJWT = (jwtValue : string) => {
      return (JSON.parse(atob(jwtValue.split('.')[1])))
    }
      let linkToText : Map<string, string> = new Map();

      const cookieStore = await cookies();
      const jwtValue = cookieStore.get("JWT")?.value;
      if(!jwtValue){
        linkToText.set("login","Login");
        linkToText.set("signup", "Sign up");

      }
      //const expiry : number = parseJWT(jwtValue).exp;
      const items  = Object.fromEntries(linkToText);


    return (
        <div className={style.dropdown}>
            <Link className={`${buttonStyle.links} ${buttonStyle.button}`} href="/en/profile"><CgProfile size = '1.5em' /></Link>

        {/* https://stackoverflow.com/questions/16449295/how-to-sum-the-values-of-a-javascript-object*/}
      <div className={style.dropdownContent}>
        {Object.entries(items).map(([key, value]) => (

          <Link className={style.links} href={`/en/${key}`}>{value}</Link>
      ))
    }
  
        </div>
  </div>
    )
}

export default ProfileDropdown;