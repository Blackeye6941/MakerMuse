// const {Tool} = require("langchain/tools");
// const {SerpAPI}= rerquire("langchain/tools");
import * as dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

const groundingTool = {
  googleSearch: {},
};

const chats = new Map();

export const botModel = async (userId, input) => {
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