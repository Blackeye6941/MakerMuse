const fs = require('fs');
const {Pinecone} = require('@pinecone-database/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });


async function Embedding() {
    const chunks = JSON.parse(fs.readFileSync("chunks.json", 'utf-8'));
    const fixedChunks = chunks.map(chunk => ({
        id:chunk.metadata.source,
        metadata:{
            pageContent:chunk.pageContent
        }
    }));
    //console.log(JSON.stringify(fixedChunks));
    // const document = chunks.map((chunk) => {
    //     new Document({
    //         pageContent: chunk.pageContent,
    //         metadata: chunk.metadata
    //     })
    // });
    console.log("Document created");
    const embeddingsGenerator = new GoogleGenerativeAIEmbeddings({
        modelName: 'embedding-001',
        apiKey:process.env.GENAI_API_KEY
    });
const embeddedChunks = [];
let id=1
    for (const chunk of chunks) {
        const embedding = await embeddingsGenerator.embedQuery(chunk.pageContent);
        embeddedChunks.push({
            id: `${id}`, 
            values: embedding,
            metadata: {
                pageContent: chunk.pageContent,
            }
        });
        console.log(`Chunk with ID ${`${id}`} embedded`);
        id++;
    }
    console.log("Embedding completed");
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY
    });
    // pc.deleteIndex("tinkerhub");
    // await pc.createIndex({
    //     name: "tinkerhub-data",
    //     dimension: 768,
    //     metric: 'cosine',
    //     spec:{
    //         serverless:{
    //             cloud: 'aws',
    //             region:'us-east-1',
    //         }
    //     }
    // });
    const indexes = await pc.describeIndex("tinkerhub-data");
    console.log(JSON.stringify(indexes));
    console.log("Index created");
    const index = pc.index("tinkerhub-data");
    console.log("Upserting!!");
    await index.upsert(embeddedChunks);
}

Embedding().catch(console.error);