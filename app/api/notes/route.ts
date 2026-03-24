import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
    try {
        const { stockSymbol } = await req.json();

        const completion = await openai.createChatCompletion({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: `Please provide a detailed analysis for the stock: ${stockSymbol}` }],
        });

        const analysis = completion.data.choices[0].message.content;
        return NextResponse.json({ analysis });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error generating analysis' }, { status: 500 });
    }
}