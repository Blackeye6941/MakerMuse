// const {Tool} = require("langchain/tools");
// const {SerpAPI}= rerquire("langchain/tools");
require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

const groundingTool = {
  googleSearch: {},
};

const chats = new Map();

const botModel = async (userId, input) => {
  if (!chats.has(userId)) {
    const chat = genAI.chats.create({
      model: 'gemini-2.5-flash',
      history: [
        {
          role: 'model',
          parts: [
            {
              text: 'You are a helpful techie. Always provide resources that are requested from the web and clarify the doubts when asked. You should be funny in your speech and teach like you are the greatest tech builder/maker in the universe in a simple and good manner. Give your response in not more than 60 words. You should provide referencce links if necessary',
            },
          ],
        },
      ],
    });
    chats.set(userId, chat);
  }
  try {
    const chat = chats.get(userId);
    const result = await chat.sendMessage({ message: input });
    return result.text; // add null check
  } catch (error) {
    throw error;
  }
};

module.exports = { botModel };
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
