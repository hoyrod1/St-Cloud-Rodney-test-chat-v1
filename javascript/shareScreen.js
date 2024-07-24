console.log(`//======== THE shareScreen FILE IS CONNECTED =======//`);

//=========================================================================================//
const shareScreen = async () => {
  console.log(`Share screen button works sanity check`);

  //--------------------------------------------------------------------------------------//
  const options = {
    video: true,
    audio: false,
    surfaceSwitching: "include",
  };
  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
  } catch (error) {
    console.log(error);
  }
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  // We don't handle all button paths
  // To accomplish this task you will have to check the DOM or use a UI framework
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "green",
    "green",
  ]);
  //--------------------------------------------------------------------------------------//
};
