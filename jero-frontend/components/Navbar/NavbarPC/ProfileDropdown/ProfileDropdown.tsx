import Link from "next/link";
import style from "./profiledropdown.module.css"
import buttonStyle from "../NavbarPC.module.css"

import { CgProfile } from "react-icons/cg";
import { cookies } from "next/headers";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import LogoutFakeLink from "./LogoutFakeLink";
import { internationalKeys } from "./helper";


const ProfileDropdown = async () => {


  const cookieStore = await cookies();
  const jwtValue = cookieStore.get("JWT")?.value;
  const rtValue = cookieStore.get("RT")?.value;
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";



    const parseJWT = (jwtValue : string) => {
      return (JSON.parse(atob(jwtValue.split('.')[1])))
    };
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    
      let authMap : Map<string, string> = new Map();
      let profileMap : Map<string, string> = new Map();
      let internationalMap : Map<string, string> = new Map();




      if(!jwtValue || !rtValue){
        authMap.set("login","Login");
        authMap.set("signup", "Sign up");
      }else if(jwtValue && rtValue){
        const parsedJwt = parseJWT(jwtValue);
        if(parsedJwt.role === "customer"){
          profileMap.set("manage-profile", "Manage Profile");
          profileMap.set("past-bookings","Past Bookings");
          profileMap.set("upcoming-bookings","Upcoming Bookings");
          profileMap.set("analytic-privacy","Analytics and Privacy");
          profileMap.set("messages","Messages");
        }else if(parsedJwt.role === "host"){
          profileMap.set("manage-profile", "Manage Profile");
          profileMap.set("manage-properties","Manage Properties");
          profileMap.set("past-bookings/host","Past Bookings");
          profileMap.set("upcoming-bookings/host","Upcoming Bookings");
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
            <Link className={`${buttonStyle.links} ${buttonStyle.button}`} href={`/${locale}/profile`}><CgProfile size = '1.5em' /></Link>

      <div className={style.dropdownContent}>
        <div key="auth" className={style.authDropdown}>
          <h3>Authentication</h3>
          {( Object.keys(authItems).length > 0) ? 
                    Object.entries(authItems).map(([key, value]) => (
                  
                      <Link key={key} className={style.links} href={`/${locale}/${key}`}>{value}</Link>
                    ))
                  
                    :

                    <LogoutFakeLink/>
                  
          } 
      </div>
      {
      
      (jwtValue && rtValue) &&
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