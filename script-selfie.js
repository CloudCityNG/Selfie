captureImage = document.getElementById('buttonId');
if(captureImage) captureImage.addEventListener('click', takeSelfie, false);

grayImage = document.getElementById('grayId');
if(grayImage)
  grayImage.addEventListener('click', processGrayImage, false);

sepiaImage = document.getElementById('sepiaId');
  if(sepiaImage)
    sepiaImage.addEventListener('click', processSepiaImage, false);

saturateImage = document.getElementById('saturateId');
  if(saturateImage)
    saturateImage.addEventListener('click', processSaturatedImage, false);

brightImage = document.getElementById('brightId');
  if(brightImage)
  brightImage.addEventListener('click', processBrightImage, false);

hueImage = document.getElementById('hueId');
  if(hueImage)
    hueImage.addEventListener('click', processHueImage, false);

contrastImage = document.getElementById('contrastId');
  if(contrastImage)
    contrastImage.addEventListener('click', processContrastImage, false);

blurImage = document.getElementById('blurId');
  if(blurImage)
    blurImage.addEventListener('click', processBlurImage, false);

reset = document.getElementById('resetId');
  if(reset)
    reset.addEventListener('click', resetImage, false);

opacity = document.getElementById('opacityId');
  if(opacity)
    opacity.addEventListener('click', processOpacity, false);

var canvasElement = document.getElementById('canvasId');
var context = canvasElement.getContext('2d');
var slider = document.getElementById("sliderId");
var downloadButton = document.getElementById('downloadId');
var errorElement = document.querySelector('#errorId');
var buttonTracker;

var constraints = window.constraints = {
audio: false,
 video: { width: 1280, height: 720 }
};

navigator.mediaDevices.getUserMedia(constraints)
.then(
function(stream) {
videoElement = document.getElementById('videoId');

var videoStream = stream;
videoElement.srcObject = videoStream;
videoElement.autoplay = true;
})
.catch(function(error) {
if (error.name === 'ConstraintNotSatisfiedError') {
  errorMsg('The resolution ' + constraints.video.width.exact + ' x ' +
      constraints.video.width.exact + ' px is not supported by your device.');
} else if (error.name === 'PermissionDeniedError') {
  errorMsg('Permission was not granted to use the camera of your device. In order to take a selfie, please provide access to your webcam.');
}
else {
  errorMsg('There was an error in accessing your webcam. Please reload the page and provide access to the camera.');
}
});

function errorMsg(msg, error) {
errorElement.innerHTML += '<p>' + msg + '</p>';
if (typeof error !== 'undefined') {
  console.error(error);
}
}

function takeSelfie() {
canvasElement.width = videoElement.videoWidth;
canvasElement.height = videoElement.videoHeight;
context.filter = videoElement.style.filter || videoElement.style.webkitFilter;
context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
canvasElement.style = "border:2px solid #000000;"
canvasElement.style.filter = videoElement.style.filter;
canvasElement.style.webkitFilter = videoElement.style.webkitFilter;

downloadButton.href = canvasElement.toDataURL('image/png');
}

function processHueImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processHueImage, false);
var sliderVal = slider.value;
videoElement.style.filter = "hue-rotate(" + (sliderVal * 3.4) + "deg)";
videoElement.style.webkitFilter = "hue-rotate(" + (sliderVal * 3.4) + "deg)";
buttonTracker = processHueImage;
}

function processGrayImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processGrayImage, false);
var sliderVal = slider.value;
videoElement.style.filter = "grayscale(" + sliderVal + "%)";
videoElement.style.webkitFilter = "grayscale(" + sliderVal + "%)";
buttonTracker = processGrayImage;
}

function processSepiaImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processSepiaImage, false);
var sliderVal = slider.value;
videoElement.style.filter = "sepia(" + sliderVal + "%)";
videoElement.style.webkitFilter = "sepia(" + sliderVal + "%)";
buttonTracker = processSepiaImage;
}

function processSaturatedImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processSaturatedImage, false);
var sliderVal = slider.value;
videoElement.style.filter = "saturate(" + (sliderVal * 3) + "%)";
videoElement.style.webkitFilter = "saturate(" + (sliderVal * 3) + "%)";
buttonTracker = processSaturatedImage;
}

function processBrightImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processBrightImage, false);
var sliderVal = slider.value;
videoElement.style.filter = "brightness(" + (sliderVal * 2) + "%)";
videoElement.style.webkitFilter = "brightness(" + (sliderVal * 2) + "%)";
buttonTracker = processBrightImage;
}

function processContrastImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processContrastImage, false);
var sliderVal = slider.value;
videoElement.style.filter = "contrast(" + (sliderVal * 2) + "%)";
videoElement.style.webkitFilter = "contrast(" + (sliderVal * 2) + "%)";
buttonTracker = processContrastImage;
}

function processBlurImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processBlurImage, false);
var sliderVal = slider.value;
videoElement.style.filter = "blur(" + (sliderVal / 30) + "px)";
videoElement.style.webkitFilter = "blur(" + (sliderVal / 30) + "px)";
buttonTracker = processBlurImage;
}

function resetImage() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", resetImage, false);
videoElement.style.filter = "";
videoElement.style.webkitFilter = "";
}

function processOpacity() {
slider.removeEventListener("change", buttonTracker);
slider.addEventListener("change", processOpacity, false);
var sliderVal = slider.value;
videoElement.style.filter = "opacity(" + (sliderVal / 2) + "%)";
videoElement.style.webkitFilter = "opacity(" + (sliderVal / 2) + "%)";
buttonTracker = processOpacity;
}

// function getFileName() {
//   var fileName = document.getElementById('fileId').value;
//   document.getElementById('downloadId').download = fileName;
// }
