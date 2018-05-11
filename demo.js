let wam;
let media = 'default';
let filter = 'Normal', prevFilter;
let frameNum_1,frameNum_2,frameNum_3,frameNum_4;
let pixels, pixels2;

loadWASM()
  .then(module => {
    wam = module;
}).catch((err) => {
  console.log('Error in fetching module: ', err);
}).then(() => {
    window.onload = (() => {
    })();
});

function webcamToggle() {
  media = media === 'default' ? 'webcam' : 'default';
  if(media==='webcam') {	
    document.getElementById('webcamButton').innerHTML = 'Disable Webcam'; //Edited
    navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
            vid_1.srcObject = stream;
			vid_2.srcObject = stream;
			vid_3.srcObject = stream;
			vid_4.srcObject = stream;
			
			document.getElementById('middle-col').style.visibility= "visible"        })
        .catch(function(err) {
            media = 'default'; //Edited
            console.log(err.name);
        });
  }
  else {

    document.getElementById('webcamButton').innerHTML = 'Switch to Webcam';
	document.getElementById('middle-col').style.visibility= "hidden"
    vid_1.srcObject = null;
    vid_2.srcObject = null;
	vid_3.srcObject = null;
    vid_4.srcObject = null;
  }
  
}
//wasm video
var vid_1 = document.getElementById('v_1');
var canvas_1 = document.getElementById('c_1');
var context_1 = canvas_1.getContext('2d');

var vid_2 = document.getElementById('v_2');
var canvas_2 = document.getElementById('c_2');
var context_2 = canvas_2.getContext('2d');

var vid_3 = document.getElementById('v_3');
var canvas_3= document.getElementById('c_3');
var context_3= canvas_3.getContext('2d');

var vid_4 = document.getElementById('v_4');
var canvas_4 = document.getElementById('c_4');
var context_4 = canvas_4.getContext('2d');

vid_1.addEventListener("loadeddata", function() {
  canvas_1.setAttribute('height', vid_1.videoHeight);
  canvas_1.setAttribute('width', vid_1.videoWidth);
  draw_1();
  //timeData();
});

vid_2.addEventListener("loadeddata", function() {
  canvas_2.setAttribute('height', vid_2.videoHeight);
  canvas_2.setAttribute('width', vid_2.videoWidth);
  draw_2();
});

vid_3.addEventListener("loadeddata", function() {
	console.log("hi")
  canvas_3.setAttribute('height', vid_3.videoHeight);
  canvas_3.setAttribute('width', vid_3.videoWidth);
  draw_3();
  //timeData();
});

vid_4.addEventListener("loadeddata", function() {
  canvas_4.setAttribute('height', vid_4.videoHeight);
  canvas_4.setAttribute('width', vid_4.videoWidth);
  draw_4();
  //timeData();
});

function draw_1() {
  if (vid_1.paused) return false;
  context_1.drawImage(vid_1, 0, 0,320,220);
  // console.log('check', vid, context);
  pixels = context_1.getImageData(0, 0, vid_1.videoWidth, vid_1.videoHeight);
 
  context_1.putImageData(pixels, 0, 0);
  frameNum_1 = requestAnimationFrame(draw_1); 
}
function draw_2() {
  if (vid_2.paused) return false;
  context_2.drawImage(vid_2, 0, 0,320,220);
  pixels_2 = context_2.getImageData(0, 0, vid_2.videoWidth, vid_2.videoHeight);
  pixels_2.data.set(wam.grayScale(pixels_2.data));
  context_2.putImageData(pixels_2, 0, 0);
  frameNum_2 = requestAnimationFrame(draw_2); 
}


function draw_3() {
  if (vid_3.paused) return false;
  context_3.drawImage(vid_3, 0, 0,320,220);
  pixels_3 = context_3.getImageData(0, 0, vid_3.videoWidth, vid_3.videoHeight);
  pixels_3.data.set(wam.brighten(pixels_3.data));
  context_3.putImageData(pixels_3, 0, 0);
  frameNum_3 = requestAnimationFrame(draw_3); 

}

function draw_4() {
  if (vid_4.paused) return false;
  context_4.drawImage(vid_3, 0, 0,320,220);
  pixels_4 = context_4.getImageData(0, 0, vid_4.videoWidth, vid_4.videoHeight);
  pixels_4.data.set(wam.invert(pixels_4.data)); 
  context_4.putImageData(pixels_4, 0, 0);
  frameNum_4 = requestAnimationFrame(draw_4); 
}
