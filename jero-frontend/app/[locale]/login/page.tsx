import React from 'react'
import Login from "@/components/Login/Login";
import style from "./page.module.css"
import { cookies } from 'next/headers';
import { useTranslations } from 'next-intl';
import {getTranslations} from 'next-intl/server';

type Props = {}

const page = async (props: Props) => {
    // const cookieStore = await cookies();
    // const jwtValue = cookieStore.get("JWT")?.value;
    // const rtValue = cookieStore.get("RT")?.value;
    // https://next-intl.dev/docs/environments/server-client-components
    const t = await getTranslations('Login');

    return (
        <div>
            <h1 id={style.title}>{t('welcomeBack')}</h1>
            <Login/>
        </div>
    )
}

export default page