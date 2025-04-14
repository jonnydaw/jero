import React, { Dispatch, SetStateAction } from 'react'

import GuestToggler from './GuestToggler'
import style from "./Dropdown.module.css"
import { GuestCounts } from '@/app/types/types'
import {useTranslations} from "next-intl";

type Props = {
    count : GuestCounts
    setCount : Dispatch<SetStateAction<GuestCounts>>
  }

const Dropdown : React.FC<Props> = ({count, setCount}) => {

  const t = useTranslations('SearchBar');
  return (
    <div className={style.dropdown} tabIndex={0}>
      {/* https://stackoverflow.com/questions/16449295/how-to-sum-the-values-of-a-javascript-object*/}
     <span className={style.dropdownText}>{t('guests')}: {Object.values(count).reduce((a,b) => a+b,0)}</span>
    <div className={style.dropdownContent} tabIndex={0}>

    <GuestToggler
        count = {count}
        setCount={setCount}
        disabled={[]}
      />
  </div>
</div>
  )
}

export default Dropdown;