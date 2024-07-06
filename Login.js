//SUBMISSION FORM LOGIN
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (password === 'j4tinangor') {
      window.location.href = 'home.html';
  } else {
      errorMessage.textContent = 'Invalid password';
      errorMessage.style.color = 'red';
  }
});

//TRANSISI GAMBAR
let currentImageIndex = 0;
const images = document.querySelectorAll('.slideshow');

function showNextImage() {
  images[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add('active');
}

setInterval(showNextImage, 3000); 



  
  
  
  