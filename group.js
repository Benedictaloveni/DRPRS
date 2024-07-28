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

function tambahKegiatan() {
    var container = document.querySelector('.activities-container');
    
    var newActivityBox = document.createElement('div');
    newActivityBox.className = 'activity-box';
    
    // Adding inner HTML for the new activity box
    newActivityBox.innerHTML = `
      <button class="delete-btn" onclick="hapusKegiatan(this)">x</button>
      <form>
        <label>Jenis kegiatan:</label>
        <input type="text" name="jenis" placeholder="Regular Meeting"><br>
        
        <label>Hari:</label>
        <input type="date" name="hari"><br>
        
        <label>Waktu:</label>
        <input type="time" name="waktu"><br>
      </form>
    `;
    
    // Inserting the new activity box before the "Tambah Kegiatan" button
    var addButton = container.querySelector('.add-activity-btn');
    container.insertBefore(newActivityBox, addButton);
}

function hapusKegiatan(button) {
    var activityBox = button.parentElement;
    activityBox.remove(); // Removes the activity box from the DOM
}

  
  