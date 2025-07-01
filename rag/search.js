const {Pinecone} = require('@pinecone-database/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

const embeddingsGenerator = new GoogleGenerativeAIEmbeddings({
    modelName: 'embedding-001',
        apiKey:process.env.GENAI_API_KEY
})