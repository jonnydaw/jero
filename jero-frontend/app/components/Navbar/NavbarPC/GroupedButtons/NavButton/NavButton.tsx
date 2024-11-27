import React from 'react'
import Link from 'next/link'
import { CiShoppingBasket } from 'react-icons/ci'
import style from "../../Navbar.module.css"
import { CgProfile } from 'react-icons/cg'
import { IconType } from 'react-icons'

type Props = {
  Icon : IconType
  prompt : string
}

const NavButton : React.FC<Props> =  ({Icon, prompt}) => {
  return (
    <>
      <div className={style.dropdown}>
        <button className={`${style.links} ${style.button}`} >
          <Icon size = '1.5em' className={style.icon}/>
        </button>
      <div className={style.dropdownContent}>
        <button>{prompt}</button>
    </div>
  </div>
</>
  )
}

export default NavButton