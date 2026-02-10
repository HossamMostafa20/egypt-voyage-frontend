// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     const body = await req.json();

//     const res = await fetch(
//         process.env.API_URL + "/api/Auth/register",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//             },
//             body: JSON.stringify(body),
//         }
//     );

//     // لو مفيش body
//     const text = await res.text();

//     if (!res.ok) {
//         return NextResponse.json(
//             { message: text || "Register failed" },
//             { status: res.status }
//         );
//     }

//     // لو body فاضي
//     if (!text) {
//         return NextResponse.json(
//             { message: "Registered successfully" },
//             { status: 200 }
//         );
//     }

//     // لو body JSON
//     let data;
//     try {
//         data = JSON.parse(text);
//     } catch {
//         return NextResponse.json(
//             { message: text },
//             { status: 200 }
//         );
//     }

//     const response = NextResponse.json({
//         id: data.id,
//         name: data.name,
//         email: data.email,
//     });

//     if (data.token) {
//         response.cookies.set("token", data.token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "strict",
//             path: "/",
//         });
//     }

//     return response;
// }
