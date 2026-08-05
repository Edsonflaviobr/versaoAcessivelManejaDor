const audio = document.getElementById("audioBook");
const playButton = document.getElementById("playButton");
const logo = document.getElementById("logo");

/* O audiobook nunca deve iniciar automaticamente. */
audio.pause();
audio.currentTime = 0;

/* Orientação acessível do botão de início. */
function orientarInicio() {
  if (!audio.paused) return;

  speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(
    "Clique aqui para iniciar o audiobook."
  );

  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1;
  fala.volume = 1;

  speechSynthesis.speak(fala);
}

playButton.addEventListener("mouseenter", orientarInicio);
playButton.addEventListener("focus", orientarInicio);
playButton.addEventListener("touchstart", orientarInicio, { passive: true });

/* Inicia apenas depois da ação do usuário. */
playButton.addEventListener("click", async function () {
  speechSynthesis.cancel();

  try {
    await audio.play();
    logo.classList.add("playing");
    playButton.style.display = "none";
  } catch (erro) {
    playButton.style.display = "block";
    console.error("Não foi possível iniciar o audiobook.", erro);
  }
});

/* Controle visual do logo. */
audio.addEventListener("play", function () {
  speechSynthesis.cancel();
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
