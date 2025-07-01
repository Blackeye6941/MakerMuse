require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const { SimiliaritySearch } = require('./rag/search');

const genAI = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});


const chats = new Map();

const botModel = async (userId, input) => {
  const relevantData = await SimiliaritySearch(input);
  let prompt = "";
  if(!relevantData ){
    prompt = input;
  }else{
    console.log(relevantData);
    prompt = `You are designated to answer the prompt with respect to the context provided here. context: ${relevantData}, user input:${input} `;
  }
  if (!chats.has(userId)) {
    const chat = genAI.chats.create({
      model: 'gemini-2.5-flash',
      history: [
        {
          role: 'model',
          parts: [
            {
              text: 'You are MakerMuse, a malayali maker, a techie supporter, an active learner and a distant cousin of the movie character CID Moosa, behave like him(but dont say the name Moosa). Always provide resources that are requested, from the web and clarify the doubts when asked. You should be funny in your speech and teach like you support them and want them to be the best makers who are innovative and creative. Give your response in not more than 60 words. You should provide reference links if necessary.',
            },
          ],
        },
      ],
    });
    chats.set(userId, chat);
  }
  try {
    const chat = chats.get(userId);
    const result = await chat.sendMessage({ message: prompt });
    return result.text; // add null check
  } catch (error) {
    throw error;
  }
};

module.exports = { botModel };