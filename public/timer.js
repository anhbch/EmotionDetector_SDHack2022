
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        // if (--timer < 0) {
        //     timer = 0;
        //     // timer = duration; // uncomment this line to reset timer automatically after reaching 0
        // }
        timer--;
        if (timer >= 0) {
            span = document.getElementById("clock");
        }
        if (timer === 0) {
            alert('sorry, out of time');
            clearInterval(timer);
        }
    }, 1000);
};

window.addEventListener('click',function () {
    var time = 30 * 60, // your time in seconds here
    display = document.querySelector('#clock');
    startTimer(time, display);
});



