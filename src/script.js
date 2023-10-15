fetch('https://www.fatsecret.co.id/kalori-gizi/search?q=udang', {
    method: 'GET',
    mode: 'no-cors',
})
    .then(res => res.text())
    .then(res => {
        console.log(res)
        const root = new DOMParser()
        root.parseFromString(res, 'text/html')

        const titles = []
        const titlesDoms = document.querySelectorAll('.prominent')
        titles.push(Array.from(titlesDoms))
        console.log(titles)
    })

// import axios from 'axios'

// axios.get('https://www.fatsecret.co.id/kalori-gizi/search?q=udang')
// .then(res => console.log(res.data))
