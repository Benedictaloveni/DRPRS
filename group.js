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

document.addEventListener('DOMContentLoaded', function() {
    const addActivityBtn = document.querySelector('.add-activity-btn');

    addActivityBtn.addEventListener('click', function() {
        const jenisInput = document.querySelector('input[name="jenis"]');
        const hariInput = document.querySelector('input[name="hari"]');
        const waktuInput = document.querySelector('input[name="waktu"]');

        const jenis = jenisInput.value.trim();
        const hari = hariInput.value;
        const waktu = waktuInput.value;

        if (jenis && hari && waktu) {
            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jenis,
                    hari,
                    waktu
                })
            })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Optional: handle the response
                // Reset form
                jenisInput.value = '';
                hariInput.value = '';
                waktuInput.value = '';
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Semua field harus diisi!');
        }
    });
});