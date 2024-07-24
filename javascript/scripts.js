console.log(`//======== THE scripts FILE IS CONNECTED =======//`);

// Cache the video element
const videoEl = document.getElementById("my-video");

// The steam variable will store the stream
let stream = null;

// Initial mediaStream variable for screen sharing
let mediaStream;

// This is a object containing the type of media-tracks/hardware
const constrants = {
  audio: true,
  video: true,
};

// Async functions to capture the media device
const getMicAndCamera = async (e) => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constrants);
    // console.log(stream);

    changeButtons([
      "green",
      "blue",
      "blue",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ]);
  } catch (error) {
    console.log(
      "The scripted generated an error allowing to share the mic and video an error",
      error
    );
  }
};

// Async functions to show video feed
const showMyVideoFeed = async (e) => {
  // console.log("Sanity Check", e);
  // console.log(videoEl);
  //--------------------------------------------------------------------//
  // Check if the stream is still available
  if (!stream) {
    alert("The stream is still loading");
    return;
  }
  //--------------------------------------------------------------------//

  //--------------------------------------------------------------------//
  // This will set our video stream to our video element
  videoEl.srcObject = stream;
  //--------------------------------------------------------------------//

  //--------------------------------------------------------------------//
  // Cache the media tracks
  const tracks = stream.getTracks();
  console.log(tracks);
  //--------------------------------------------------------------------//

  //--------------------------------------------------------------------//
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "blue",
    "grey",
    "grey",
    "blue",
  ]);
  //--------------------------------------------------------------------//
};

// Async functions to capture the media device
const stopMyVideoFeed = async (e) => {
  // console.log("Sanity Check", e);
  try {
    // Check if the stream is still available
    if (!stream) {
      alert("The stream is still loading");
      return;
    }
    // Cache the media tracks
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      // console.log(track);
      // This stops/disassociates the video & audio track from the source
      track.stop();
    });
    changeButtons([
      "blue",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ]);
  } catch (error) {
    console.log(
      "The scripted generated an error disassociating the video and audio",
      error
    );
  }
};
//===========================================================================//

//===========================================================================//
//---------------------------------------------------------------------------//
// Cache the share mic and camera button
const shareMicAndCameraButton = document.getElementById("share");
// Event listener added to the share mic and camera
shareMicAndCameraButton.addEventListener("click", (e) => getMicAndCamera(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the show video button
const showVideoButton = document.getElementById("show-video");
// Event listener added to show the video
showVideoButton.addEventListener("click", (e) => showMyVideoFeed(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the stop video button
const stopVideoButton = document.getElementById("stop-video");
// Event listener added to stop the video
stopVideoButton.addEventListener("click", (e) => stopMyVideoFeed(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the change screen button
const changeScreenSizeButton = document.getElementById("change-size");
// Event listener added to the change screen button
changeScreenSizeButton.addEventListener("click", (e) => changeVideoSize(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the record video button
const startRecordingButton = document.getElementById("start-record");
// Event listener added to the record video button
startRecordingButton.addEventListener("click", (e) => startRecording(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the stop record video button
const stopRecordingButton = document.getElementById("stop-record");
// Event listener added to the stop record video button
stopRecordingButton.addEventListener("click", (e) => stopRecording(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the play the recorded video button
const playRecordingButton = document.getElementById("play-record");
// Event listener added to the play the recorded video button
playRecordingButton.addEventListener("click", (e) => playRecording(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the share screen button
const shareScreenButton = document.getElementById("share-screen");
// Event listener added to the share screen button
shareScreenButton.addEventListener("click", (e) => shareScreen(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the video input button
const videoInputButton = document.getElementById("video-input");
// Event listener added to the audio input button
videoInputButton.addEventListener("change", (e) => changeVideoInput(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the audio input button
const audioInputButton = document.getElementById("audio-input");
// Event listener added to the audio input button
audioInputButton.addEventListener("change", (e) => changeAudioInput(e));
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Cache the audio output button
const audioOutputButton = document.getElementById("audio-output");
// Event listener added to the audio output button
audioOutputButton.addEventListener("change", (e) => changeAudioOutput(e));
//---------------------------------------------------------------------------//
//===========================================================================//
