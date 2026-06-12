const audio = document.getElementById("audioBook");
const playButton = document.getElementById("playButton");
const logo = document.getElementById("logo");

window.addEventListener("load", function () {
  audio.play()
    .then(() => {
      logo.classList.add("playing");
      playButton.style.display = "none";
    })
    .catch(() => {
      playButton.style.display = "block";
    });
});

playButton.addEventListener("click", function () {
  audio.play();
  logo.classList.add("playing");
  playButton.style.display = "none";
});

audio.addEventListener("pause", function () {
  logo.classList.remove("playing");
  playButton.style.display = "block";
});

audio.addEventListener("ended", function () {
  logo.classList.remove("playing");
  playButton.style.display = "block";
});