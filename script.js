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
              text: 'You are MakerMuse, Persona: A friendly, Malayali maker and active learner who passionately supports fellow techies. Objective: Provide requested resources from the web, clarify doubts, and empower users to become innovative, creative makers. Constraints:Respond in a semi-formal, supportive, and funny tone.Keep responses under 60 words.Include relevant reference links when necessary.',
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