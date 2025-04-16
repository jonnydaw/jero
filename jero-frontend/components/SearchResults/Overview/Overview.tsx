'use client'

import { useState } from "react";
import style from "./Overview.module.css"

interface Props {
    locationOverview : any
}

const Overview = (props : Props) => {

    const [currentTile, setCurrentTile] = useState<number>(0);
    
    const handleIncrement = (e: any) => {
        e.preventDefault();
        if(currentTile === 5){
            setCurrentTile(0);
        }else{
            setCurrentTile(currentTile + 1);
        }
    }

    const handleDecrement = (e: any) => {
        e.preventDefault();
        if(currentTile === 0){
            setCurrentTile(5);
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
                            <h3>Fun Fact</h3>
                            <p>{props.locationOverview.overview}</p>
                            </div>

                    <div className={style.overviewSubsection}>
                    <h3>Attractions</h3>
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
            <br />
            <div id={style.buttonArea}>
                <button className="basicButton" onClick={handleDecrement}>back</button>
                <button className="basicButton" onClick={handleIncrement}>next</button>
            </div>
        </div>
    )
}

export default Overview;