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
        {logged: true, role: "user", username: password.username, userid: password.userId},
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

export async function PUT(req: NextRequest){
    const {username, email, password} = await req.json();
    const hash = await bcrypt.hash(password, 10);

    const result = await client.db.user.create({
        data: {
            username: username,
            email: email,
            password: hash,
            role: "user",
        }
    })
    const res = NextResponse.json({message: result, status: 200});
    return res;
}

/*export async function PATCH(req: NextRequest){
    const {email, password} = await req.json();
    const hash = await bcrypt.hash(password, 10);

    const result = client.db.user.update({
        where:{ email: email},
        data:{
            password: hash,
        }
    })
    const res = NextResponse.json({message: result, status: 200})
    return res;
}*/