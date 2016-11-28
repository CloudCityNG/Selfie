var captureImage = document.getElementById('pictureButtonId');
if(captureImage)
  captureImage.addEventListener('click', takeSelfie);

var constraints = window.constraints = {
  audio: false,
  video: true
};
var errorElement = document.querySelector('#errorId');

navigator.mediaDevices.getUserMedia(constraints)
.then(
  function(stream) {
  var videoElement = document.getElementById('videoId');

  var videoStream = stream;
  videoElement.srcObject = videoStream;
  videoElement.autoplay = true;
})
.catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions were not granted to use the camera of your device. For this demo to work, please provide access to your webcam.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});

function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

function takeSelfie() {
  var canvasElement = document.getElementById('canvasId');
  var context = canvasElement.getContext('2d');
  context.drawImage(videoElement,0,0);
}
