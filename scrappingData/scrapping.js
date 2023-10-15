import * as cheerio from 'cheerio'
import axios from "axios"
import fs from "fs"

async function getCheerioRoot(link) {

    const response = await axios.get(link)
    const htmlResponse = await response.data
    const $ = cheerio.load(htmlResponse)
    return $
}

async function getFoodLink() {
    const seaFoodLink = "https://www.fatsecret.co.id/kalori-gizi/grup/ikan-seafood"
    const $ = await getCheerioRoot(seaFoodLink)
    const links = []
    $(".food_links > a").each((i, element) => {
        links.push($(element).attr('href'))
    })
    return links
}

async function scrapGiziRingkas(cheerioRootHTML) {
    const $ = cheerioRootHTML
    const namaMakanan = $("h1").text()
    const giziRingkas = { namaMakanan }
    $('td.fact').each((i, each) => {

        const title = $(each).find('.factTitle').text()
        const value = $(each).find('.factValue').text()
        giziRingkas[title] = value
    })
    return giziRingkas
}

function scrapGiziLengkap(cheerioRootHTML) {
    const $ = cheerioRootHTML
    const kotak = $('.nutrition_facts.international')
    const kanan = $(kotak).find(".nutrient.right.tRight")
    const kiri = $(kotak).find(".nutrient.left")
    const giziLengkap = {}
    $(kiri).each((i, each) => {

        let property = $(each).text()
        property = property === '' ? 'EnergiInKal' : property
        const value = $(kanan).eq(i).text()

        giziLengkap[property] = value
    })
    return giziLengkap
}

async function scrapLengkapDanRingkas(subLink) {
    const fatsecret = "https://www.fatsecret.co.id"

    const fullLink = fatsecret + subLink
    const makananHTML = await getCheerioRoot(fullLink)
    const dataRingkas = await scrapGiziRingkas(makananHTML)
    const dataLengkap = await scrapGiziLengkap(makananHTML)
    return { ...dataRingkas, ...dataLengkap }
}

const request = []
const links = await getFoodLink()
for (const link of links) {
    request.push(scrapLengkapDanRingkas(link))
}

const resolveRequest = await Promise.all(request)

console.log(resolveRequest.length)
const jsonString = JSON.stringify(resolveRequest, null, 2);

const filePath = 'scrappingData/hasilScrapMakanan.json';

fs.writeFile(filePath, jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error saving the JSON file:', err);
    } else {
        console.log('JSON file saved successfully.');
    }
});







