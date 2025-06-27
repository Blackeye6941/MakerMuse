const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const {URL} = require("url");
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

const base_URL = process.env.WEB_URL;
const visited = new Set();
async function scrapePage(url) {
    console.log("Scraping!!");
    const browser = await puppeteer.launch({headless : true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil : "networkidle2", timeout: 0});
    const html = await page.content();
    const $ = cheerio.load(html);
    $("script, style").remove(); // Remove scripts and styles
    const text = $("body").text().replace(/\s+/g, "").trim();
    await browser.close();
    return {text, html};
}

async function extractLinks(html , currentUrl) {
    const $ = cheerio.load(html);
    const links = new Set();
    $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if(href.startsWith("http") || href.startsWith("/")){
            try {
                const absoluteURL = new URL(href, currentUrl).toString();
                if(absoluteURL.startsWith(base_URL)){
                    links.add(absoluteURL.split("#")[0]);
                }
            } catch (error) {
                console.log(error);
            }
        }
    })
    return Array.from(links);
}

async function crawlSite(url, depth=6){
    if(depth === 0 || visited.has(url)) {
        console.log("Depth limit reached or already visited:", url);
        return [];
    }
    visited.add(url);
    console.log("Visited:", url);
    console.log("Crawling url");
    let result = [];
    try {
        const {text, html} = await scrapePage(url);
        result.push({url, text});
        const links = await extractLinks(html, url);
        //console.log("Following ->:", links);
        for(const link of links){
            //console.log(link);
            const subpages = await crawlSite(link, depth-1);
            result = result.concat(subpages);
        }
    } catch (error) {
        console.log("Error Scraping!!");
    }
    return result;
}

module.exports = { crawlSite }