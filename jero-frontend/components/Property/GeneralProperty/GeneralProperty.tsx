
'use client'
import { PropertyAttributeFull} from "@/types/types";
import Image from 'next/image'
import stylePC from "./propertyGeneral.module.css"
import mobileStyle from "./propertyGeneralMobile.module.css"
import { GuestCounts } from "@/app/types/types";
import {useMemo, useState } from "react";
import Amenities from "../GeneralProperty/Amenities/Amenities";
import { useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import MobileBubbles from "../GeneralProperty/MobileBubbles/MobileBubbles";
import dynamic from "next/dynamic";
import Reviews from "../GeneralProperty/Reviews/Review";
import ProfileCard from "@/components/Profile/ManageProfile/ProfileCard";
import { useTranslations } from "next-intl";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';
type UserDeets = {
    id : string | null;
    role : string | null;
    startDate : string;
    endDate : string;
    numAdults : number;
    numChildren : number;
    numPets : number;
}

interface Props{
    propertyAttributes : PropertyAttributeFull;
    userDeets : UserDeets;
    isMobile : boolean;
    isCircle: boolean;
}

type Expanded = {
    overviewExpand : boolean;
    amenitiesExpand : boolean;
    reviewsExpand : boolean;
}

const GeneralProperty = (props : Props) => {
    const t = useTranslations('Property');
    //console.log("reviews: " + JSON.stringify(props.propertyAttributes.reviews))
    const sp = useSearchParams();
    const adultCountSp = Number(sp.get("numadults"))
    //const adultCountSp = props.userDeets.numAdults
    let childCountSp = Number(sp.get("numchildren"))
    let petCountSp = Number(sp.get("numpets"))
    const startDate = props.userDeets.startDate

    const endDate = props.userDeets.endDate
    console.log("userid: " + props.userDeets.id)
    console.log("userrole: " + props.userDeets.role)
    let allowedToBook : boolean = false
    console.log("start " + startDate)
    console.log("image url " + props.propertyAttributes.images)
    if(props.userDeets.id !== null && props.userDeets.role === 'customer'){
        allowedToBook = true
    }
    const disabled: string[] = []
    if(!props.propertyAttributes.acceptsChildren){
        childCountSp = 0;
        disabled.push("childCount")
    }

    if(!props.propertyAttributes.acceptsPets){
        disabled.push("petCount")
        petCountSp = 0;
    }

    const [expanded, setExpanded] = useState<Expanded>(
        {
            overviewExpand : true,
            amenitiesExpand : true,
            reviewsExpand : false,
        }
    ) 

    const handleToggleSection = (e : any) =>{
        e.preventDefault();
        const id = e.target.id as keyof Expanded;
        console.log(expanded[id])
        setExpanded({...expanded, [id] : !expanded[id]})
        console.log("toggle " + JSON.stringify(expanded));
        console.log(id)
    }

    const [guestCounts, setGuestCounts] = useState<GuestCounts>(
        { 
            adultCount : adultCountSp,
            childCount : childCountSp,
             petCount : petCountSp
        });
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map/Map'),
        { 
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }
        ), [])

    const [getStartDate, setStartDate] = useState<Date>(new Date(startDate));
    const [getEndDate, setEndDate] = useState<Date>(new Date(endDate));


    const bookingLength = ((getEndDate.getTime() - getStartDate.getTime()) / 86_400_000);

    const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);

    const [showImage, setShowImage] = useState<boolean>(true);


    const handleIncrement = (e : any) => {
        e.preventDefault();
        setCurrentImageIdx(currentImageIdx < props.propertyAttributes.images.length - 1 ? currentImageIdx + 1 : 0);
    }

    const handleDecrement = (e : any) => {
        e.preventDefault();
        setCurrentImageIdx(currentImageIdx > 0 ? currentImageIdx - 1 :  props.propertyAttributes.images.length - 1)
        console.log(currentImageIdx)
    }



    // console.log(props.userDeets.startDate)
    // console.log(props.propertyAttributes.beauty);
    // const baseCost = bookingLength * Number(props.propertyAttributes.pricePerNight);
    // const extraCost = (Number(props.propertyAttributes.priceIncreasePerPerson) > 0 && (guestCounts.adultCount + guestCounts.childCount) > 1) 
    //     ?
    //     Number(props.propertyAttributes.priceIncreasePerPerson) * bookingLength * (guestCounts.adultCount + guestCounts.childCount - 1)
    //     :
    //     0
    //     ;
    
         const style = props.isMobile ? mobileStyle : stylePC;

    return(
        <>
               <section id={style.info}>
            <h1>{props.propertyAttributes.title || t('noTitle')}</h1>
            

            {/* {
                props.isMobile &&
                <strong style={{display : "flex", justifyContent : "center", fontSize : "large", margin :"0.5em", color : "green"}}>
                    💸 £{props.propertyAttributes.pricePerNight + (Number(props.propertyAttributes.priceIncreasePerPerson) * (guestCounts.adultCount + guestCounts.childCount -1))} per night 
                    - £{Number(props.propertyAttributes.pricePerNight + (Number(props.propertyAttributes.priceIncreasePerPerson) * (guestCounts.adultCount + guestCounts.childCount -1))) * bookingLength} total 💸
                </strong>
              } */}
              {
                showImage
                ?
                <div id={stylePC.imageArea}>
                <button aria-label="go to previous image" onClick={handleDecrement}> &larr;</button>
                <figure>
                <Image
                    src={props.propertyAttributes.images.at(currentImageIdx) || "/vercel.svg"}
                    width={props.isMobile ? 350 : 800}
                    height={props.isMobile ? 243.2 :533}
                    alt="Picture of the property"
                  />
                  <figcaption>{t('image')} {currentImageIdx + 1} {t('of')} {props.propertyAttributes.images.length}</figcaption>
                  </figure>
                  <button aria-label="go to next image" onClick={handleIncrement}>&rarr;</button>
                </div>
                :
                <div>
                <Map position={[props.propertyAttributes.latitude, props.propertyAttributes.longitude]} zoom={15} isCircle={props.isCircle}/>

                </div>
              }
          
              <div id={stylePC.imageToggleArea}>
              <button style={{margin : "0.5em", fontSize : "large"}} className="basicButton" onClick={() => setShowImage(!showImage)}>{showImage ? t('showMap') : t('showImages') }</button>
              </div>

            <div id={style.overview}>
                <div className={`${style.toggleTitle} ${!expanded.overviewExpand ? mobileStyle.closed : mobileStyle.open}`}>
                    <h2>{t('overview')}</h2>
                    <button  className="basicButton"  id='overviewExpand' onClick={handleToggleSection}> {expanded.overviewExpand ? t('hide'): t('show')}</button>
                </div>
                {
                    expanded.overviewExpand
                        &&
                    <div  style={{padding: "0.5em"}} id={style.overviewArea}>
                    <MobileBubbles propertyAttributes={props.propertyAttributes}/>
                        <h4>{t('description')}</h4>
                        <div id={style.description}>
                        <p >{props.propertyAttributes.description || "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}

                        </p>
                        <h4>{t('rules')}</h4>
                        <p>{props.propertyAttributes.description || ""}</p>
                        </div>
                        <div id={stylePC.profileCard}>
                    <h3>{t('host')}</h3>
                <ProfileCard 
                    firstName={props.propertyAttributes.profileInfo.fname} 
                    lastName={props.propertyAttributes.profileInfo.lname} 
                    introduction={props.propertyAttributes.profileInfo.intro} 
                    imgLink={props.propertyAttributes.profileInfo.img}
                    />
                </div>
                    </div>
                }

            </div>
        <div id={style.amentiesArea}>
            <div className={`${style.toggleTitle} ${!expanded.amenitiesExpand ? mobileStyle.closed : mobileStyle.open}`}>
            <h2>{t('amenities')}</h2>
            <button id={'amenitiesExpand'} className="basicButton" onClick={handleToggleSection}>{expanded.amenitiesExpand ? t('hide'): t('show')}</button>
            </div>
            
            {
                expanded.amenitiesExpand
                    &&
                <div>
                    <Amenities object={props.propertyAttributes.beauty} amenityName={`🪞 ${t('beauty')}`}  />
                    <Amenities object={props.propertyAttributes.climateControl} amenityName={`🪭 ${t('climateControl')}`}  />
                    <Amenities object={props.propertyAttributes.entertainment} amenityName={`📺 ${t('entertainment')}`}  />
                    <Amenities object={props.propertyAttributes.healthAndSafety} amenityName={`🩹 ${t('healthAndSafety')}`}  />
                    <Amenities object={props.propertyAttributes.kitchen} amenityName={`🍲 ${t('kitchen')}`}  />
                    <Amenities object={props.propertyAttributes.laundry} amenityName={`🫧 ${t('laundry')}`}  />
                    <Amenities object={props.propertyAttributes.transport} amenityName={`🚗 ${t('transport')}`}  />
                    <Amenities object={props.propertyAttributes.water} amenityName={`🚿 ${t('water')}`}  />
                </div>
            }
        </div>

        <div id={style.reviewArea}>
            <div className={`${style.toggleTitle} ${!expanded.reviewsExpand ? mobileStyle.closed : mobileStyle.open}`}>
            
{                props.propertyAttributes.reviews === null 
                ?
                <h2>
                {t('noReviews')}
                </h2>
                :

                <h2>{t('reviews')}</h2>}
            
            <button disabled={props.propertyAttributes.reviews === null} id={'reviewsExpand'} className="basicButton" onClick={handleToggleSection}>{expanded.reviewsExpand ? t('hide'): t('show')}</button>

            </div>
            
            {
                expanded.reviewsExpand
                    &&
                Object.entries(props.propertyAttributes.reviews).map(([key,value]) => (
                    <div key={key}>
                    <Reviews reviewDate={(value.reviewDate)} reviewer={value.userName} score={value.score} title={value.title} body={value.body}/>
                    </div>
                ))
            }
        </div>


            </section>
        
        </>
    )
}

export default GeneralProperty;