import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
// // https://next-intl-docs.vercel.app/docs/routing/middleware

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

const protectedEndpoints = ["profile"];


export default async function middleware(request: NextRequest) {

    const response = handleI18nRouting(request);
    const [, locale, page, ..._] = request.nextUrl.pathname.split('/');

    return await refreshAccess(response,locale, page);

}
// https://stackoverflow.com/questions/71525415/set-http-only-cookies-inside-nextjs-middleware
const refreshAccess = async (response : NextResponse, locale: string, page : string) => {

    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const rtValue = cookieStore.get("RT")?.value;

    if(!rtValue && protectedEndpoints.includes(page)){
        return NextResponse.redirect(`http://localhost:3000/${locale}`);
    }

    // https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library
    function isTokenExpired(jwtValue : string) {
        const expiry = (JSON.parse(atob(jwtValue.split('.')[1]))).exp;
        return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }

    let isInvalid;
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
        if(protectedEndpoints.includes(page)){
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
