import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
// https://next-intl.dev/docs/usage/configuration
// https://github.com/amannn/next-intl/issues/545
// https://phrase.com/blog/posts/next-js-app-router-localization-next-intl/
// import {notFound} from 'next/navigation';
// import {routing} from '@/i18n/routing';
import Navbar from "@/components/Navbar/Navbar";

import 'normalize.css';
import '../globals.css'
import { Poppins } from 'next/font/google';
import { cookies } from 'next/headers';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default async function LocaleLayout({children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const rtValue = cookieStore.get("RT")?.value;
    const parseJWT = (jwtValue : string) => {
        return (JSON.parse(atob(jwtValue.split('.')[1])))
    };
    
    let isCustomer;
    if(jwtValue){
        isCustomer = parseJWT(jwtValue).role === "customer";
    }
    const isLoggedIn = (jwtValue && rtValue) ? true : false;
    const { locale } = await params;
    return(
        <html lang= {locale} className={`${poppins.variable}`}>
        <body >
        <NextIntlClientProvider messages={await  getMessages()}>
            <Navbar isLoggedIn={isLoggedIn} isCustomer={isCustomer || false}/>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}