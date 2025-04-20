import React from 'react'
import Signup from "@/components/Signup/Signup";
import style from './page.module.css'
import { useTranslations } from 'next-intl';
type Props = {}

const page = (props: Props) => {
    const t = useTranslations("Signup")
    return (
        <div>
            <h1 id={style.title}>{t('welcome')}</h1>
            <Signup/>
        </div>
    )
}

export default page