import { client } from "@repo/db/client";
import { env } from "@repo/env/web";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

async function validate(password: string, hash: string) : Promise<boolean>{
    return bcrypt.compare(password, hash);
}

export async function POST(req: NextRequest){
   
    const input = await req.json();
    const password = await client.db.user.findFirst({where: {email: input.email}});

    if (!password) return NextResponse.json({message: "Email or password is incorrect"}, {status: 401});
    

    if(!await validate(input.password, password.password)){
        return NextResponse.json({message: 'Email or password is incorrect'}, {status: 401});
    }
    const sessionToken = jwt.sign(
        {logged: true, role: "user"},
        env.JWT_SECRET,
        {expiresIn: '15m'}
    );
    
    //const refreshToken = `rf_${Math.random().toString(36).slice(2)}`;
    
    const response = NextResponse.json(sessionToken);
    response.cookies.set(
        'auth_token',
        sessionToken,
        {httpOnly: true, secure: true, maxAge: 7*24*60*60, path:'/'}
    );
    return response;
}

export async function DELETE(req: NextRequest){
    const response = NextResponse.json({success: true, status: 200});
    response.cookies.delete("auth_token");
    return response;
}