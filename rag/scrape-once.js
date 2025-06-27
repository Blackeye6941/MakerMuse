const {crawlSite} = require('./crawler')
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '..', '.env');

dotenv.config({ path: envPath });

(async () => {
    const domain_URL = process.env.WEB_URL;
    console.log(`Starting to scrape: ${domain_URL}`);
    const pages = await crawlSite(domain_URL);
    fs.writeFileSync("saved_data.json", JSON.stringify(pages, null, 2));
    console.log(`Scraped pages of length: ${pages.length} \nSaved to saved_data.json`);
})();