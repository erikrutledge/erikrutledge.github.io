const track = document.getElementById("previewTrack");

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
  if(track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
        
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`,
  }, { duration: 1200, fill: "forwards" });

  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${nextPercentage + 100}% 50%`
    }, { duration: 1200, fill: "forwards" });
  }
}




function DVDLogo() {
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
        }
      if (dvdY + dvdHeight > canvas.height || dvdY < headerHeight) {
        dvdSpeedY *= -1;
      }

      // Draw the DVD logo
      ctx.drawImage(dvdImage, dvdX, dvdY, dvdWidth, dvdHeight);

      // Request the next animation frame
      requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();
}