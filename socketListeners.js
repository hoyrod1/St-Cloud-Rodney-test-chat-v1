console.log(`======= Sanity Check socketListeners.js =======`);
//=======================================================================================//
// Once connected get all available offers and then call the createOfferElement function
socket.on("availableOffers", (offers) => {
  console.log(offers);
  createOfferElement(offers);
});
//=======================================================================================//

//=======================================================================================//
// Once someone has made a new offer, call the createOfferElement function
socket.on("newOfferAwaiting", (offers) => {
  createOfferElement(offers);
});
//=======================================================================================//

//=======================================================================================//
function createOfferElement(offers) {
  const answerButton = document.getElementById("answer");

  offers.forEach((o) => {
    console.log(o);
    const newOfferElement = document.createElement("div");
    newOfferElement.innerHTML = `<button class="btn btn-success col-1">${o.offerUserName}</button>`;
    newOfferElement.addEventListener("click", (e) => {
      answerOffer(o);
    });
    answerButton.appendChild(newOfferElement);
  });
}
//=======================================================================================//
