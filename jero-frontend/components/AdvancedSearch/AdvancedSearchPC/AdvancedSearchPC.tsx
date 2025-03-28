'use client'
import Form from 'next/form'
import style from "./AdvancedSearchPC.module.css"
import GuestToggler from '../../Navbar/NavbarPC/GuestDropdown/GuestToggler'
import { useState } from 'react'
import { GuestCounts } from '@/app/types/types'
import MultiRangeSlider from "multi-range-slider-react";
import { SiBitly } from 'react-icons/si'


interface FormData {
    start : string;
    end : string;
    count : GuestCounts;
    attractions : string[];
    holidayType : string;
    guestTypes : string;
    gettingAround : string;
}

export const AdvancedSearchPC = () => {
    const [minEndDate, setMinEndDate] = useState<string>("");

    const [count, setCount] = useState<GuestCounts>({adultCount : 1, childCount : 0, petCount : 0});
    const [formData, setFormData] = useState<FormData>(
        {
        start: "",
        end : "",
        count: {adultCount : 1, childCount : 0, petCount : 0},
        attractions : [],
        holidayType : "",
        guestTypes : "",
        gettingAround : "",
    }
);    
    

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name] : value });
        if(name === `start`){
          let startPlusDay : Date = new Date(value);
          startPlusDay.setDate(startPlusDay.getDate() + 1);
          const minEndDate = startPlusDay.toISOString().split("T")[0]; 
          setMinEndDate(minEndDate);
        }
      };

    const [minValue, set_minValue] = useState(18);
const [maxValue, set_maxValue] = useState(26);
    const handleInput = (e : any) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    return(
        <div id={style.container}>
            <div>
            <form>
            <fieldset className={style.fields}>
                </fieldset>
            <fieldset className={style.fields}>
                <div className={style.underlineDiv}>
                <h3>When</h3>
                </div>
                <div className={style.inputContainer}>
                <input id="startDate" type="date" name="startDate"/>
                <label htmlFor="startDate">Start Date</label>
                <input id="endDate" type="date" name="endDate"/>
                <label htmlFor="endDate">End Date</label>
                </div>
                </fieldset>
                <fieldset className={style.fields} >
                <div className={style.underlineDiv}>
                <h3>Who</h3>
                </div>
                <GuestToggler count={count} setCount={setCount} disabled={[]}/>
                </fieldset>
                <fieldset  className={style.fields} >
                <div className={style.underlineDiv}>
                 <h3>Weather at time of travel</h3>
                 <MultiRangeSlider
                 id={style.rangeSlider}
                    style={{border : "none", boxShadow : "none"}}
                    min={-20}
                    barInnerColor='black'
                    max={50}
                    step={1}
                    minValue={minValue}
                    maxValue={maxValue}
                    ruler={false}
                    label={true}
                    onInput={(e) => {
                        handleInput(e);
                    }}/>
                </div>
                <div className={style.underlineDiv}>
                 <h3>Attractions</h3>
                 <input type="checkbox" />
                </div>
                <div className={style.underlineDiv}>
                 <h3>Location type</h3>
                    <div className={style.items}>
                                         
                    <label htmlFor="beach">Beach</label>
                    <input type="radio" id="beach" name="beach" />

                    <label htmlFor="city">City</label>
                    <input type="radio" id="city" name="city" />

                    <label htmlFor="city">Village</label>
                    <input type="radio" id="village" name="skiing" />

                    <label htmlFor="city">Skiing</label>
                    <input type="radio" id="skiing" name="skiing" />
                 
                    </div>
                </div>
                <div className={style.underlineDiv}>
                 <h3>Tourism Levels</h3>
                </div>
                <div className={style.underlineDiv}>
                    <h3>Family friendly etc</h3>
                </div>
                <div className={style.underlineDiv}>
                    <h3>Getting around</h3>                
                </div>
                </fieldset>
            </form>
            </div>
        </div>
    )
}