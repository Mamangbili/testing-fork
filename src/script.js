$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: [
      "Berat Badan Ideal",
      "Keseimbangan Energi",
      "Hidup Sehat",
      "Makanan Bernutrisi",
      "Pola Hidup Sehat",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Berat Badan Ideal",
      "Keseimbangan Energi",
      "Hidup Sehat",
      "Makanan Bernutrisi",
      "Pola Hidup Sehat",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  // owl carousel script
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
});

function handleGetFormData() {
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const zipCode = document.getElementById("zip-code").value;
  const status = document.getElementById("status").checked;

  return {
    name,
    city,
    email,
    zipCode,
    status,
  };
}

// Langkah 7
function isNumber(str) {
  return !isNaN(str);
}

// Langkah 8
function checkboxIsChecked() {
  return document.getElementById("status").checked;
}

// Langkah 9
function validateFormData(formData) {
  return (
    formData !== null &&
    formData.name !== "" &&
    formData.city !== "" &&
    formData.email !== "" &&
    !isNaN(formData.zipCode) &&
    formData.status
  );
}

// Langkah 10
function submit(event) {
  event.preventDefault(); // Mencegah refresh halaman

  const formData = handleGetFormData();
  const warningDiv = document.getElementById("warning");

  if (validateFormData(formData)) {
    warningDiv.textContent = ""; // Menghapus pesan peringatan jika valid
    // Lakukan sesuatu dengan data yang dikirim, misalnya mengirim ke server
  } else {
    warningDiv.textContent = "Periksa form anda sekali lagi";
  }
}

window.localStorage.setItem('keyword', '')
const form = document.getElementById("kesehatan-form");
form.addEventListener("submit", submit);
