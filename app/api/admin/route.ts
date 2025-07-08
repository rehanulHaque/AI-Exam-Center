import { connectToDB } from "@/lib/mongodb";
import { Quiz } from "@/model/questions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const query = await req.nextUrl.searchParams.get('adminName')
        await connectToDB()
        const data = await Quiz.find({adminName: query})
        return NextResponse.json({message: 'Done', data}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}