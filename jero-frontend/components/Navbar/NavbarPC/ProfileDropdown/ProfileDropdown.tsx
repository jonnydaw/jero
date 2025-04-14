'use client'
import Link from "next/link";
import stylePC from "./profiledropdown.module.css"
import styleMobile from "./mobileProfileDropdown.module.css"
import buttonStyle from "../NavbarPC.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const style = props.isMobile ? styleMobile : stylePC; 

  //   const parseJWT = (jwtValue : string) => {
  //     return (JSON.parse(atob(jwtValue.split('.')[1])))
  //   };
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    const handleClick = (e : any, value : any) => {
      e.preventDefault();
      console.log(value)
      // if(value === "Spanish"){
        // https://stackoverflow.com/questions/47717424/regex-to-remove-first-part-of-pathname
        const reged = pathname.replace(/^\/[\w\d]+\//, `${value}/`);
        console.log(pathname.split("/"))
       // console.log(reged)
        //const newPathName = "es/" + pathname.split("/").slice(1).join("/");
        // console.log(`${reged}?${searchParams.toString()}`)
        // console.log(searchParams)
       if(searchParams.size !== 0){
        console.log("sps")
        router.push(`/${reged}?${searchParams.toString()}`)
       } else if(pathname.split("/").length === 2){
        console.log(reged)
          router.push(`/es`)
       } else if(pathname.split("/").length > 2){
          router.push(`/${reged}`)
       }
     // }
    }
    
      let authMap : Map<string, string> = new Map();
      let profileMap : Map<string, string> = new Map();
      let internationalMap : Map<string, string> = new Map();




      if(!props.isLoggedIn){
        authMap.set("login","Login");
        authMap.set("signup", "Sign up");
      }else {
        if(props.isCustomer){
          profileMap.set("profile/manage-profile", "Manage Profile");
          profileMap.set("profile/bookings/","Bookings");
          profileMap.set("analytic-privacy","Privacy");
        }else{
          profileMap.set("profile/manage-profile", "Manage Profile");
          profileMap.set("profile/manage-properties","Manage Properties");
          profileMap.set("profile/bookings","Bookings");
          profileMap.set("profile/privacy","Privacy");
        }
      }

      const arr : string[] = internationalKeys;

      arr.map((i) => {
        console.log(i)
        internationalMap.set(i,i);
      })
      //const expiry : number = parseJWT(jwtValue).exp;
      const authItems = Object.fromEntries(authMap);
      const manageCommonItems = Object.fromEntries(profileMap);
      const internationItems = Object.fromEntries(internationalMap);


    return (
        <div className={style.dropdown} tabIndex={0}>
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
      <div className={style.authDropdown} >
        <h3>Languages</h3>
          {
            Object.entries(internationItems).map(([key,value]) => (
              // <Link key ={key} className={style.links} href={`/${locale}/${key}`}>{value}</Link>
              <button tabIndex={0} key={key} id={style.fakeLink} className={style.links} onClick={(e) => handleClick(e,value)}>
              {key}
          </button>
            ))
          }
      </div>
  
        </div>
  </div>
    )
}

export default ProfileDropdown;