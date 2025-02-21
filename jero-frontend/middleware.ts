import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
// // https://next-intl-docs.vercel.app/docs/routing/middleware

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);
//helpers start

const protectedPages : string[] = ["profile"];
const authIngressPages : string[] = ["login","signup"];



const parseJWT = (jwtValue : string) => {
    return (JSON.parse(atob(jwtValue.split('.')[1])))
}

// https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library
function isTokenExpired(jwtValue : string) {
    const expiry : number = parseJWT(jwtValue).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
}


//helpers end

export default async function middleware(request: NextRequest) {
    let response = handleI18nRouting(request);
    const [, locale, page, ..._] = request.nextUrl.pathname.split('/');
    if (authIngressPages.includes(page)) {
        console.log(await blockAuthIngress(locale))
        return await blockAuthIngress(locale);
    }

    if(page === "otp"){
        return await blockOtpIfNotPending(locale);
    }

    return await refreshAccess(response,locale, page);

}


const blockAuthIngress = async (locale :string) => {
    const cookieStore = await cookies();
    const jwtValue : string | undefined = cookieStore.get("JWT")?.value;
    const rtValue : string | undefined  = cookieStore.get("RT")?.value;

    if(!jwtValue || !rtValue){
        return;
    }

    return NextResponse.redirect(`http://localhost:3000/${locale}`);
}

const blockOtpIfNotPending = async (locale : string) => {
    const cookieStore = await cookies();
    const jwtValue : string | undefined = cookieStore.get("JWT")?.value;
    if(!jwtValue) return NextResponse.redirect(`http://localhost:3000/${locale}`)
    const isPending = parseJWT(jwtValue).status;
    if(isPending !== `PENDING`) return NextResponse.redirect(`http://localhost:3000/${locale}`);


}

// https://stackoverflow.com/questions/71525415/set-http-only-cookies-inside-nextjs-middleware
const refreshAccess = async (response : NextResponse, locale: string, page : string) => {

    const cookieStore = await cookies();
    const jwtValue : string | undefined = cookieStore.get("JWT")?.value;
    const rtValue : string | undefined  = cookieStore.get("RT")?.value;


    if(!rtValue && protectedPages.includes(page)){
        return NextResponse.redirect(`http://localhost:3000/${locale}`);
    }


    let isInvalid : boolean = false;
    if(jwtValue){
        isInvalid = isTokenExpired(jwtValue)
    }
    if(isInvalid && rtValue){

        const refreshResponse = await fetch("http://localhost:8080/auth/refresh", {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue}; RT=${rtValue}`
            },
            credentials : "include",
        });
    if (!refreshResponse.ok) {
        if(protectedPages.includes(page)){
            return NextResponse.redirect(`http://localhost:3000/${locale}`);
        }
    }

    const cookie = refreshResponse.headers.get("set-cookie")?.split("=")[1]
    if(cookie){
        response.cookies.set("JWT", cookie, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1800,
            path: "/",
        });
    }

     }
    return response;
}

export const config = {
    matcher: ['/', '/(es|en|br)/:path*']
};
