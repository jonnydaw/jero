import React, { Dispatch, SetStateAction } from 'react'
import style from './Dropdown.module.css'
import {GuestCounts} from "../../../../app/types/types"
import {useTranslations} from 'next-intl';

type Props = {
  count : GuestCounts
  setCount : Dispatch<SetStateAction<GuestCounts>>
  disabled: string[];
  max : number;
  min : number;
}


const GuestToggler : React.FC<Props> = ({count, setCount, disabled, min, max}) => {
  
  const increment = (e: React.MouseEvent,key : string) => {
    if(Object.values(count).reduce((a,b) => a+b,0) >= max){

    }else if(count[key as keyof GuestCounts] < 256){
    setCount({...count,[key] : count[key as keyof GuestCounts] + 1})
    }
  }
  
  const decrement = (e: React.MouseEvent,key:string) => {
    if(Object.values(count).reduce((a,b) => a+b,0) <= min){

    }else{
    if(key === `adultCount` && count[key] > 1){
      setCount({...count,[key] : count[key] -1})
    }
    else if (key !== `adultCount` && count[key as keyof GuestCounts] > 0) { 
      setCount({...count,[key] : count[key as keyof GuestCounts] -1})
    }
  }
  };
  const t = useTranslations("DropdownCount");
  const jsonToText : Map<string, string> = new Map([
    ['adultCount', t('adult')],
    ['childCount', t('child')],
    ['petCount', t('pet')]
  ])

  return (
    <>
       {
       Object.entries(count).map(([key, value]) => {
        if(disabled && disabled.includes(key)){
          return null;
        }
        return (
          <div key={key} className={style.toggles}>
          <span className={style.textArea}>{jsonToText.get(key)}</span>
          <div className={style.buttonArea}>
            <button
              aria-label={`decrease ${jsonToText.get(key)} count`}
              type='button'
              disabled={Object.values(count).reduce((a,b) => a+b,0) <= min}
              className={style.toggleButton}
              onClick={(e) => decrement(e, key)}>
              &#8722;
            </button>
            <span  key = {key}> {value} </span>
            <button
            aria-label={`increase ${jsonToText.get(key)} count`}
              type='button'
              disabled={Object.values(count).reduce((a,b) => a+b,0) >= max}
              className={style.toggleButton}
              onClick={(e) => increment(e, key)}>
              &#43;
            </button>
          </div>
          </div>
        );
      })
    }
    </>
  )
}

export default GuestToggler