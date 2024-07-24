console.log(`//======== THE screenRecorder FILE IS CONNECTED =======//`);
//=========================================================================================//
// Declare the mediaRecorder variable to be used for screen recording //
let mediaRecorder;
// Declare the recordedBlobs variable to be used as an array //
let recordedBlobs;
//=========================================================================================//

//================================= START VIDEO RECORDING =================================//
const startRecording = (e) => {
  console.log(`Start recording button works sanity check`);
  // console.log(e);
  //--------------------------------------------------------------------------------------//
  // NOTE YOU CAN ALSO RECORD THE mediaStream from the shareScreen.js file //
  if (!stream) {
    alert("No video feed available");
    return;
  }
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  // recordedBlobs is an array to hold the blobs for playback //
  recordedBlobs = [];
  // mediaRecorder makes a media recorder from the constructor //
  mediaRecorder = new MediaRecorder(stream);
  // Ondataavailable will run when the stream ends, stops, or we ask for it //
  mediaRecorder.ondataavailable = (e) => {
    // console.log("Data is available to be recorded");
    recordedBlobs.push(e.data);
  };
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  mediaRecorder.start();
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "blue",
    "grey",
    "blue",
  ]);
  //--------------------------------------------------------------------------------------//
};
//=========================================================================================//

//================================== STOP VIDEO RECORDING =================================//
const stopRecording = (e) => {
  console.log(`Stop recording button works sanity check`);
  // console.log(e);
  //--------------------------------------------------------------------------------------//
  if (!mediaRecorder) {
    alert("No video has been recorded");
    return;
  }
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  mediaRecorder.stop();
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "blue",
    "blue",
  ]);
  //--------------------------------------------------------------------------------------//
};
//=========================================================================================//

//================================== PLAY RECORDED VIDEO ==================================//
const playRecording = (e) => {
  console.log(`Play recording button works sanity check`);
  // console.log(e);
  //--------------------------------------------------------------------------------------//
  if (!recordedBlobs) {
    alert("There is no video to play back");
    return;
  }
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  // superBuffer is a super of the array of recordedBlobs
  const superBuffer = new Blob(recordedBlobs);
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  // Cache the video element to play the recorded video
  const recordedVideEl = document.getElementById("other-video");
  recordedVideEl.src = window.URL.createObjectURL(superBuffer);
  recordedVideEl.controls = true;
  recordedVideEl.play();
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "green",
    "blue",
  ]);
  //--------------------------------------------------------------------------------------//
};
//=========================================================================================//
