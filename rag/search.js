const {Pinecone} = require('@pinecone-database/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

const embeddingsGenerator = new GoogleGenerativeAIEmbeddings({
    modelName: 'embedding-001',
    apiKey:process.env.GENAI_API_KEY
});

async function SimiliaritySearch(prompt){
    const queryEmbedding = await embeddingsGenerator.embedQuery(prompt);
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY
    });
    const indexName = "tinkerhub-data";
    const index = pc.index(indexName)
    console.log("performing similiarity search :");
    const queryResult = await index.query({
        topK: 1,
        vector: queryEmbedding,
        includeMetadata: true
    });
    if(queryResult.matches && queryResult.matches.length > 0){
        const mostRel = queryResult.matches[0];
        if(mostRel.score > 0.7){
            return mostRel.metadata;
        }
    }
    return null;
}

module.exports = {SimiliaritySearch};