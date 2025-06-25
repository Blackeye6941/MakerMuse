// const {Tool} = require("langchain/tools");
// const {SerpAPI}= rerquire("langchain/tools");
import * as dotenv from "dotenv"
dotenv.config();

import { GoogleGenAI,  DynamicRetrievalConfigMode } from "@google/genai";

const genAI = new GoogleGenAI({
    apiKey: process.env.GENAI_API_KEY,
});

const groundingTool = {
    googleSearch: {},
}

const chats = new Map();

const testRun = async (userId, input) => {
    if(!chats.has(userId)){
        const chat = genAI.chats.create({
            model: "gemini-2.5-flash",
            history: [{
                role: "model",
                parts: [{
                    text: "You are a helpful techie. Always provide resources that are requested from the web and clarify the doubts when asked. You should be funny in your speech and teach like you are the greatest tech builder/maker in the universe in a simple and good manner."
                }]
            }]
        });
        chats.set(userId, chat);
        console.log(chat);
    }try {
        const chat = chats.get(userId);
        const result = await chat.sendMessage([{text:input}]);
        const reply = await result.response.text();
        return reply;
        
    } catch (error) {
        throw error;
    }
}
const text = testRun(4, "what is react");
console.log(text);
    //Code for citation Link(to Be implemented as a seperate function)
    // console.log(res.candidates[0].groundingMetadata);

    // let text = res.text;
    // const supports = res.candidates[0].groundingMetadata.groundingSupports;
    // const chunks = res.candidates[0].groundingMetadata.groundingChunks;

    // const sortedSupports = [...supports].sort(
    //     (a, b) => {
    //         (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0)
    //     }
    // );
    // for(const support of sortedSupports){
    //     const endIndex = support.segment?.endIndex;
    //     if(endIndex == undefined || !support.groundingChunksIndices?.length){
    //         continue;
    //     }
    //     const links = support.groundingChunksIndices.map(i => {
    //         const uri = chunks[i].web?.uri;
    //         console.log(uri);
    //         if(uri){
    //             return `${i+1} ${uri}`;
    //         }else{
    //             return null
    //         }
    //     })
    //     if(links.length > 0){
    //         const link = links.join(', ');
    //         text = text.slice(0, endIndex) + link + text.slice(endIndex);
    //     }
    // }

