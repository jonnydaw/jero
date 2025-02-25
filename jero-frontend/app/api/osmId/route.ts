

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const [, locale, page, ..._] = request.nextUrl.pathname.split('/');
        const params = request.nextUrl.searchParams;
        const query = params.get("osm_id");
        console.log("Query" + query)

        const response = await fetch(`https://nominatim.openstreetmap.org/lookup?osm_ids=${query}&format=json&extratags=1`, {
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
