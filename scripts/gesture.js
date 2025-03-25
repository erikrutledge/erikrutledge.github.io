// Only apply custom gestures to desktop view, not mobile
if (window.innerWidth >= 700) {
  setTimeout(function () {
    const track = document.getElementById("preview-track");
    const minPercentage = (track.childElementCount + 3) * -10; // Minimum percentage
    const maxPercentage = -10; // Maximum percentage

    // Start with the track completely off-screen
    let initialPercentage = 10;
    track.dataset.percentage = initialPercentage;
    track.dataset.prevPercentage = initialPercentage;

    // Apply the initial off-screen position
    track.style.transform = `translate(${initialPercentage}%, -50%)`;

    // Add momentum animation to bring the track into view
    const targetPercentage = -22; // Final stopping point
    const images = track.getElementsByClassName("card-image");

    track.animate(
      {
        transform: [`translate(${initialPercentage}%, -50%)`, `translate(${targetPercentage}%, -50%)`],
      },
      { duration: 1500, easing: "ease-out", fill: "forwards" }
    );

    // Animate the images
    for (const image of images) {
      image.animate(
        {
          objectPosition: [`${initialPercentage + 100}% 50%`, `${targetPercentage + 100}% 50%`],
        },
        { duration: 1500, easing: "ease-out", fill: "forwards" }
      );
    }

    // Update dataset after animation completes
    setTimeout(() => {
      track.dataset.percentage = targetPercentage.toString();
      track.dataset.prevPercentage = targetPercentage.toString();
    }, 1500);

    window.onmousedown = (e) => {
      track.dataset.mouseDownAt = e.clientX;
    };

    window.onmouseup = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    };

    window.onmousemove = (e) => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

      // Apply limits
      nextPercentage = Math.max(minPercentage, Math.min(maxPercentage, nextPercentage));

      track.dataset.percentage = nextPercentage;

      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of track.getElementsByClassName("card-image")) {
        image.animate(
          {
            objectPosition: `${nextPercentage + 100}% 50%`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    window.addEventListener("keydown", (e) => {
      let currentPercentage = parseFloat(track.dataset.percentage) || 0;
      const step = 10; // Adjust step size for arrow key navigation

      if (e.key === "ArrowLeft") {
        currentPercentage += step;
      } else if (e.key === "ArrowRight") {
        currentPercentage -= step;
      } else {
        return; // Exit if the key is not an arrow key
      }

      // Apply limits
      currentPercentage = Math.max(minPercentage, Math.min(maxPercentage, currentPercentage));

      track.dataset.percentage = currentPercentage;
      track.dataset.prevPercentage = currentPercentage;

      track.animate(
        {
          transform: `translate(${currentPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of track.getElementsByClassName("card-image")) {
        image.animate(
          {
            objectPosition: `${currentPercentage + 100}% 50%`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    });
  }, 500); // Delay execution to ensure the DOM is fully loaded
}