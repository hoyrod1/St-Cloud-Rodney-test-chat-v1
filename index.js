fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const socketIo = require("socket.io");
const path = require("path");
const { connected } = require("process");
const port = 3000;
app.use(express.static(path.join(__dirname)));
//=======================================================================================//

//=======================================================================================//
// We need a key and cert to run the browser on "https"
// We install mkcert using "npm sudo install -g mkcert" in the command line on a Mac
// Then "mkcert create-ca" ca.key and ca.cert
// Then "mkcert create-cert" to create cert.key cert.crt
// fs.readFileSync reads files with the "cert.key" and the "cert.crt"
const key = fs.readFileSync("cert.key");
const cert = fs.readFileSync("cert.crt");

// "express" setup was changed so we could us "https"
// Pass the key and cert to "https.createServer"
const expressServer = https.createServer({ key, cert }, app);

// Create the socket.io server which will listen on our "expressServer" port "3000".
const io = socketIo(expressServer);
//=======================================================================================//

//=======================================================================================//
expressServer.listen(port, () => {
  console.log(`Sanity Check For Port number ${port}`);
});
//=======================================================================================//

//=======================================================================================//
// Offers object contains
// "offerUserName", "offer" and "offerIceCandidate"
// "answerUserName", "answer" and "answerIceCandidate"
const offers = [];
//---------------------------------------------------------------------------------------//
const connectedSockets = [
  // username, socketId
];
//---------------------------------------------------------------------------------------//
io.on("connection", (socket) => {
  //--------------------------------------------------------------------------------------//
  // console.log("Testing if someone has connected");
  const userName = socket.handshake.auth.userName;
  const password = socket.handshake.auth.password;
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  if (password !== "1973") {
    socket.disconnect(true);
    return;
  }
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  connectedSockets.push({
    socketId: socket.id,
    userName,
  });
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  // When a new client has joined
  // If there are any "offers" available send/emit them out.
  if (offers.length) {
    socket.emit("availableOffers", offers);
  }
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  socket.on("newOffer", (newOffer) => {
    offers.push({
      offerUserName: userName,
      offer: newOffer,
      offerIceCandidates: [],
      answerUserName: null,
      answer: null,
      answererIceCandidates: [],
    });
    // console.log(newOffer.sdp.slice(50));
    // Send out to all connected sockets EXCEPTS the caller
    socket.broadcast.emit("newOfferAwaiting", offers.slice(-1));
  });
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  socket.on("newAnswer", (offerObj, ackFunction) => {
    // console.log(offerObj);
    console.log(ackFunction);
    // emit the "offerObj" object back to CLIENT1 using CLIENT1 socketid
    const socketToAnswer = connectedSockets.find(
      (socket) => socket.userName === offerObj.offerUserName
    );
    if (!socketToAnswer) {
      console.log("No matching socket");
      return;
    }
    // if matching socket found we can emit to it.
    const socketIdToAnswer = socketToAnswer.socketId;
    // Find the offer to update so we can emit to it
    const offerToUpdate = offers.find(
      (o) => o.offerUserName === offerObj.offerUserName
    );
    if (!offerToUpdate) {
      console.log("No offerToUpdate");
      return;
    }

    // ackFunction sends back all the iceCandidates already collected
    ackFunction(offerToUpdate.offerIceCandidates);
    offerToUpdate.answer = offerObj.answer;
    offerToUpdate.answerUserName = userName;

    // socket has a .to() method which allows emiting to a "room"
    // every socket has it's own room
    socket.to(socketIdToAnswer).emit("answerResponse", offerToUpdate);
  });
  //--------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  // Send out to all connected sockets EXCEPTS the caller
  socket.on("sendIceCandidateToSignalingServer", (iceCandidateObj) => {
    const { didIOffer, iceUserName, iceCandidate } = iceCandidateObj;
    // console.log(iceCandidateObj);
    if (didIOffer) {
      const offerInOffers = offers.find((o) => o.offerUserName === iceUserName);
      if (offerInOffers) {
        // this ice is coming from the offerer, send it to the answerer
        offerInOffers.offerIceCandidates.push(iceCandidate);
        // 1. When the answerer answers, all the existing candidates are sent
        // 2. Any candidates that come in after the offer has been answered, will be passed through
        if (offerInOffers.answerUserName) {
          // pass it through to the other sockets
          const socketToSendTo = connectedSockets.find(
            (socket) => socket.userName === offerInOffers.answerUserName
          );
          if (socketToSendTo) {
            socket
              .to(socketToSendTo.socketId)
              .emit("receivedIceCandidateFromServer", iceCandidate);
          } else {
            console.log("Ice Candidate received but could not find answerer");
          }
        }
        // If the answer is already here, emit the iceCandidates to the user
      }
    } else {
      const offerInOffers = offers.find(
        (offer) => offer.answerUserName === iceUserName
      );
      // this ice is coming from the answerer, send it to the offerer
      // pass it through to the other sockets
      const socketToSendTo = connectedSockets.find(
        (socket) => socket.userName === offerInOffers.offerUserName
      );
      if (socketToSendTo) {
        socket
          .to(socketToSendTo.socketId)
          .emit("receivedIceCandidateFromServer", iceCandidate);
      } else {
        console.log("Ice Candidate received but could not find offerer");
      }
    }
    // console.log(offers);
  });
  //--------------------------------------------------------------------------------------//
});
//=======================================================================================//
