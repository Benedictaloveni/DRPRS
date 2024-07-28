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

// Function to add a new information box
function tambahInformasi() {
    var container = document.getElementById('info-container');
    
    var newInfoBox = document.createElement('div');
    newInfoBox.className = 'info-box';
    
    newInfoBox.innerHTML = `
      <button class="delete-btn" onclick="hapusInformasi(this)">x</button>
      <div class="info-image">
        <img src="placeholder.jpg" alt="Photo">
        <input type="file" accept="image/*" onchange="previewImage(this)">
      </div>
      <div class="info-content">
        <label>Jenis Pekerjaan:</label>
        <input type="text" name="job_type">
        
        <label>Pengunggah:</label>
        <input type="text"  name="uploader">
        
        <label>Deskripsi:</label>
        <textarea name="description" ></textarea>
        
        <label>Link URL:</label>
        <input type="text" name="link">
      </div>
    `;
    
    container.appendChild(newInfoBox);
}

// Function to remove an information box
function hapusInformasi(button) {
    var infoBox = button.parentElement;
    infoBox.remove();
}

// Function to preview uploaded image
function previewImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            input.previousElementSibling.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
