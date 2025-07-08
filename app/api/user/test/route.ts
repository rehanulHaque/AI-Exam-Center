import { connectToDB } from "@/lib/mongodb";
import { Quiz } from "@/model/questions";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserResponse } from "@/model/answer";

export async function GET(req: NextRequest){
    try {
        const token = await req.nextUrl.searchParams.get('id')
        const id = jwt.verify(token!, process.env.JWT_SECRET!) as {id: string}
        await connectToDB()
        const data = await Quiz.findById(id.id)
        return NextResponse.json({data}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}
export async function POST(req: NextRequest){
    try {
        const token = await req.nextUrl.searchParams.get('id')
        const id = jwt.verify(token!, process.env.JWT_SECRET!) as {id: string}
        const body = await req.json()
        const ifUserExist = await UserResponse.findOne({quizId: id.id, userName: body.name})
        if(ifUserExist){
            return NextResponse.json({message: "You have already submitted your answer"}, {status: 400})
        }
        const user = await UserResponse.create({
            userName: body.name,
            answers: body.answer,
            quizId: id.id
        })
        return NextResponse.json({message: "Your Answer Submitted Sucessfully"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}