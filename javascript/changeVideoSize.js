// console.log(`//======== THE changeVideoSize FILE IS CONNECTED =======//`);

// const supportedConstrants = navigator.mediaDevices.getSupportedConstraints();

// console.log(supportedConstrants);

const changeVideoSize = () => {
  // console.log(stream);
  stream.getVideoTracks().forEach((track) => {
    const capabilities = track.getCapabilities();
    // Cache the video width input value
    const width = document.getElementById("vid-width");
    // Cache the video height input value
    const height = document.getElementById("vid-height");
    // Track for video track
    // We can get the capabilities from the getCapabilities()
    // or we can apply new constraints with applyConstraints()
    const videoConstraints = {
      height: {
        exact:
          height < capabilities.height.max ? height : capabilities.height.max,
      },
      width: {
        exact: width < capabilities.width.max ? width : capabilities.width.max,
      },
      // frameRate: 5,
    };
    track.applyConstraints(videoConstraints);
  });
  // stream.getTracks().forEach((track) => {
  //   const capabilities = track.getCapabilities();
  //   console.log(capabilities);
  // });
};
