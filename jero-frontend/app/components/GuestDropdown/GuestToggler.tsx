import React, { Dispatch, SetStateAction } from 'react'
import style from './Dropdown.module.css'
import {GuestCounts} from "../../types/types"
import {useTranslations} from 'next-intl';

type Props = {
  count : GuestCounts
  setCount : Dispatch<SetStateAction<GuestCounts>>
}



const GuestToggler : React.FC<Props> = ({count, setCount}) => {
  
  const increment = (e: React.MouseEvent,key : string) => {
    if(count[key] < 256){
    setCount({...count,[key] : count[key] + 1})
    }
  }
  
  const decrement = (e: React.MouseEvent,key:string) => {
    if (count[key] > 0) { 
      setCount({...count,[key] : count[key] -1})
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
        return (
          <div key={key} className={style.toggles}>
          <span className={style.textArea}>{jsonToText.get(key)}</span>
          <div className={style.buttonArea}>
            <button
              type='button'
              className={style.toggleButton}
              onClick={(e) => decrement(e, key)}>
              &#8722;
            </button>
            <span  key = {key}> {value} </span>
            <button
              type='button'
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