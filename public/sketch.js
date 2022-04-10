
let faceapi;
let detections = [];
let video;
let canvas;
let faceOptions;

let happy_count = 0;
let sad_count = 0;
let angry_count = 0;

let happy_sum = 0;
let sad_sum = 0;
let angry_sum = 0;

function setup() {
  canvas = createCanvas(480, 360);
  canvas.id("canvas");

  video = createCapture(VIDEO);// Creat the video
  video.id("video");
  video.size(width, height);

  faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5
  };

  //Initialize the model:
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}
/**
 * Main function: Start detecting face and emotion
 */
function start(){
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces:
}

/**
 * recursive funtion
 * @param {*} error 
 * @param {*} result 
 * @returns 
 */
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result;//Now all the data in this detections: 
  // console.log(detections);

  clear();//Draw transparent background;: 
  drawBoxs(detections);//Draw detection box: 
  drawLandmarks(detections);//// Draw all the face points: 
  drawExpressions(detections, 20, 250, 14);//Draw face expression:
  faceapi.detect(gotFaces);// Call the function again at here:
}

/**
 * Helper function: Draw box
 */
function drawBoxs(detections){
  if (detections.length > 0) {//If at least 1 face is detected:
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width, _height} = detections[f].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

/**
 * Helper function: draw landmark
 */
function drawLandmarks(detections){
  if (detections.length > 0) {//If at least 1 face is detected:
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(44, 169, 225);
        strokeWeight(3);
        point(points[i]._x, points[i]._y);
      }
    }
  }
}

/**
 * Helper function: Draw expression
 */
async function drawExpressions(detections, x, y, textYSpace){
  if(detections.length > 0){//If at least 1 face is detected: 
    let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[0].expressions;
    textFont('Helvetica Neue');
    textSize(14);
    noStroke();
    fill(44, 169, 225);
    /**
     * Update bar chart data
     */
    updateData(nf(happy*100, 2, 2),nf(sad*100, 2, 2),nf(angry*100, 2, 2));
    /**
     * Collect emotion data
     */
    const data = {happy, angry, sad};
    /**
     * local storage
     */
    if(happy >= 0.05){
      happy_count += 1;
      happy_sum += happy;
    }
    if(sad >= 0.05){
      sad_count += 1;
      sad_sum += sad;
    }
    if(angry >= 0.1){
      angry_count += 1;
      angry_sum += angry;
    }
    localStorage.setItem("overall_happy",happy_sum/happy_count);
    localStorage.setItem("overall_sad",sad_sum/sad_count);
    localStorage.setItem("overall_angry",angry_sum/angry_count);
    // const options ={
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }
    // const response = await fetch('/api', options);
    // const json = await response.json();
    // console.log(json);
  }else{//If no faces is detected:
    // text("neutral: ", x, y);
    // text("happiness: ", x, y + textYSpace);
    // text("anger: ", x, y + textYSpace*2);
    // text("sad: ", x, y + textYSpace*3);
    // text("disgusted: ", x, y + textYSpace*4);
    // text("surprised: ", x, y + textYSpace*5);
    // text("fear: ", x, y + textYSpace*6);
  }
}


/**
 * Helper Function: update bar chart data
 */
function updateData(happy, sad, angry){
  barChart.data.datasets[0].data[0] = happy;
  barChart.data.datasets[0].data[1] = sad;
  barChart.data.datasets[0].data[2] = angry;
  barChart.update();
}