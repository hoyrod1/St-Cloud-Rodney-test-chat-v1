fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const socketIo = require("socket.io");
const path = require("path");
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
io.on("connection", (socket) => {
  console.log("Testing if someone has connected");
});
//=======================================================================================//
