'use client'
import { PropertyAttributeFull} from "@/types/types";
import Image from 'next/image'
import stylePC from "./propertycustomer.module.css"
import mobileStyle from "./propertyCustomerMobile.module.css"
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { GuestCounts } from "@/app/types/types";
import { SetStateAction, useMemo, useState } from "react";
import Amenities from "./Amenities/Amenities";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PCBubbles from "./PCBubbles/PCBubbles";
import MobileBubbles from "./MobileBubbles/MobileBubbles";
import GeneralBook from "./GeneralBook/GeneralBook";
import MobileBook from "./MobileBook/MobileBook";
import dynamic from "next/dynamic";
import exp from "constants";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type UserDeets = {
    id : string | null;
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
}

type Expanded = {
    overviewExpand : boolean;
    amenitiesExpand : boolean;
}

const PropertyCustomer = (props : Props) => {
    const sp = useSearchParams();
    const adultCountSp = Number(sp.get("numadults"))
    let childCountSp = Number(sp.get("numchildren"))
    let petCountSp = Number(sp.get("numpets"))
    const startDate = sp.get("startdate") || "";
    const endDate = sp.get("enddate") || "";
    // const disabled: string[] = []
    // if(!props.propertyAttributes.acceptsChildren){
    //     childCountSp = 0;
    //     disabled.push("childCount")
    // }

    // if(!props.propertyAttributes.acceptsPets){
    //     disabled.push("petCount")
    //     petCountSp = 0;
    // }

    const [expanded, setExpanded] = useState<Expanded>(
        {
            overviewExpand : true,
            amenitiesExpand : true,
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



    console.log(props.userDeets.startDate)
    console.log(props.propertyAttributes.beauty);
    const baseCost = bookingLength * Number(props.propertyAttributes.pricePerNight);
    const extraCost = (Number(props.propertyAttributes.priceIncreasePerPerson) > 0 && (guestCounts.adultCount + guestCounts.childCount) > 1) 
        ?
        Number(props.propertyAttributes.priceIncreasePerPerson) * bookingLength * (guestCounts.adultCount + guestCounts.childCount - 1)
        :
        0
        ;
    
        const style = props.isMobile ? mobileStyle : stylePC;
    return( 
        <div id={style.container}>

            <section id={style.info}>
            <h1>{props.propertyAttributes.title || "No title provided"}</h1>
            

            {
                props.isMobile &&
                <strong style={{display : "flex", justifyContent : "center", fontSize : "large", margin :"0.5em", color : "green"}}>
                    💸 £{props.propertyAttributes.pricePerNight + (Number(props.propertyAttributes.priceIncreasePerPerson) * (guestCounts.adultCount + guestCounts.childCount -1))} per night 
                    - £{Number(props.propertyAttributes.pricePerNight + (Number(props.propertyAttributes.priceIncreasePerPerson) * (guestCounts.adultCount + guestCounts.childCount -1))) * bookingLength} total 💸
                </strong>
              }
              {
                showImage
                ?
                <div id={stylePC.imageArea}>
                <button onClick={handleDecrement}> &larr;</button>
                <figure>
                <Image
                    src={props.propertyAttributes.images.at(currentImageIdx) || "/vercel.svg"}
                    width={props.isMobile ? 350 : 800}
                    height={props.isMobile ? 243.2 :533}
                    alt="Picture of the author"
                  />
                  <figcaption>Image {currentImageIdx + 1} of {props.propertyAttributes.images.length}</figcaption>
                  </figure>
                  <button onClick={handleIncrement}>&rarr;</button>
                </div>
                :
                <div>
                <Map position={[props.propertyAttributes.latitude, props.propertyAttributes.longitude]} zoom={15} isCircle={true}/>

                </div>
              }
          
              <div id={stylePC.imageToggleArea}>
              <button style={{margin : "0.5em", fontSize : "large"}} className="basicButton" onClick={() => setShowImage(!showImage)}>{showImage ? `Show Map` : `Show Images` }</button>
              </div>

            <div id={style.overview}>
                <div className={`${style.toggleTitle} ${!expanded.overviewExpand ? mobileStyle.closed : mobileStyle.open}`}>
                    <h2>Overview</h2>
                    <button  className="basicButton"  id='overviewExpand' onClick={handleToggleSection}> {expanded.overviewExpand ? `Collapse`: `Expand`}</button>
                </div>
                {
                    expanded.overviewExpand
                        &&
                    <div id={style.overviewArea}>
                    <MobileBubbles propertyAttributes={props.propertyAttributes}/>
        
                        <div id={style.description}>
                        <p >{props.propertyAttributes.description || "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}

                        </p>
                        </div>
                    </div>
                }
            </div>
        <div id={style.amentiesArea}>
            <div className={`${style.toggleTitle} ${!expanded.amenitiesExpand ? mobileStyle.closed : mobileStyle.open}`}>
            <h2>Amenities</h2>
            <button id={'amenitiesExpand'} className="basicButton" onClick={handleToggleSection}>{expanded.amenitiesExpand ? `Collapse`: `Expand`}</button>
            </div>
            
            {
                expanded.amenitiesExpand
                    &&
                <div>
                    <Amenities object={props.propertyAttributes.beauty} amenityName={"🪞 beauty"}  />
                    <Amenities object={props.propertyAttributes.climateControl} amenityName={"🪭 climate control"}  />
                    <Amenities object={props.propertyAttributes.entertainment} amenityName={"📺 entertainment"}  />
                    <Amenities object={props.propertyAttributes.healthAndSafety} amenityName={"🩹 healthAndSafety"}  />
                    <Amenities object={props.propertyAttributes.kitchen} amenityName={"🍲 kitchen"}  />
                    <Amenities object={props.propertyAttributes.laundry} amenityName={"🫧 laundry"}  />
                    <Amenities object={props.propertyAttributes.transport} amenityName={"🚗 transport"}  />
                    <Amenities object={props.propertyAttributes.water} amenityName={"🚿 water"}  />
                </div>
            }
        </div>


            </section>
                {
                    props.isMobile ? 
                    <MobileBook   baseCost={baseCost}
                    extraCost={extraCost}
                    getStartDate={getStartDate}
                    setStartDate={setStartDate}
                    getEndDate={getEndDate}
                    setEndDate={setEndDate}
                    guestCounts={guestCounts}
                    setGuestCounts={setGuestCounts}
                    acceptsChildren={props.propertyAttributes.acceptsChildren}
                    acceptsPets={props.propertyAttributes.acceptsPets} 
                    propertyId={props.propertyAttributes.id}/> 
                    : 
                        <GeneralBook 
                            baseCost={baseCost} 
                            extraCost={extraCost} 
                            getStartDate={getStartDate} 
                            setStartDate={setStartDate} 
                            getEndDate={getEndDate} 
                            setEndDate={setEndDate} 
                            guestCounts={guestCounts} 
                            setGuestCounts={setGuestCounts} 
                            acceptsChildren={props.propertyAttributes.acceptsChildren} 
                            acceptsPets={props.propertyAttributes.acceptsPets}
                            isMobile={false}
                            propertyId={props.propertyAttributes.id}/>
                }
        </div> 
    )
}

export default PropertyCustomer;