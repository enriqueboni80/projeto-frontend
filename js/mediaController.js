var video = document.querySelector('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
navigator.mediaDevices.getUserMedia({
    video: true
}).then(function(stream) {
    //video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
});

document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
});