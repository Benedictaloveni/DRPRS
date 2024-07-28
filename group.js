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
}document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('event-form');
    const eventSummary = document.getElementById('event-summary');

    // Load events from localStorage
    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => addEventToSummary(event));
    }

    // Save event to localStorage
    function saveEvent(event) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    // Add event to summary section
    function addEventToSummary(event, index) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Tanggal:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button class="done-button" data-index="${index}">Done</button>
        `;
        eventSummary.appendChild(eventDiv);
    }

    // Handle form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const eventName = document.getElementById('event-name').value;
        const eventDate = document.getElementById('event-date').value;
        const eventDescription = document.getElementById('event-description').value;

        const event = {
            name: eventName,
            date: eventDate,
            description: eventDescription
        };

        saveEvent(event);
        addEventToSummary(event, JSON.parse(localStorage.getItem('events')).length - 1);

        eventForm.reset();
    });

    // Handle removing events
    eventSummary.addEventListener('click', function(e) {
        if (e.target.classList.contains('done-button')) {
            const index = e.target.getAttribute('data-index');
            removeEvent(index);
        }
    });

    // Remove event from localStorage
    function removeEvent(index) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        refreshEvents();
    }

    // Refresh events list
    function refreshEvents() {
        eventSummary.innerHTML = '';
        loadEvents();
    }

    // Initial load
    loadEvents();
});
