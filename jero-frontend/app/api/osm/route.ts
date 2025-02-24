
// https://github.com/baudom/easytank/blob/develop/src/

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;
        const query = params.get("q");
        console.log("Query" + query)

        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`, {
            next: {
                revalidate: 60 * 60 * 24 * 2,
            },
        });

        return Response.json(await response.json(), { status: 200 });

    } catch (e: any) {
        console.error("Error fetching location data:", e?.message || JSON.stringify(e));
        return Response.json(e);
    }
}
