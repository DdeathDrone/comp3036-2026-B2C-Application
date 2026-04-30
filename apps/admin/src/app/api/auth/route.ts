import bcrypt from "bcrypt";
import { env } from "@repo/env/admin";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const adminPass = await bcrypt.hash(env.PASSWORD, 10)
//const refreshTokens: Map<string, number> = new Map();

export async function validate(password: string) : Promise<boolean>{
    return bcrypt.compare(password, adminPass);
}

export async function POST(req: NextRequest){
    //const password  = (await req.formData()).get("password") as string;
    const password = await req.json();

    if(!await validate(password)){
        return NextResponse.json({message: 'Password is incorrect'}, {status: 401});
    }
    const sessionToken = jwt.sign(
        {logged: true, role: "admin"},
        env.JWT_SECRET,
        {expiresIn: '15m'}
    );
    
    //const refreshToken = `rf_${Math.random().toString(36).slice(2)}`;
    
    //const response = NextResponse.redirect('http:localhost:3002/');
    const response = NextResponse.json(sessionToken);
    /*response.cookies.set(
        'auth_token',
        sessionToken,
        {httpOnly: true, secure: true, maxAge: 7*24*60*60, path:'/'}
    );*/
    return response;
}