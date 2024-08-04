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
    const activitiesContainer = document.querySelector('.activities-container');
    const addActivityBtn = document.querySelector('.add-activity-btn');

    // Load activities from the server
    function loadActivities() {
        fetch('/activities')
            .then(response => response.json())
            .then(activities => {
                activities.forEach(activity => addActivityToDOM(activity));
            })
            .catch(error => console.error('Error loading activities:', error));
    }

    // Add an activity to the DOM
    function addActivityToDOM(activityData) {
        const activityBox = document.createElement('div');
        activityBox.classList.add('activity-box');
        activityBox.innerHTML = `
            <button class="delete-btn" onclick="hapusKegiatan(this)">Done</button>
            <p>${activityData.jenis} pada ${activityData.hari} pukul ${activityData.waktu}</p>
        `;
        activitiesContainer.insertBefore(activityBox, addActivityBtn);
    }

    // Add a new activity
    function tambahKegiatan() {
        const jenisInput = document.querySelector('input[name="jenis"]');
        const hariInput = document.querySelector('input[name="hari"]');
        const waktuInput = document.querySelector('input[name="waktu"]');

        const jenis = jenisInput.value.trim();
        const hari = hariInput.value;
        const waktu = waktuInput.value;

        if (jenis && hari && waktu) {
            const activityData = { jenis, hari, waktu };
            addActivityToDOM(activityData);

            // Save to server
            fetch('/add-activity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activityData)
            })
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(error => console.error('Error saving activity:', error));

            // Reset form
            jenisInput.value = '';
            hariInput.value = '';
            waktuInput.value = '';
        } else {
            alert('Semua field harus diisi!');
        }
    }

    // Delete an activity
    function hapusKegiatan(button) {
        const activityBox = button.parentElement;
        const jenis = activityBox.querySelector('p').textContent.split(' pada ')[0];
        const hari = activityBox.querySelector('p').textContent.split(' pada ')[1].split(' pukul ')[0];
        const waktu = activityBox.querySelector('p').textContent.split(' pukul ')[1];

        const activityData = { jenis, hari, waktu };

        fetch('/delete-activity', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            activityBox.remove();
        })
        .catch(error => console.error('Error deleting activity:', error));
    }

    // Initial load
    loadActivities();
    addActivityBtn.addEventListener('click', tambahKegiatan);
});
