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
                <div className={style.underlineDiv}>
                <h3>Type of booking</h3>
                </div>
                <select
          name="options"
        >
          <option value="" disabled hidden>
              Pick an option
          </option>
          <option value="accommodation">accommodation</option>
          <option value="flights">flights</option>
          <option value="both">both</option>
        </select>
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
            </Form>
            </div>
        </div>
    )
}