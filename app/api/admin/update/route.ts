import { connectToDB } from "@/lib/mongodb";
import { Quiz } from "@/model/questions";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest,) {
    try {
        const id = await req.nextUrl.searchParams.get('id')
        await connectToDB()
        const quiz = await Quiz.findById(id)
        if(!quiz){
            return NextResponse.json({message: "Unable to fetch quiz"}, {status: 404})
        }
        const token = jwt.sign({id: quiz._id}, process.env.JWT_SECRET!, {expiresIn: "1d"})
        return NextResponse.json({quiz, token}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}