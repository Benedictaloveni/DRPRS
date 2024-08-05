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

// Function to add a new activity
function tambahKegiatan() {
    // Get the values from the input fields
    const jenis = document.querySelector("input[name='jenis']").value;
    const hari = document.querySelector("input[name='hari']").value;
    const waktu = document.querySelector("input[name='waktu']").value;

    // Format the input values into a readable string
    const kegiatanText = `${jenis} pada ${new Date(hari).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})} pukul ${waktu}`;

    // Create a new div element for the activity
    const newActivityBox = document.createElement("div");
    newActivityBox.classList.add("activity-box");

    // Add inner HTML to the new activity box
    newActivityBox.innerHTML = `
        <p>${kegiatanText}</p>
        <button class="delete-btn" onclick="hapusKegiatan(this)">Done</button>
    `;

    // Append the new activity box to the top of the container
    const container = document.querySelector(".activities-container");
    const addButton = document.querySelector(".add-activity-btn");
    container.insertBefore(newActivityBox, container.firstChild);

    // Clear the input fields
    document.querySelector("input[name='jenis']").value = '';
    document.querySelector("input[name='hari']").value = '';
    document.querySelector("input[name='waktu']").value = '';
}

// Function to delete an activity
function hapusKegiatan(button) {
    // Remove the parent activity box
    button.parentElement.remove();
}
