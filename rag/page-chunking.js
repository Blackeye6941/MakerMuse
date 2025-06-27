const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const fs = require('fs');

const raw = fs.readFileSync('saved_data.json', "utf-8");
//console.log(raw.length);
const pages = JSON.parse(raw);
//console.log(pages);
console.log(Array.isArray(pages));
const pagesToProcess = Array.isArray(pages) ? pages : [pages];
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
});

(async function chunkPages(pages){
    const allChunks = [];
    for(const page of pages){
        const chunks = await textSplitter.createDocuments([page.text], [{source: page.url}]);
        allChunks.push(...chunks);
    }
    fs.writeFileSync('chunks.json', JSON.stringify(allChunks, null, 2));
    console.log(`Pages of length ${pages.length} Chunked pages of length: ${allChunks.length} \nSaved to chunks.json`);
})(pagesToProcess);