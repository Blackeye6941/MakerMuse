const fs = require('fs');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { Document } = require('langchain/document');
const { Chroma } = require('@langchain/community/vectorstores/chroma');

const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });


(async function main(){
    const raw = fs.readFileSync("chunks.json", "utf-8");
    const chunks = JSON.parse(raw);
    const documents = chunks.map(chunk => ( 
        new Document({
            pageContent: chunk.pageContent,
            metadata: chunk.metadata
        })
    )); 

    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GENAI_API_KEY,
        modelName: 'embedding-001'
    });
    const persistDirectory = "./chroma-db";

    // Ensure the persistence directory exists
if (!fs.existsSync(persistDirectory)) {
    fs.mkdirSync(persistDirectory, { recursive: true });
    console.log(`Created persistence directory: ${persistDirectory}`);
} else {
    console.log(`Using existing persistence directory: ${persistDirectory}`);
}

    const vectorStore = await Chroma.fromDocuments(documents,
        embeddings,
        {
            collectionName: "tinkerhub knowledge",
            persistDirectory,
            persist: true
        }
    );
    console.log("Embedded and saved using google");
})();
