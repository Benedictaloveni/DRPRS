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
