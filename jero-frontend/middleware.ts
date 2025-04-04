import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
// // https://next-intl-docs.vercel.app/docs/routing/middleware

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { inDevEnvironment } from './base';

const handleI18nRouting = createMiddleware(routing);
const baseInternal = inDevEnvironment ? "http://localhost:3000" : "https://www.jero.travel";
const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";


//helpers start

const protectedPages : string[] = ["profile"];
const protectedFromNonHost : string[] = ["add-property"];
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
        console.log(await blockAuthIngress(response, locale))
        return await blockAuthIngress(response, locale);
    }

    if(protectedFromNonHost.includes(page)){
        console.log("hit protected from non host")
        return await blockFromNonHost(response, locale);
    }

    if(page === "otp"){
        const otpReponse = await blockOtpIfNotPending(locale);
        if(otpReponse) return otpReponse;
    }

    return await refreshAccess(response,locale, page);

}


const blockAuthIngress = async (response : NextResponse, locale :string) => {
    const cookieStore = await cookies();
    const jwtValue : string | undefined = cookieStore.get("JWT")?.value;
    const rtValue : string | undefined  = cookieStore.get("RT")?.value;

    if(!jwtValue || !rtValue){
        console.log("hit")
        return response;
    }

    return NextResponse.redirect(`${baseInternal}/${locale}`);
}

const blockFromNonHost = async (response : NextResponse, locale :string) => {
    const cookieStore = await cookies();
    const jwtValue : string | undefined = cookieStore.get("JWT")?.value;
    const rtValue : string | undefined  = cookieStore.get("RT")?.value;
    console.log("jwt " + jwtValue)
    console.log("rt " + rtValue)

    if((jwtValue && rtValue) && parseJWT(jwtValue).role === "host"){
        return response;
    }

    return NextResponse.redirect(`${baseInternal}/${locale}`);
}


const blockOtpIfNotPending = async (locale : string) => {
    const cookieStore = await cookies();
    const jwtValue : string | undefined = cookieStore.get("JWT")?.value;
    if(!jwtValue) return NextResponse.redirect(`${baseInternal}/${locale}`)
    const isPending = parseJWT(jwtValue).status;
    if(isPending !== `PENDING`) return NextResponse.redirect(`${baseInternal}/${locale}`);
    return null;

}

// https://stackoverflow.com/questions/71525415/set-http-only-cookies-inside-nextjs-middleware
const refreshAccess = async (response : NextResponse, locale: string, page : string) => {

    const cookieStore = await cookies();
    const jwtValue : string | undefined = cookieStore.get("JWT")?.value;
    const rtValue : string | undefined  = cookieStore.get("RT")?.value;


    if(!rtValue && protectedPages.includes(page)){
        return NextResponse.redirect(`${baseInternal}/${locale}`);
    }


    let isInvalid : boolean = false;
    if(jwtValue){
        isInvalid = isTokenExpired(jwtValue)
    }
    if(isInvalid && rtValue){
        console.log("rt problem")
        const refreshResponse = await fetch(`${baseApi}/auth/refresh`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue}; RT=${rtValue}`
            },
            credentials : "include",
        });
    if (!refreshResponse.ok) {
        if(protectedPages.includes(page)){
            return NextResponse.redirect(`${baseInternal}/${locale}`);
        }
    }

    const cookie = refreshResponse.headers.get("set-cookie")?.split("=")[1].split(";")[0]
    console.log(cookie)
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
