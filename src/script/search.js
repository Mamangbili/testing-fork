
const createdCard = ({ linkGambar, Energi, Prot, Karb, Lemak, namaMakanan }) => {
  if (!linkGambar) linkGambar = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
  const cardTemplate = `
  <a href="./detail-makanan.html">
  <div class=" max-w-sm ">
    <div
      class="flex p-2 h-full border-abu-tipis border-2 shadow-md sm:max-w-md">
      <!-- gambar -->
      <img
        src="${linkGambar}"
        class="object-contain w-24 h-24" />
      <!-- right side -->
      <div class="flex flex-col w-full h-full justify-center gap-3 p-2">
        <h2 class="text-center judul">${namaMakanan}</h2>
        <!-- info singkat -->
        <div class="flex justify-between">
          <!-- Energi -->
          <div
            class="border-abu-tipis border-[1px] shadow-sm rounded-md">
            <div class="bg-green-600 px-2 py-1 rounded-sm">Energi</div>
            <p class="text-center">${Energi}</p>
          </div>

          <!-- Prot -->
          <div
            class="border-abu-tipis border-[1px] shadow-sm rounded-md">
            <div class="bg-amber-300 px-2 py-1 rounded-sm">prot</div>
            <p class="text-center">${Prot}</p>
          </div>

          <!-- lemak -->
          <div
            class="border-abu-tipis border-[1px] shadow-sm rounded-md">
            <div class="bg-red-500 px-2 py-1 rounded-sm">lemak</div>
            <p class="text-center">${Lemak}</p>
          </div>

          <!-- Karb -->
          <div
            class="border-abu-tipis border-[1px] shadow-sm rounded-md">
            <div class="bg-[#7FFF00] px-2 py-1 rounded-sm">Karbo</div>
            <p class="text-center">${Karb}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </a>`
  return cardTemplate
}

const renderCard = (card) => {
  const container = document.getElementById('list-makanan')
  container.innerHTML += card
}

const fetchMakanan = async (end_point) => {
  try {
    const response = await fetch(end_point)
    const data = await response.json()
    return { data, fail: null }
  } catch {
    return { data: null, fail: true }
  }
}

const filterPencarian = (list, keyword) => {
  const result = list.filter((makanan) => {
    const regex = new RegExp(keyword, "i");
    if (makanan.namaMakanan.match(regex)) return true
    else false
  })
  return result
}

function resetMakanan() {
  const container = document.getElementById('list-makanan')
  container.innerHTML = ''

}

const makanan_endpoint = 'https://652526aa67cfb1e59ce6bcdb.mockapi.io/makanan'

async function main(keyword) {
  resetMakanan()
  const { data, fail } = await fetchMakanan(makanan_endpoint)
  if (!data) alert('gagal memuat silahkan reload ')

  let filterResult = filterPencarian(data, keyword)
  if (!filterResult) alert('data tidak ditemukan')

  filterResult.map(makanan => {
    const card = createdCard(makanan)
    renderCard(card)
  })
  const hasilPencarian = document.getElementById('total-pencarian')
  hasilPencarian.innerHTML = '(' + filterResult.length + ')'

  const links = document.querySelectorAll('#list-makanan>a')
  console.log(links)



  function onHover(element) {
    element.addEventListener('mouseenter', function () {
      const judul = this.querySelector('h2.judul')
      window.localStorage.setItem('keyword', judul.innerHTML)
    });
  }


  links.forEach(link => onHover(link))

}

let judul = window.localStorage.getItem('keyword')
if(!judul) judul = ''
main(judul)

const inputSearch = document.getElementById('input-search')
const btnSearch = document.querySelector('button')

btnSearch.addEventListener('click', () => {
  const keyword = inputSearch.value
  main(keyword)
})

inputSearch.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    main(this.value)
  }
})




