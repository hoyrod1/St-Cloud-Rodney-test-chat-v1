console.log(`//======== THE inputOutput FILE IS CONNECTED =======//`);
//=========================================================================================//
const videoInputEl = document.getElementById("video-input");
const audioInputEl = document.getElementById("audio-input");
const audioOutputEl = document.getElementById("audio-output");
//=========================================================================================//

//=========================================================================================//
const getDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    devices.forEach((device) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.textContent = device.label;
      // Append the option element to the correct selected element cached above
      if (device.kind === "audioinput") {
        audioInputEl.appendChild(option);
      } else if (device.kind === "audiooutput") {
        audioOutputEl.appendChild(option);
      } else if (device.kind === "videoinput") {
        videoInputEl.appendChild(option);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//=========================================================================================//

//=========================================================================================//
const changeVideoInput = async (e) => {
  console.log("Sanity check for changeVideoInput function");
  //--------------------------------------------------------------------//
  // Changed video input
  const deviceId = e.target.value;

  const newContraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  //--------------------------------------------------------------------//

  //--------------------------------------------------------------------//
  try {
    const stream = await navigator.mediaDevices.getUserMedia(newContraints);

    // Cache the audio tracks
    const tracks = stream.getVideoTracks();
    console.log(tracks);
  } catch (error) {
    console.log(error);
  }
  //--------------------------------------------------------------------//
};
//=========================================================================================//

//=========================================================================================//
const changeAudioInput = async (e) => {
  console.log("Sanity check for changeAudioInput function");
  //--------------------------------------------------------------------//
  // Changed audio input
  const deviceId = e.target.value;

  const newContraints = {
    audio: { deviceId: { exact: deviceId } },
    video: true,
  };
  //--------------------------------------------------------------------//

  //--------------------------------------------------------------------//
  try {
    const stream = await navigator.mediaDevices.getUserMedia(newContraints);

    // Cache the audio tracks
    const tracks = stream.getAudioTracks();
    console.log(tracks);
  } catch (error) {
    console.log(error);
  }
  //--------------------------------------------------------------------//
};
//=========================================================================================//

//=========================================================================================//
const changeAudioOutput = async (e) => {
  // Use th cached videoEl element from the script.js file
  await videoEl.setSinkId(e.target.value);
  console.log(
    "Sanity check for changeAudioOutput function, changed audio device"
  );
};
//=========================================================================================//

//=========================================================================================//
getDevices();
//=========================================================================================//
