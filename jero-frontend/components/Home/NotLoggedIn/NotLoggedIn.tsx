import { Link } from "@/i18n/routing";
import style from "./notloggedin.module.css"

const NotLoggedIn = () => {
    return (
        <div id={style.container} >
            <div id={style.subcontainer}>
                <h1>Welcome</h1>
                <Link className={style.link}  href={"/signup"}>If you are new here, click here to signup and start travelling or hosting</Link>
                <Link className={style.link} href={"/login"}>If you are already have an account, click here to login</Link>
            </div>
        </div>
    )
}

export default NotLoggedIn;