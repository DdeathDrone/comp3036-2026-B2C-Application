import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith(`/api/products`)){
        const token = request.cookies.get("auth_token");
        if(!token) return NextResponse.json({message: "Unauthorised Access"},{status:401});
    }
    return;
}