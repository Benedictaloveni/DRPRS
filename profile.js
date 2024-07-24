let isOpen = false;

function toggleMenu() {
    const nav = document.querySelector('.box--subnavigasi');
    const hamburger = document.querySelector('.hamburger-menu');

    if (!isOpen) {
        nav.classList.add('show');       // Tampilkan menu dropdown
        hamburger.classList.add('active'); // Aktifkan animasi ikon hamburger
        isOpen = true;
    } else {
        nav.classList.remove('show');    // Sembunyikan menu dropdown
        hamburger.classList.remove('active'); // Nonaktifkan animasi ikon hamburger
        isOpen = false;
    }
}

// Tutup menu dropdown jika pengguna mengklik di luar menu atau ikon hamburger
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.box--subnavigasi');
    const hamburger = document.querySelector('.hamburger-menu');

    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
        nav.classList.remove('show');    // Sembunyikan menu dropdown
        hamburger.classList.remove('active'); // Nonaktifkan animasi ikon hamburger
        isOpen = false;
    }
});

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