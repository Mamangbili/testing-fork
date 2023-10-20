// bagian header dll

const nutritionFullTableDOM = document.getElementById('nutrition-full-table')
const conciseTableDOM = document.getElementById("ringkasan-gizi")

// bagian notif
const notifBerhasil = document.getElementById("notif-berhasil")
const favoritYes = document.getElementById('favorit-yes')
const favoritNo = document.getElementById('favorit-no')


//awal masuk page
const mainDOM = document.getElementsByTagName('main')[0];
mainDOM.style.display = 'none';


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


function renderTableFullNutrition(tableDataWithDOM, namaMakanan) {
    for (const nutrient in tableDataWithDOM) {
        const value = tableDataWithDOM[nutrient].mutableValue
        const unit = tableDataWithDOM[nutrient].unit
        const akg = tableDataWithDOM[nutrient][nutrient.toString() + 'Akg']
        const judulDOM = document.getElementById('judul')
        judulDOM.innerHTML = namaMakanan
        tableDataWithDOM[nutrient].AKGDOM.innerHTML = (akg * 100).toFixed(2)
        tableDataWithDOM[nutrient].kandunganDOM.innerHTML = value.toFixed(2) + ' ' + unit
    }

}

function renderTableConcise(tableDataWithDOM) {
    tableDataWithDOM.Energi.conciseDOM.innerHTML = tableDataWithDOM.Energi.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Energi.unit
    tableDataWithDOM.Prot.conciseDOM.innerHTML = tableDataWithDOM.Prot.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Prot.unit
    tableDataWithDOM.Lemak.conciseDOM.innerHTML = tableDataWithDOM.Lemak.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Lemak.unit
    tableDataWithDOM.Karb.conciseDOM.innerHTML = tableDataWithDOM.Karb.mutableValue.toFixed(2) + ' ' + tableDataWithDOM.Karb.unit
}

function giziUnggulan(tableDataWithDOM) {
    const terbaik3 = []
    for (const nutrient in tableDataWithDOM) {

    }
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

function pickBestNutrion(tableDataWithDOM) {
    const entries = Object.keys(tableDataWithDOM).map(key => ({ key, value: tableDataWithDOM[key] }));
    const picked = []
    while (picked.length < 3) {
        const idx = Math.random() * entries.length
        if (picked.includes(parseInt(idx))) continue
        picked.push(parseInt(idx))
    }
    const best = picked.map(e => entries[e])
    return best

}

function renderGiziUnggulan(giziTerbaikList) {
    const rowsUnggulan = document.querySelectorAll('#unggulan > div')
    giziTerbaikList.map((gizi, index) => {
        const containerRowsHeader = rowsUnggulan[index].querySelector('div')
        const nomorUrut = containerRowsHeader.querySelectorAll('span')[0]
        const akg = containerRowsHeader.querySelectorAll('span')[1]
        const namaGizi = rowsUnggulan[index].querySelectorAll('span')[2]

        nomorUrut.innerHTML = index + 1
        akg.innerHTML = (gizi.value[gizi.key + 'Akg'] * 100).toFixed(2) + '%'
        namaGizi.innerHTML = gizi.key
    })
}

function updatePageDom(strerilDataWithDom, namaMakanan) {
    const converterInput = document.querySelector('#converter > input')
    if (!(parseInt(converterInput.value) > 0)) return

    const sajian = document.querySelector("#nutrition-full-table > div > span")
    beratMakanan = parseInt(converterInput.value)
    sajian.innerHTML = 'per ' + beratMakanan + ' gram'
    proporsiMakanan = beratMakanan / 100

    multipliedNutrient(strerilDataWithDom, proporsiMakanan)
    renderTableConcise(strerilDataWithDom)
    renderTableFullNutrition(strerilDataWithDom, namaMakanan)
}

const filterPencarian = (list, keyword) => {
    const result = list.filter((makanan) => {
        const regex = new RegExp(keyword, "i");
        if (makanan.namaMakanan.match(regex)) return true
        else false
    })
    return result
}

async function main(judul) {
    const makanan_endpoint = 'https://652526aa67cfb1e59ce6bcdb.mockapi.io/makanan'

    const { data, fail } = await fetchingData(makanan_endpoint);

    if (data) { mainDOM.style.display = 'flex' }
    else { alert("gagal memuat silahkan reload") }

    const fotoDOM = document.querySelector('#foto > img')
    const dataTampilan = filterPencarian(data, judul)[0]


    if (!dataTampilan.linkGambar) fotoDOM.src = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
    else fotoDOM.src = dataTampilan.linkGambar

    const sterilData = createNewSterilizeResponse(dataTampilan)

    //mutable sehingga bagian lain bisa akses
    const strerilDataWithDom = {
        Energi: {
            EnergiAkg: dataTampilan.EnergiAkg
            , ...sterilData.Energi
            , ...getRowFullTableDOM(".Energi > td"
                , nutritionFullTableDOM)
            , ...getRowConciseDOM('div:first-of-type > div:last-of-type', conciseTableDOM)
        },
        Lemak: {
            LemakAkg: dataTampilan.LemakAkg
            , ...sterilData.Lemak
            , ...getRowFullTableDOM(".Lemak > td", nutritionFullTableDOM)
            , ...getRowConciseDOM('div:nth-of-type(3)> div:last-of-type', conciseTableDOM)
        }
        ,
        LemakJenuh: {
            LemakJenuhAkg: dataTampilan.LemakJenuhAkg
            , ...sterilData.LemakJenuh
            , ...getRowFullTableDOM(".LemakJenuh > td", nutritionFullTableDOM)
        },
        LemaktakJenuhGanda: {

            LemaktakJenuhGandaAkg: dataTampilan.LemaktakJenuhGandaAkg
            , ...sterilData.LemaktakJenuhGanda
            , ...getRowFullTableDOM(".LemaktakJenuhGanda > td", nutritionFullTableDOM)
        },
        LemaktakJenuhTunggal: {
            LemaktakJenuhTunggalAkg: dataTampilan.LemaktakJenuhTunggalAkg
            , ...sterilData.LemaktakJenuhTunggal
            , ...getRowFullTableDOM(".LemaktakJenuhTunggal > td", nutritionFullTableDOM)
        },
        Kolesterol: {
            KolesterolAkg: dataTampilan.KolesterolAkg
            , ...sterilData.Kolesterol
            , ...getRowFullTableDOM(".Kolesterol > td", nutritionFullTableDOM)
        },
        Prot: {
            ProtAkg: dataTampilan.ProtAkg
            , ...sterilData.Protein
            , ...getRowFullTableDOM(".Protein > td", nutritionFullTableDOM)
            , ...getRowConciseDOM('div:nth-of-type(2)> div:last-of-type', conciseTableDOM)
        },
        Karb: { KarbAkg: dataTampilan.KarbAkg, ...sterilData.Karbohidrat, ...getRowFullTableDOM(".Karbohidrat > td", nutritionFullTableDOM), ...getRowConciseDOM('div:last-of-type> div:last-of-type', conciseTableDOM) },
        Serat: {
            SeratAkg: dataTampilan.SeratAkg
            , ...sterilData.Serat
            , ...getRowFullTableDOM(".Serat > td", nutritionFullTableDOM),
        },
        Gula: {
            GulaAkg: dataTampilan.GulaAkg
            , ...sterilData.Gula
            , ...getRowFullTableDOM(".Gula > td", nutritionFullTableDOM)
        },
        Sodium: {
            SodiumAkg: dataTampilan.SodiumAkg
            , ...sterilData.Sodium
            , ...getRowFullTableDOM(".Sodium > td", nutritionFullTableDOM)
        },
        Kalium: {
            KaliumAkg: dataTampilan.KaliumAkg
            , ...sterilData.Kalium
            , ...getRowFullTableDOM(".Kalium > td", nutritionFullTableDOM)
        },
    }

    const giziUnggulan = pickBestNutrion(strerilDataWithDom)

    renderTableFullNutrition(strerilDataWithDom, dataTampilan.namaMakanan)
    renderTableConcise(strerilDataWithDom)
    renderGiziUnggulan(giziUnggulan)

    // bagian konversi
    let beratMakanan = 100
    // semua gizi akan di kali dengan proporsi makanan
    let proporsiMakanan = 1
    const buttonConverter = document.querySelector('#converter > button')

    buttonConverter.addEventListener('click', () => {

        updatePageDom(strerilDataWithDom, dataTampilan.namaMakanan)
    })

    const jumlahInput = document.getElementById('jumlah-input')
    jumlahInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            updatePageDom(strerilDataWithDom, dataTampilan.namaMakanan)
        }
    })


}

const inputBtn = document.getElementById('input-btn')
const inputSearch = document.getElementById('input-search')

inputSearch.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        window.localStorage.setItem('keyword', this.value)
        window.location.href = './makanan.html'
    }
})

inputBtn.addEventListener('click', function (event) {
    window.localStorage.setItem('keyword', inputSearch.value)
    window.location.href = './makanan.html'
})


const judul = window.localStorage.getItem('keyword')
main(judul)