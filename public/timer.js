function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    myInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        timer--;
        if (timer >= 0) {
            span = document.getElementById("clock");
            span.innerHTML = counter;
          }
          if (timer === 0) {
              alert('sorry, out of time');
              clearInterval(timer);
          }
        }, 1000);
}

window.onload = function start() {
    var time = 30 * 60, // your time in seconds here
        display = document.querySelector('#clock');
    startTimer(time, display);
};

function stop() {
    //enable button
    clearInterval(myInterval);
}


