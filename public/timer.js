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
            // alert('sorry, out of time');
            clearInterval(timer);

            //Call getDomEmotion
            
        }
    }, 1000);
};

function start() {
    var time = 10, // your time in seconds here
    display = document.querySelector('#clock');
    startTimer(time, display);
};

function pause() {
    clearInterval(myInterval);
    document.getElementById("clock").innerHTML = document.querySelector('#clock');
    display = document.querySelector('#clock');
    startTimer(time, display);
};

function reset() {
    clearInterval(myInterval);
    document.getElementById("clock").innerHTML = '30:00';
};


let emotions_obj = {
    happy: 0,
    sad: 0,
    angry: 0
}
let dominating_emotion = {}
let sortable = []

/**
 * Helper function to get data
 */
function getDomEmotion(){
    emotions_obj['happy'] = parseFloat(localStorage.getItem("overall_happy"));
    emotions_obj['sad'] = parseFloat(localStorage.getItem("overall_sad"));
    emotions_obj['angry'] = parseFloat(localStorage.getItem("overall_angry"));
    // emotions_obj['happy'] = 2
    // emotions_obj['sad'] = 1
    // emotions_obj['angry'] = 3
    for (var el in emotions_obj) {
        sortable.push([el, emotions_obj[el]]);
    }
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    dominating_emotion[sortable[2][0]] = sortable[2][1];
    return dominating_emotion;
}


