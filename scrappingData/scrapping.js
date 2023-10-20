import * as cheerio from 'cheerio'
import axios from "axios"
import fs from "fs"
import { stringify } from 'querystring'

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

function scrapGiziRingkas(cheerioRootHTML) {
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
    let giziAkgMaxRandom = 0.40
    $(kiri).each((i, each) => {
        
        const akgYgDipilih = (Math.random() * giziAkgMaxRandom) - (Math.random() * giziAkgMaxRandom)*0.3 
        giziAkgMaxRandom -= akgYgDipilih
        console.log(giziAkgMaxRandom)
        let property = $(each).text()
        property = property === '' ? 'EnergiInKal' : property
        property = property.replace(/ /g,'')
        const value = $(kanan).eq(i).text()
        giziLengkap[property.toString()+'Akg'] = akgYgDipilih
        giziLengkap[property] = value
    })
    return giziLengkap
}

function scrapGambar(cheerioRootHTML){
    const $ = cheerioRootHTML
    let gambarLink = $('.factPanel table.generic td > a > img')
    if (gambarLink.length <= 0) return ''
    
    gambarLink = gambarLink.eq(0).attr('src')
    const pattern = '_sq.jpg'
    gambarLink = gambarLink.replace(pattern,".jpg")
    return gambarLink
}

async function scrapLengkapDanRingkas(index,subLink) {
    const fatsecret = "https://www.fatsecret.co.id"

    const fullLink = fatsecret + subLink
    const makananHTML = await getCheerioRoot(fullLink)
    const dataRingkas = scrapGiziRingkas(makananHTML)
    const dataLengkap = scrapGiziLengkap(makananHTML)
    const linkGambar = scrapGambar(makananHTML)
    
    return { "id":String(index), linkGambar,...dataRingkas, ...dataLengkap }
}

const request = []
const links = await getFoodLink()
for (const [index,link] of links.entries()) {
    request.push(scrapLengkapDanRingkas(index,link))
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







