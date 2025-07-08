import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { UserResponse } from "@/model/answer";
import { Quiz } from "@/model/questions";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 });
    }

    await connectToDB();

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    const responses = await UserResponse.find({ quizId: id });
    if (!responses || responses.length === 0) {
      return NextResponse.json({ message: "No user responses found" }, { status: 200 });
    }

    const results = responses.map((user) => {
      let correctCount = 0;

      user.answers.forEach((userAns: any) => {
        const question = quiz.questions.find((q: any) => q.question === userAns.question);
        if (question && question.answer === userAns.answer) {
          correctCount += 1;
        }
      });

      return {
        userName: user.userName,
        submittedAt: user.submittedAt,
        correctAnswers: correctCount,
        totalQuestions: user.answers.length,
        id: user._id
      };
    });

    return NextResponse.json({ results }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
