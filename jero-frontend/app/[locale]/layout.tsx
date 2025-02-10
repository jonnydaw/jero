import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
// import {notFound} from 'next/navigation';
// import {routing} from '@/i18n/routing';
import Navbar from "@/app/components/Navbar/Navbar";

import 'normalize.css';
import '../globals.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default async function LocaleLayout({children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return(
        <html lang= {locale} className={`${poppins.variable}`}>
        <body >
        <NextIntlClientProvider messages={await  getMessages()}>
            <Navbar/>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}