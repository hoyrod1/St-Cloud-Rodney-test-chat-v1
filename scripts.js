console.log(`======= Sanity Check script.js =======`);
//=======================================================================================//
// Creates peerConfiguration with ICE server properties and of an array of stun servers
let peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};
//=======================================================================================//

//=======================================================================================//
// Local variables declared
let localStream; // variable to hold the local video stream
let remoteStream; // variable to hold the remote video stream
let peerConnection; // the peerConnection that the two clients use to talk
let didIOffer = false;
//=======================================================================================//

//=======================================================================================//
const userName = "HotRod-" + Math.floor(Math.random() * 100000);
const password = "1973";
document.getElementById("user-name").innerHTML = userName;
//=======================================================================================//

//=======================================================================================//
// Cache the video with the id with "local-video"
const localVideoEl = document.getElementById("local-video");
// Cache the video with the id with "remote-video"
const remoteVideoEl = document.getElementById("remote-video");
//=======================================================================================//

//=======================================================================================//
const socket = io.connect("https://localhost:3000/", {
  auth: {
    userName,
    password,
  },
});
//=======================================================================================//

//=======================================================================================//
// Async function runs when inbound client intiates a call
const call = async (e) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    //audio: true,
  });
  localVideoEl.srcObject = stream;

  localStream = stream;

  // peerConnection is set and sends our STUN server
  await createPeerConnection();

  // createOffer sets up the SDP offer
  try {
    console.log(`Creating offer...`);
    const offer = await peerConnection.createOffer();
    // console.log(offer);
    didIOffer = true;
    peerConnection.setLocalDescription(offer);
    // This emits/sends the "offer" to the signaling server
    socket.emit("newOffer", offer);
  } catch (error) {
    console.log(error);
  }
};
//=======================================================================================//

//=======================================================================================//
// Instatiate a new RTCPeerConnection
const createPeerConnection = () => {
  return new Promise(async (resolve, reject) => {
    // RTCPeerConnection is the thing that creates the connection
    // The peerConfiguration object is passed as an argument with an array of stun servers
    // This will fetch us ICE candidates
    peerConnection = await new RTCPeerConnection(peerConfiguration);

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.addEventListener("icecandidate", (e) => {
      console.log(`........ICE candidate found!`);
      // console.log(e);
      // If there is an "ïceCandidate" emit/send "ïceCandidate" to the signaling server
      if (e.candidate) {
        socket.emit("sendIceCandidateToSignalingServer", {
          iceCandidate: e.candidate,
          iceUserName: userName,
          didIOffer,
        });
      }
    });
    resolve();
  });
};
//=======================================================================================//

//=======================================================================================//
// Cache the button with the if with "call"
const callButton = document.getElementById("call");
// Listen for click event to run the call() async function on line 22
callButton.addEventListener("click", call);
//=======================================================================================//
