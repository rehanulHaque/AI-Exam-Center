import { connectToDB } from "@/lib/mongodb";
import { createQuestions } from "@/lib/openai";
import { Quiz } from "@/model/questions";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        if(!body.adminName){
            return NextResponse.json({message: "Admin Name is Requires"},{status: 404})
        }
        const questions = await createQuestions(body.title)
        
        await connectToDB()
        const data = await Quiz.create({
            adminName: body.adminName,
            ...questions
        })
        const token = jwt.sign({id: data._id}, process.env.JWT_SECRET!, {expiresIn: "1d"})
        return NextResponse.json({message: "QUestion Created Sucessfully.", data: data, token},{status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}