// Toggle menu
let isOpen = false;

function toggleMenu() {
    const nav = document.querySelector('.box--subnavigasi');
    const hamburger = document.querySelector('.hamburger-menu');

    nav.classList.toggle('show');       // Toggle menu dropdown
    hamburger.classList.toggle('active'); // Toggle animasi ikon hamburger
    isOpen = !isOpen;
}

// Menutup menu dropdown jika pengguna mengklik di luar menu atau ikon hamburger
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.box--subnavigasi');
    const hamburger = document.querySelector('.hamburger-menu');

    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
        nav.classList.remove('show');    // Sembunyikan menu dropdown
        hamburger.classList.remove('active'); // Nonaktifkan animasi ikon hamburger
        isOpen = false;
    } 
});

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.news-slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.news-slider').style.transform = `translateX(${offset}%)`;
}

function nextNews() {
    showSlide(currentSlide + 1);
}

function prevNews() {
    showSlide(currentSlide - 1);
}

// Initialize the slider
showSlide(currentSlide);

// Function to start the automatic slideshow
function startAutoSlide() {
    setInterval(() => {
        nextNews();
    }, 5000); // Change slide every 5 seconds
}

// Start the automatic slideshow
startAutoSlide();

function toggleDropdown(event, dropdownId) {
    event.preventDefault();
    var dropdown = document.getElementById(dropdownId);
    var arrow = event.currentTarget.querySelector('.arrow');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)'; // Reset arrow direction
    } else {
        dropdown.style.display = 'block';
        arrow.style.transform = 'rotate(-270deg)'; // Rotate arrow to the left
    }
}

function toggleDropdown(event, dropdownId) {
    event.preventDefault();
    var dropdown = document.getElementById(dropdownId);
    var arrow = event.currentTarget.querySelector('.arrow');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)'; // Reset arrow direction
    } else {
        dropdown.style.display = 'block';
        arrow.style.transform = 'rotate(-270deg)'; // Rotate arrow to the left
    }
}