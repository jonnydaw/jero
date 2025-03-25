import Link from "next/link";
import stylePC from "./profiledropdown.module.css"
import styleMobile from "./mobileProfileDropdown.module.css"
import buttonStyle from "../NavbarPC.module.css"

import { CgProfile } from "react-icons/cg";
import { cookies } from "next/headers";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import LogoutFakeLink from "./LogoutFakeLink";
import { internationalKeys } from "./helper";

interface Props {
  isLoggedIn : boolean;
  isCustomer : boolean;
  isMobile : boolean;
}

const ProfileDropdown = (props : Props) => {


    //const cookieStore = await cookies();
  // const jwtValue = cookieStore.get("JWT")?.value;
  // const rtValue = cookieStore.get("RT")?.value;
   // const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const locale = "en"

  const style = props.isMobile ? styleMobile : stylePC; 

  //   const parseJWT = (jwtValue : string) => {
  //     return (JSON.parse(atob(jwtValue.split('.')[1])))
  //   };
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    
      let authMap : Map<string, string> = new Map();
      let profileMap : Map<string, string> = new Map();
      let internationalMap : Map<string, string> = new Map();




      if(!props.isLoggedIn){
        authMap.set("login","Login");
        authMap.set("signup", "Sign up");
      }else {
        if(props.isCustomer){
          profileMap.set("manage-profile", "Manage Profile");
          profileMap.set("profile/bookings/","Bookings");
          profileMap.set("analytic-privacy","Analytics and Privacy");
          profileMap.set("messages","Messages");
        }else{
          profileMap.set("manage-profile", "Manage Profile");
          profileMap.set("manage-properties","Manage Properties");
          profileMap.set("profile/bookings","Tookings");
          profileMap.set("analytic-privacy/host","Analytics and Privacy");
          profileMap.set("messages","Messages");
        }
      }

      const arr : string[] = internationalKeys;

      arr.map((i) => {
        internationalMap.set(i,i);
      })
      //const expiry : number = parseJWT(jwtValue).exp;
      const authItems = Object.fromEntries(authMap);
      const manageCommonItems = Object.fromEntries(profileMap);
      const internationItems = Object.fromEntries(internationalMap);


    return (
        <div className={style.dropdown}>
          {
            !props.isMobile 
              &&
            <Link className={`${buttonStyle.links} ${buttonStyle.button}`} href={`/${locale}/profile`}>
            {<CgProfile size = '1.5em' />}
            </Link>
          }

      <div className={style.dropdownContent}>
        <div key="auth" className={style.authDropdown}>
          <h3>Authentication</h3>
          {( Object.keys(authItems).length > 0) ? 
                    Object.entries(authItems).map(([key, value]) => (
                  
                      <Link key={key} className={style.links} href={`/${locale}/${key}`}>{value}</Link>
                    ))
                  
                    :

                    <LogoutFakeLink isMobile={props.isMobile}/>
                  
          } 
      </div>
      {
      
      (props.isLoggedIn) &&
      (
      <div className={style.authDropdown}>
        
            
                    <h3>Profile</h3>
                
                   { Object.entries(manageCommonItems).map(([key, value]) => (
                      <Link  key={key} className={style.links} href={`/${locale}/${key}`}>{value}</Link>
                    ))}
                  
                  
                  
          
      </div>)
      }
      <div className={style.authDropdown}>
        <h3>International?</h3>
          {
            Object.entries(internationItems).map(([key,value]) => (
              <Link key ={key} className={style.links} href={`/${locale}/${key}`}>{value}</Link>
            ))
          }
      </div>
  
        </div>
  </div>
    )
}

export default ProfileDropdown;