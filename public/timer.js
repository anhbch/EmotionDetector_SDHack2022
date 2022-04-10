let myInterval = null;
// let songs = [
//     "https://open.spotify.com/embed/track/6mry9fDj4oTFudQAMRo1lV?utm_source=generator",
//     "https://open.spotify.com/embed/track/3AE6zraO6sukye0pu175Ca?utm_source=generator",
//     "https://open.spotify.com/embed/track/3AE6zraO6sukye0pu175Ca?utm_source=generator",
//     "https://open.spotify.com/embed/track/3AE6zraO6sukye0pu175Ca?utm_source=generator"
// ]
// let el = document.createElement('iframe');
// //set attrs
// el.setAttribute('width','60%');
// el.setAttribute('height','200');
// el.setAttribute('frameBorder','0');
// el.setAttribute('allow','autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
// el.setAttribute('style','border-radius:12px');




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
            timer = 0;
        }
        // Need to update after calculate emotion
        if (timer === 0) {
            // alert('sorry, out of time');
            clearInterval(timer);
            //Call getDomEmotion
            let domEmotion = getDomEmotion();
            let arr = Object.keys(domEmotion);
            document.getElementById("emotion").innerHTML = "You were "  + arr[0].toUpperCase().bold();

            // Sugesstions
            // if (arr[0].toString() === 'angry') {
            //     document.getElementById("sugesstion").innerHTML = "Suggestion: Let's take some time out, give you a short break if you feel stressful."
            //     document.getElementById("suggestion").innerHTML = "A few moments of quiet time might help you feel better prepared to handle what's ahead without getting irritated or angry. You got this!";
            // }
            // else if (arr[0].toString() === 'happy') {
            //     document.getElementById("sugesstion").innerHTML = "Suggestion: Let's take a 10-minute break after start a new task. You did a great job!";
            // }
            // else {
            //     document.getElementById("sugesstion").innerHTML = "Suggestion: Let's take a break from your task. Allow yourself to be sad, it's okay!";
            //     document.getElementById("sugesstion").innerHTML = "Denying such feelings may force them underground, where they can do more damage with time. Cry if you feel like it. Notice if you feel relief after the tears stop.";
            // }
        }
    }, 1000);
};

function start() {
    var time = 10; // your time in seconds here
    display = document.querySelector('#clock');
    localStorage.clear();
    startTimer(time, display);
};

// function pause() {
//     clearInterval(myInterval);
//     document.getElementById("clock").innerHTML = document.querySelector('#clock');
//     display = document.querySelector('#clock');
//     startTimer(time, display);
// };

function reset() {
    clearInterval(myInterval);
    localStorage.clear();
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


