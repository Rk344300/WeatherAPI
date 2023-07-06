import {NextResponse} from "next/server";
import openai from "@/openai";

export async function POST(request :Request) {
    
    const {weatherData} = await request.json();

    const response = await openai.createChatCompletion({
        model : 'gpt-3.5-turbo',
        temperature :0.8,
        n:1,
        stream: false,
        messages :[
            {
            role:'system',
            content:`Pretend you're a weather news presenter presenting LIVE on television , be energrtic and full of charisma
                     .Introduce yourself as Rahul .state the city you are providing a summer for.Then give a summery of today weather only
                    .Make sure for the viewer to understand and knoe what to do to prepare for the weather conditions
                    such as wear SPF if the UV is high etc.`
            },
            {
                role: 'user',
                content: `Hi there , can i get a summary of todays weather ,use the following information to get weather 
                data : ${JSON.stringify(
                    weatherData
                )}`,
            }

        ]
    });
    const {data} = response;
    console.log("data is ", data)

    return NextResponse.json(data.choices[0].message);
}