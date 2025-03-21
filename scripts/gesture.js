const track = document.getElementById("previewTrack");
const gestureGif = document.getElementById("clickDrag");

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;

  gestureGif.style.visibility = 'hidden';
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;

  window.setTimeout(() => {gestureGif.style.visibility = 'visible';}, 5000);
  
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
