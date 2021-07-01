import helpers from "./helpers.js";

window.addEventListener("load", () => {
  //When the 'Create room" is button is clicked
  document.getElementById("create-room").addEventListener("click", (e) => {
    e.preventDefault();

    //remove error message, if any
    document.querySelector("#err-msg").innerHTML = "";

    //create room link
    let roomLink = `${location.origin}?room=${helpers.generateRandomString()}`;
    document.getElementById("join-room").setAttribute("href", roomLink);
    document.getElementById("create-room").setAttribute("hidden", true);

    //show message with link to room
    document.querySelector(
      "#room-created"
    ).innerHTML = `Room successfully created. Click Join Room.`;
  });

  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("expand-remote-video")) {
      helpers.maximiseStream(e);
    } else if (e.target && e.target.classList.contains("mute-remote-mic")) {
      helpers.singleStreamToggleMute(e);
    }
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    helpers.toggleModal("recording-options-modal", false);
  });
});
