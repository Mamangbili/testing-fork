// bagian header dll
const closeHambugerIcon = document.querySelector('#hamburger-menu i');
const menuHamburger = document.getElementById("hamburger-menu");
const hamburgerMenuIcon = document.querySelector("nav div img")
const nutritionFullTableDOM = document.getElementById('nutrition-full-table')
const conciseTableDOM = document.getElementById("ringkasan-gizi")

// bagian notif
const notifBerhasil = document.getElementById("notif-berhasil")
const favoritYes = document.getElementById('favorit-yes')
const favoritNo = document.getElementById('favorit-no')


//awal masuk page
const mainDOM = document.getElementsByTagName('main')[0];
mainDOM.style.display = 'none';


// bagian animasi  
hamburgerMenuIcon.addEventListener('click', () => {
    menuHamburger.style.left = '0%';
}
)
closeHambugerIcon.addEventListener('click', () => {
    menuHamburger.style.left = '-100%';
})

favoritYes.addEventListener('click', function () {
    notifBerhasil.innerHTML = "Favorit berhasil dihapus"
    notifBerhasil.style.opacity = '1'
    this.classList.add('hidden')
    favoritNo.classList.remove('hidden')
    setTimeout(() => {
        notifBerhasil.style.opacity = '0'

    }, 2500);
})


favoritNo.addEventListener('click', function () {
    notifBerhasil.innerHTML = "Berhasil ditambahkan ke favorit"
    notifBerhasil.style.opacity = '1'
    this.classList.add('hidden')
    favoritYes.classList.remove('hidden')
    setTimeout(() => {
        notifBerhasil.style.opacity = '0'

    }, 2500);
})


const stringHasANumber = str => /\d/.test(str)

//membuat objek baru dengan unit dan value yg sudah di split
function createNewSterilizeResponse(obj) {
    const dataBaru = {}
    for (const property in obj) {
        if (property === 'id') dataBaru['id']

        if (stringHasANumber(obj[property])) {
            dataBaru[property] = splitValueAndUnit(obj[property])
        }
        else {
            dataBaru[property] = obj[property]
        }
    }
    return dataBaru
}

function splitValueAndUnit(input) {
    input = String(input);
    const regex = /^([\d.,]+)\s*([a-zA-Z%]*)$/;
    const match = input.match(regex);

    if (match) {
        const value = parseFloat(match[1].replace(',', '.'));
        const unit = match[2].trim();
        return { value, unit, mutableValue: value };
    } else {
        return { value: parseFloat(input), unit: "", mutableValue: 0 };
    }
}

function getRowFullTableDOM(selectorRow, container) {
    const RowDOM = container.querySelectorAll(selectorRow)
    const kandunganDOM = RowDOM[1]
    const AKGDOM = RowDOM[2]
    return { kandunganDOM, AKGDOM }
}

function getRowConciseDOM(selectorRow, container) {
    const value = container.querySelector(selectorRow)
    return { conciseDOM: value }
}


function renderTableFullNutrition(tableDataWithDOM) {
    for (const nutrient in tableDataWithDOM) {
        const value = tableDataWithDOM[nutrient].mutableValue
        const unit = tableDataWithDOM[nutrient].unit
        tableDataWithDOM[nutrient].kandunganDOM.innerHTML = value.toFixed(2) + ' ' + unit
    }

}

function renderTableConcise(tableDataWithDOM) {
    tableDataWithDOM.Energi.conciseDOM.innerHTML = tableDataWithDOM.Energi.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Energi.unit
    tableDataWithDOM.Prot.conciseDOM.innerHTML = tableDataWithDOM.Prot.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Prot.unit
    tableDataWithDOM.Lemak.conciseDOM.innerHTML = tableDataWithDOM.Lemak.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Lemak.unit
    tableDataWithDOM.Karb.conciseDOM.innerHTML = tableDataWithDOM.Karb.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Karb.unit
}




const multipliedNutrient = (dataNutrientOBJ, multiplier) => {
    for (const nutrient in dataNutrientOBJ) {
        dataNutrientOBJ[nutrient].mutableValue = dataNutrientOBJ[nutrient].value * multiplier
    }
}


const fetchingData = async (end_point) => {
    try {
        const response = await fetch(end_point)
        const data = await response.json()
        return { data: data, fail: null }
    } catch {
        return { data: null, fail: true }
    }
}




async function main() {
    const makanan_endpoint = 'https://652526aa67cfb1e59ce6bcdb.mockapi.io/makanan'

    const { data, fail } = await fetchingData(makanan_endpoint);

    if (data) { mainDOM.style.display = 'flex'; console.log('berhasil memuat') }
    else { console.log('gagal memuat') }
    const fotoDOM = document.querySelector('#foto > img')
    const contohData = data[0]
    
    fotoDOM.src = contohData.linkGambar
    const sterilData = createNewSterilizeResponse(contohData)

    console.log(sterilData)
    //mutable sehingga bagian lain bisa akses
    const strerilDataWithDom = {
        Energi: { ...sterilData.Energi, ...getRowFullTableDOM(".Energi > td", nutritionFullTableDOM), ...getRowConciseDOM('div:first-of-type > div:last-of-type', conciseTableDOM) },
        Lemak: { ...sterilData.Lemak, ...getRowFullTableDOM(".Lemak > td", nutritionFullTableDOM), ...getRowConciseDOM('div:nth-of-type(3)> div:last-of-type', conciseTableDOM) },
        LemakJenuh: { ...sterilData.LemakJenuh, ...getRowFullTableDOM(".LemakJenuh > td", nutritionFullTableDOM) },
        LemaktakJenuhGanda: { ...sterilData.LemaktakJenuhGanda, ...getRowFullTableDOM(".LemaktakJenuhGanda > td", nutritionFullTableDOM) },
        LemaktakJenuhTunggal: { ...sterilData.LemaktakJenuhTunggal, ...getRowFullTableDOM(".LemaktakJenuhTunggal > td", nutritionFullTableDOM) },
        Kolesterol: { ...sterilData.Kolesterol, ...getRowFullTableDOM(".Kolesterol > td", nutritionFullTableDOM) },
        Prot: { ...sterilData.Protein, ...getRowFullTableDOM(".Protein > td", nutritionFullTableDOM), ...getRowConciseDOM('div:nth-of-type(2)> div:last-of-type', conciseTableDOM) },
        Karb: { ...sterilData.Karbohidrat, ...getRowFullTableDOM(".Karbohidrat > td", nutritionFullTableDOM), ...getRowConciseDOM('div:last-of-type> div:last-of-type', conciseTableDOM) },
        Serat: { ...sterilData.Serat, ...getRowFullTableDOM(".Serat > td", nutritionFullTableDOM), },
        Gula: { ...sterilData.Gula, ...getRowFullTableDOM(".Gula > td", nutritionFullTableDOM) },
        Sodium: { ...sterilData.Sodium, ...getRowFullTableDOM(".Sodium > td", nutritionFullTableDOM) },
        Kalium: { ...sterilData.Kalium, ...getRowFullTableDOM(".Kalium > td", nutritionFullTableDOM) },
    }

    renderTableFullNutrition(strerilDataWithDom)
    renderTableConcise(strerilDataWithDom)
    

    // bagian konversi
    let beratMakanan = 100
    // semua gizi akan di kali dengan proporsi makanan
    let proporsiMakanan = 1
    const buttonConverter = document.querySelector('#converter > button')

    buttonConverter.addEventListener('click', () => {
        const converterInput = document.querySelector('#converter > input')
        if (!(parseInt(converterInput.value) > 0)) return

        const sajian = document.querySelector("#nutrition-full-table > div > span")
        beratMakanan = parseInt(converterInput.value)
        sajian.innerHTML = 'per ' + beratMakanan + ' gram'
        proporsiMakanan = beratMakanan / 100

        multipliedNutrient(strerilDataWithDom, proporsiMakanan)
        renderTableConcise(strerilDataWithDom)
        renderTableFullNutrition(strerilDataWithDom)
        console.log(strerilDataWithDom)


    })

}
main()