import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const upstream = await fetch(
            "http://egyptvoyage.runasp.net/api/Auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const text = await upstream.text();

        return new NextResponse(text, {
            status: upstream.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("🔥 PROXY ERROR:", error);
        return NextResponse.json(
            { message: error.message || "Proxy failed" },
            { status: 500 }
        );
    }
}
