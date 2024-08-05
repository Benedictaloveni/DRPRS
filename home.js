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

let currentPage = 1;
const totalPages = 3; // Adjust this according to the number of pages you have

function updatePagination() {
  const pageNumbersContainer = document.getElementById('page-numbers');
  
  // Clear existing page numbers
  pageNumbersContainer.innerHTML = '';

  // Create page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.textContent = i;
    pageNumber.onclick = () => goToPage(i);
    if (i === currentPage) {
      pageNumber.classList.add('active');
    }
    pageNumbersContainer.appendChild(pageNumber);
  }
}

function goToPage(page) {
  currentPage = page;
  updatePagination();
  showPage(currentPage); // Show content for the selected page
}

function showPage(page) {
  const items = document.querySelectorAll('.news-item');
  items.forEach(item => {
    item.style.display = item.getAttribute('data-page') == page ? 'block' : 'none';
  });
}

function firstPage() {
  currentPage = 1;
  updatePagination();
  showPage(currentPage);
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
    showPage(currentPage);
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
    showPage(currentPage);
  }
}

function lastPage() {
  currentPage = totalPages;
  updatePagination();
  showPage(currentPage);
}

document.addEventListener("DOMContentLoaded", function() {
  // Initialize pagination and show content for the first page
  updatePagination();
  showPage(currentPage);

  let slideIndex = 0;
  const slides = document.getElementsByClassName("slide");
  const totalSlides = slides.length;
  const slideInterval = 5000; // 5 detik

  // Show the slides
  function showSlides(n) {
      let i;
      if (n >= totalSlides) { slideIndex = 0 }
      if (n < 0) { slideIndex = totalSlides - 1 }
      for (i = 0; i < totalSlides; i++) {
          slides[i].style.display = "none";
      }
      slides[slideIndex].style.display = "block";
  }

  // Function to change slide manually
  function changeSlide(n) {
      showSlides(slideIndex += n);
  }

  // Autoplay functionality
  function nextSlide() {
      slideIndex = (slideIndex + 1) % totalSlides;
      showSlides(slideIndex);
  }

  // Set an interval to change slide every 5 seconds
  setInterval(nextSlide, slideInterval);

  // Initial display
  showSlides(slideIndex);

  // Optional: If you have buttons to control slides manually
  document.querySelector(".prev").addEventListener("click", function() {
      changeSlide(-1);
  });

  document.querySelector(".next").addEventListener("click", function() {
      changeSlide(1);
  });
});
