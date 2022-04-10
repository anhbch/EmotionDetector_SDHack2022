let myInterval = null;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    myInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        // if (--timer < 0) {
        //     timer = 0;
        //     // timer = duration; // uncomment this line to reset timer automatically after reaching 0
        // }
        // timer--;
        if (--timer < 0) {
            timer = 0
        }
        // Need to update after calculate emotion
        if (timer === 0) {
            alert('sorry, out of time');
            clearInterval(timer);
        }
    }, 1000);
};

function start() {
    var time = 30 * 60, // your time in seconds here
    display = document.querySelector('#clock');
    startTimer(time, display);
};

function pause() {
    clearInterval(myInterval);
    // document.getElementById("clock").innerHTML = '30:00';
};

function reset() {
    clearInterval(myInterval);
    document.getElementById("clock").innerHTML = '30:00';
};





