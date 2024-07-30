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

    // Load activities from localStorage
    function loadActivities() {
        const activities = JSON.parse(localStorage.getItem('activities')) || [];
        activities.forEach(activity => addActivity(activity, false));
    }

    // Save activities to localStorage
    function saveActivities(activities) {
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    // Add an activity to the DOM and localStorage
    function addActivity(activityData, save = true) {
        const activityBox = document.createElement('div');
        activityBox.classList.add('activity-box');
        activityBox.innerHTML = `
            <button class="delete-btn">Done</button>
            <p>${activityData}</p>
        `;
        activityBox.querySelector('.delete-btn').addEventListener('click', function() {
            deleteActivity(activityBox);
        });
        activitiesContainer.insertBefore(activityBox, activitiesContainer.firstChild);

        if (save) {
            const activities = JSON.parse(localStorage.getItem('activities')) || [];
            activities.unshift(activityData);
            saveActivities(activities);
        }
    }

    // Delete an activity from the DOM and localStorage
    function deleteActivity(activityBox) {
        const activities = JSON.parse(localStorage.getItem('activities')) || [];
        const index = Array.from(activitiesContainer.children).indexOf(activityBox);
        activities.splice(index, 1);
        saveActivities(activities);
        activityBox.remove();
    }

    // Add a new activity on button click
    addActivityBtn.addEventListener('click', function() {
        const jenisInput = document.querySelector('input[name="jenis"]');
        const hariInput = document.querySelector('input[name="hari"]');
        const waktuInput = document.querySelector('input[name="waktu"]');

        const jenis = jenisInput.value.trim();
        const hari = hariInput.value;
        const waktu = waktuInput.value;

        if (jenis && hari && waktu) {
            const activityData = `${jenis} pada ${hari} pukul ${waktu}`;
            addActivity(activityData);

            // Reset form
            jenisInput.value = '';
            hariInput.value = '';
            waktuInput.value = '';
        } else {
            alert('Semua field harus diisi!');
        }
    });

    // Initial load
    loadActivities();
});
