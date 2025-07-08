// @typescript-eslint/no-explicit-any

import { SYSTEM_PROMPT } from '@/prompt';
import {OpenAI} from 'openai';

const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function createQuestions(title: string){
    try {
        const response = await ai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: title
                }
            ]
        })
        return JSON.parse(response.choices[0].message.content!)
    } catch (error: any) {
        throw new Error(error.response.data.error.message)
    }
}