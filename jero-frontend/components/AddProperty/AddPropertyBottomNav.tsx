

import { Link } from "@/i18n/routing"
import bottomNavStyle from "./AddPropertyNavigation.module.css"
import { FormEventHandler } from "react"

interface Props {
    handleSubmitFunction :  FormEventHandler<HTMLFormElement>;
    buttonText : string;
    prevSteps : number[];
}

const AddPropertyBottomNav = (props : Props) => {
    return(
        <nav id={bottomNavStyle.navArea}>
            <form 
            id={bottomNavStyle.submitButtonArea} 
            onSubmit={props.handleSubmitFunction}>
                <button id={bottomNavStyle.button}>
                    {props.buttonText}
                </button>
            </form>
            <div id={bottomNavStyle.links}>
            {(props.prevSteps).map((x) =>
                 <Link key={x} href={`/add-property/step${x}`}>{x}</Link>
            )}
                
                {/* <Link href={"/add-property/step2"}>2</Link> */}
            </div>
        </nav>
)
}

export default AddPropertyBottomNav;