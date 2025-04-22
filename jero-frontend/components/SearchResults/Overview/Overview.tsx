'use client'

import { useState } from "react";
import style from "./Overview.module.css"
import { useTranslations } from "next-intl";
import { PropertyAttribute } from "@/types/types";
import SearchResultsMap from "../SearchResultsMap";

interface Props {
    locationOverview : any
}

const Overview = (props : Props) => {

    const [currentTile, setCurrentTile] = useState<number>(0);
    const t = useTranslations('Overview');
    console.log(props.locationOverview)
    const handleIncrement = (e: any) => {
        e.preventDefault();
        if(currentTile === 2){
            setCurrentTile(0);
        }else{
            setCurrentTile(currentTile + 1);
        }
    }

    const handleDecrement = (e: any) => {
        e.preventDefault();
        if(currentTile === 0){
            setCurrentTile(2);
        }else{
            setCurrentTile(currentTile -1);
        }
    }


    return (
        <div  id={style.container}>
            {
                currentTile === 0 
                &&
                <div id={style.subcontainer}>
                <div className={style.overviewSubsection}>
                            <h3>{t('funFact')}</h3>
                            <p>{props.locationOverview.overview}</p>
                            </div>

                    <div className={style.overviewSubsection}>
                    <h3>{t('attractions')}</h3>
                    <ul id={style.uList}>
                    {props.locationOverview.attractions.map((i: any, index : number) => (
                        <li key={index}>{i}</li> 
                    ))}
                    </ul>
                    </div>
                </div>
            }

{
                currentTile === 1
                &&
            <div id={style.subcontainer}>
            <div className={style.overviewSubsection}>
              <h3>Average Temperature (at time of travel)</h3>
              <p>{props.locationOverview.temp} &deg;C</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Traditional Dishes</h3>
              <ul>
              {props.locationOverview.dishes.map((i: any, index : number) => (
                <li key={index}>{i}</li> 
               ))}
              </ul>
            </div>
            </div>
            }

{
                currentTile === 2
                &&
                <div id={style.subcontainer}>
            <div className={style.overviewSubsection}>
              <h3>Crime Levels (at time of travel)</h3>
              <p>{props.locationOverview.crime} &deg;C</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Typical Costs</h3>
              <ul>
              {props.locationOverview.cost.map((i: any, index : number) => (
                <li key={index}>{i}</li> 
               ))}
              </ul>
            </div>
            </div>
            }

            <br />
            <div id={style.buttonArea}>
                <button className="basicButton" onClick={handleDecrement}>{t('back')}</button>
                <button className="basicButton" onClick={handleIncrement}>{t('next')}</button>
            </div>
        </div>
    )
}

export default Overview;