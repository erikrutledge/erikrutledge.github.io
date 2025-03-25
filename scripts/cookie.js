// Only apply cookie to desktop view, not mobile
if (window.innerWidth >= 700) {
    const cookieJar = document.getElementById("cookie-jar");
    const topOptions = [
        "Hope you're enjoying your visit,",
        "Just checking in,", 
        "Did you get lost?", 
        "Having fun exploring?", 
        "How's your day been so far?", 
        "You're looking a bit hungry",
        "I promise this wasn't on the floor,",
        "Feeling snacky?"
    ];
    const bottomOptions = [
        "Have a cookie on the house!", 
        "You deserve a treat!", 
        "You've earned a cookie!", 
        "Enjoy a cookie!", 
        "You look like you could use a cookie!",
        "No trackers here, just a cookie!",
        "I'm no monster, here's a cookie!",
        "I only give cookies to friends!"
    ];

    function startCountdown() {
        setTimeout(function(){
            const topText = document.getElementById("top-text");
            const bottomText = document.getElementById("bottom-text");

            topText.innerText = topOptions[Math.floor(Math.random() * topOptions.length)];
            bottomText.innerText = bottomOptions[Math.floor(Math.random() * bottomOptions.length)];
            cookieJar.classList.add("show");
        },20000);
    }

    cookieJar.addEventListener('click', function() { 
        // When clicked play sound, slide away, and set timer to slide back down
        const audio = new Audio('../media/munch.mp3');
        audio.play();

        cookieJar.classList.remove("show");

        startCountdown();
    });

    startCountdown();
}
