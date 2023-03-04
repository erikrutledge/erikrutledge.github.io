// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize variables for the DVD logo
let dvdX = canvas.width / 2;
let dvdY = canvas.height / 2;
let dvdSpeedX = 2;
let dvdSpeedY = 2;
let dvdWidth = 100;
let dvdHeight = 100;
let dvdImage = new Image();
dvdImage.src = 'https://imgs.search.brave.com/Gn8CGDDlzGCBRz7vUqlxjVGk6_fRXuFvINKl7913tAQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWJpZXN1cHBs/eS5jb20vbG9nb3Mv/bGFyZ2UvMngvZHZk/LWxvZ28tcG5nLXRy/YW5zcGFyZW50LnBu/Zw';
let headerHeight = 65

// Add an event listener to track the mouse position
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Create an animation loop to update the canvas
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the position of the DVD logo
  dvdX += dvdSpeedX;
  dvdY += dvdSpeedY;

  // Bounce the DVD logo off the walls
  if (dvdX + dvdWidth > canvas.width || dvdX < 0) {
    dvdSpeedX *= -1;
    ctx.filter = `hue-rotate(${Math.random() * 360}deg)`;
    }
  if (dvdY + dvdHeight > canvas.height || dvdY < headerHeight) {
    dvdSpeedY *= -1;
    ctx.filter = `hue-rotate(${Math.random() * 360}deg)`;
  }

  // Draw the DVD logo
  ctx.drawImage(dvdImage, dvdX, dvdY, dvdWidth, dvdHeight);

  // Reset the color filter
  ctx.filter = 'none';

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
