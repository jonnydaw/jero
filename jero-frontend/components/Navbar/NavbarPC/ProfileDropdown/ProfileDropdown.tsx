import Link from "next/link";
import style from "./profiledropdown.module.css"
import buttonStyle from "../NavbarPC.module.css"

import { CgProfile } from "react-icons/cg";
import { cookies } from "next/headers";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import LogoutFakeLink from "./LogoutFakeLink";


const ProfileDropdown = async () => {


  const cookieStore = await cookies();
  const jwtValue = cookieStore.get("JWT")?.value;
  const rtValue = cookieStore.get("RT")?.value;
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";



    const parseJWT = (jwtValue : string) => {
      return (JSON.parse(atob(jwtValue.split('.')[1])))
    }
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    

    // const handleClick = async (e : any) => {
    //   console.log
    //   e.preventDefault();
    //   try {
    //     const response = await fetch(`${baseApi}/auth/refresh`, {
    //       method: "GET",
    //       headers: {
    //           Cookie: `JWT=${jwtValue}; RT=${rtValue}`
    //       },
    //       credentials : "include",
    //   });
    //     console.log("hi" + response);
    // } catch (error : any) {
    //     console.log(error)
    //     //onsole.log('Login failed:', error.response ? error.response.data : error.message);
    // }
    // }
      let linkToTextAuth : Map<string, string> = new Map();
      let linkToTextCommonProfile : Map<string, string> = new Map();
      let linkToTextInternational : Map<string, string> = new Map();




      if(!jwtValue || !rtValue){
        linkToTextAuth.set("login","Login");
        linkToTextAuth.set("signup", "Sign up");
      }else if(jwtValue && rtValue){
        const parsedJwt = parseJWT(jwtValue);
        if(parsedJwt.role === "customer"){
          linkToTextCommonProfile.set("manage-profile", "Manage Profile");
          linkToTextCommonProfile.set("past-bookings","Past Bookings");
          linkToTextCommonProfile.set("upcoming-bookings","Upcoming Bookings");
          linkToTextCommonProfile.set("upcoming-bookings","Upcoming Bookings");
          linkToTextCommonProfile.set("analytic-privacy","Analytics and Privacy");
          linkToTextCommonProfile.set("messages","Messages");
        }else if(parsedJwt.role === "host"){
          linkToTextCommonProfile.set("manage-profile", "Manage Profile");
          linkToTextCommonProfile.set("manage-properties","Manage Properties");
          linkToTextCommonProfile.set("past-bookings/host","Past Bookings");
          linkToTextCommonProfile.set("upcoming-bookings/host","Upcoming Bookings");
          linkToTextCommonProfile.set("upcoming-bookings/host","Upcoming Bookings");
          linkToTextCommonProfile.set("analytic-privacy/host","Analytics and Privacy");
          linkToTextCommonProfile.set("messages","Messages");

        }
      }
      //const expiry : number = parseJWT(jwtValue).exp;
      const authItems = Object.fromEntries(linkToTextAuth);
      const manageCommonItems = Object.fromEntries(linkToTextCommonProfile)


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
                  
                      <Link className={style.links} href={`/${locale}/${key}`}>{value}</Link>
                    ))}
                  
                  
                  
          
      </div>)
      }
  
        </div>
  </div>
    )
}

export default ProfileDropdown;