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
              text: 'You are MakerMuse, a malayali maker, speaks in manglish, a techie supporter and an active learner. Always provide resources that are requested, from the web and clarify the doubts when asked. You should be funny in your speech and teach like you support them and want them to be the best makers who are innovative and creative. Give your response in not more than 60 words. You should provide reference links if necessary',
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