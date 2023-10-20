const closeHambugerIcon = document.querySelector('#hamburger-menu i');
const menuHamburger = document.getElementById("hamburger-menu");
const hamburgerMenuIcon = document.querySelector("nav div img")

// bagian animasi  
hamburgerMenuIcon.addEventListener('click', () => {
    menuHamburger.style.left = '0%';
    
}
)
closeHambugerIcon.addEventListener('click', () => {
    menuHamburger.style.left = '-100%';
})