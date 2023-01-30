
import type { NextApiRequest, NextApiResponse } from "next";
import {Configuration, OpenAIApi} from "openai"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { prompt } = req.query;

    let objBody = {
        model: "text-davinci-003",
        prompt: `what ${prompt} can do`,
        max_tokens: 700,
        temperature: 0,
    }

    const configuration = new Configuration({
        organization: "org-OqbnnoEK0mlFvIDoX4FiDeNg",
        apiKey: process.env.REACT_APP_OPENAI_SECRETKEY
    })
    
    const openai = new OpenAIApi(configuration);
    const oa_res = await openai.createCompletion(objBody)

    res.status(200).json(oa_res.data.choices)
}