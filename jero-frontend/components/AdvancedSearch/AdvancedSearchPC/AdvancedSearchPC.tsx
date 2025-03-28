'use client'
import Form from 'next/form'
import style from "./AdvancedSearchPC.module.css"
import GuestToggler from '../../Navbar/NavbarPC/GuestDropdown/GuestToggler'
import { useState } from 'react'
import { GuestCounts } from '@/app/types/types'
export const AdvancedSearchPC = () => {
    const [count, setCount] = useState<GuestCounts>({adultCount : 1, childCount : 0, petCount : 0});

    return(
        <div id={style.container}>
            <div>
            <Form action="/search">
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
                </div>
                <div className={style.underlineDiv}>
                 <h3>Daily expenses</h3>
                </div>
                <div className={style.underlineDiv}>
                 <h3>Location type</h3>
                </div>
                <div className={style.underlineDiv}>
                 <h3>Tourism Levels</h3>
                </div>
                <div className={style.underlineDiv}>
                 <h3>Family friendly etc</h3>
                </div>
                </fieldset>
            </Form>
            </div>
        </div>
    )
}