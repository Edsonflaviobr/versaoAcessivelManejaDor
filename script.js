const audio = document.getElementById("audioBook");
const playButton = document.getElementById("playButton");
const logo = document.getElementById("logo");

/* ==========================
   MENSAGEM DE BOAS-VINDAS
========================== */

window.addEventListener("load", () => {

  const boasVindas = new SpeechSynthesisUtterance(
    "Bem-vindo à versão acessível do e Maneja Dor. Toque em iniciar audiobook para ouvir o conteúdo."
  );

  boasVindas.lang = "pt-BR";
  boasVindas.rate = 1;

  speechSynthesis.speak(boasVindas);

  audio.play()
    .then(() => {
      logo.classList.add("playing");
      playButton.style.display = "none";
    })
    .catch(() => {
      playButton.style.display = "block";
    });

});

/* ==========================
   BOTÃO INICIAR
========================== */

playButton.addEventListener("click", function () {

  speechSynthesis.cancel();

  audio.play();

  logo.classList.add("playing");
  playButton.style.display = "none";
});

/* ==========================
   CONTROLE VISUAL DO LOGO
========================== */

audio.addEventListener("play", function () {
  logo.classList.add("playing");
});

audio.addEventListener("pause", function () {
  logo.classList.remove("playing");
  playButton.style.display = "block";
});

audio.addEventListener("ended", function () {
  logo.classList.remove("playing");
  playButton.style.display = "block";
});

/* ==========================
   LEITOR DE BOTÕES E LINKS
========================== */

function lerTexto() {

  if (!audio.paused) return;

  const texto =
    this.getAttribute("aria-label") ||
    this.innerText.trim();

  if (!texto) return;

  speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1;
  fala.volume = 1;

  speechSynthesis.speak(fala);
}

document.querySelectorAll("button, a, [onclick]").forEach(elemento => {

  elemento.addEventListener("mouseenter", lerTexto);

  elemento.addEventListener("focus", lerTexto);

  elemento.addEventListener("touchstart", lerTexto);

});