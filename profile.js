// Menyimpan Status Menu Navigasi
let isOpen = false;

// Menyimpan halaman saat ini yang sedang ditampilkan
let currentPage = 1;

// Jumlah item yang ditampilkan per halaman
let itemsPerPage = 5;

// Array untuk menyimpan data hasil pencarian
let filteredData = [];

// Jumlah halaman total
let totalPages = 0;

// Array untuk menyimpan semua data dari JSON
let allData = [];

// Fungsi untuk menampilkan atau menyembunyikan menu navigasi saat hamburger menu diklik
function toggleMenu() {
    // Memilih elemen navigasi dan hamburger menu
    const nav = document.querySelector('.box--subnavigasi');
    const hamburger = document.querySelector('.hamburger-menu');

    // Jika menu belum terbuka
    if (!isOpen) {
        nav.classList.add('show');
        hamburger.classList.add('active');
        isOpen = true;
    } 
    // Jika menu sudah terbuka
    else {
        nav.classList.remove('show');
        hamburger.classList.remove('active');
        isOpen = false;
    }
}

// Fungsi untuk mengambil data dari JSON dan memuat tabel 
async function getDataAndPopulateTable() {
    try {
        const response = await fetch('FormerMember.json');
        const data = await response.json();
        allData = data.slice(1);
        filteredData = allData;
        totalPages = Math.ceil(filteredData.length / itemsPerPage);
        populateTable(currentPage);

        // Render tombol navigasi halaman
        renderPaginationButtons();
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Fungsi untuk memuat isi tabel pada halaman tertentu
function populateTable(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    paginatedData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${item.string_field_1}</td>
            <td>${item.string_field_2}</td>
            <td>${item.string_field_3}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi untuk menangani input pencarian
function handleSearchInput() {
    const searchInputValue = this.value.trim().toLowerCase();
    filteredData = searchInputValue
        ? allData.filter(item =>
            item.string_field_1.toLowerCase().includes(searchInputValue) ||
            item.string_field_2.toLowerCase().includes(searchInputValue) ||
            item.string_field_3.toLowerCase().includes(searchInputValue)
          )
        : allData;
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    currentPage = 1;
    populateTable(currentPage);
    renderPaginationButtons();
}

// Fungsi untuk mengubah jumlah entri per halaman
function changeEntriesPerPage() {
    itemsPerPage = parseInt(document.getElementById('entriesPerPage').value);
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    currentPage = 1;
    populateTable(currentPage);
    renderPaginationButtons();
}

// Fungsi untuk navigasi ke halaman berikutnya
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++; 
        populateTable(currentPage); 
        renderPaginationButtons(); 
    }
}

// Fungsi untuk navigasi ke halaman sebelumnya
function previousPage() {
    if (currentPage > 1) {
        currentPage--; 
        populateTable(currentPage); 
        renderPaginationButtons(); 
    }
}

// Fungsi untuk navigasi ke halaman pertama
function firstPage() {
    currentPage = 1; 
    populateTable(currentPage); 
    renderPaginationButtons(); 
}

// Fungsi untuk navigasi ke halaman terakhir
function lastPage() {
    currentPage = totalPages; 
    populateTable(currentPage); 
    renderPaginationButtons(); 
}

// Fungsi untuk merender ulang tombol navigasi halaman
function renderPaginationButtons() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; 

    // Tambahkan tombol navigasi untuk halaman pertama dan sebelumnya
    paginationContainer.innerHTML += `
        <button onclick="firstPage()">«</button>
        <button onclick="previousPage()">‹</button>
    `;

    // Tentukan jumlah tombol halaman yang ditampilkan
    const maxButtons = 3; // Jumlah maksimal tombol halaman
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Sesuaikan rentang jika terlalu dekat dengan halaman awal atau akhir
    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Tambahkan tombol untuk setiap halaman dalam rentang
    for (let i = startPage; i <= endPage; i++) {
        paginationContainer.innerHTML += `
            <button onclick="goToPage(${i})" class="pageNumber ${currentPage === i ? 'active' : ''}">${i}</button>
        `;
    }

    // Tambahkan tombol navigasi untuk halaman berikutnya dan terakhir jika perlu
    if (endPage < totalPages) {
        paginationContainer.innerHTML += `
            <button onclick="nextPage()">›</button>
            <button onclick="lastPage()">»</button>
        `;
    }
}

// Fungsi untuk pergi ke halaman tertentu
function goToPage(page) {
    currentPage = page; 
    populateTable(currentPage); 
    renderPaginationButtons(); 
}

// Event listener untuk memuat data dan tabel saat dokumen telah dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', () => {
    getDataAndPopulateTable(); 
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearchInput);
    const entriesPerPageSelect = document.getElementById('entriesPerPage');
    entriesPerPageSelect.addEventListener('change', changeEntriesPerPage);
    entriesPerPageSelect.value = itemsPerPage.toString();
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

function sortTable(columnIndex, order) {
    const table = document.querySelector('table');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.children[columnIndex].textContent.trim();
        const cellB = rowB.children[columnIndex].textContent.trim();

        if (order === 'asc') {
            return cellA.localeCompare(cellB, undefined, { numeric: true });
        } else {
            return cellB.localeCompare(cellA, undefined, { numeric: true });
        }
    });

    // Append sorted rows to the table body
    const tbody = table.querySelector('tbody');
    rows.forEach(row => tbody.appendChild(row));
}
