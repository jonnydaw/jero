
interface Props  {
    firstName: string;
    lastName : string;
    introduction : string;
    imgLink : string;
}
import { DOMAttributes } from "react";
import style from "./profilecard.module.css"

const ProfileCard = (props : Props) => {
    // https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript

    function imageExists(image_url : string){
        if(image_url === null || image_url === "") return false;
        let http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
    
    }
 
   const imageLink =  imageExists(props.imgLink) ? props.imgLink : "/vercel.svg";
    return(
        <div id={style.container}>
            <div id={style.guessWhatAnotherContainer}>
                <div id={style.imageContainer}>
                    <img 
                    id={style.image}
                    src={imageLink}
                  />
                </div>
                {/* <img src="/vercel.svg" alt="" /> */}
                <div id={style.theRest}>
                    <div id={style.names}>
                    <h3>{`${props.firstName} ${props.lastName}` }</h3>
                    </div>
                    <p id={style.intro}>{props.introduction}</p>
                </div>

            </div>
        </div>
    )
}

export default ProfileCard;