const toggleBtn = document.getElementById("toggle-theme");

// Ativar modo escuro por padrão ou com base no localStorage
if (
  localStorage.getItem("tema") === "escuro" ||
  !localStorage.getItem("tema")
) {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Modo Claro";
}

// Alternar tema ao clicar
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");
  toggleBtn.textContent = darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  localStorage.setItem("tema", darkMode ? "escuro" : "claro");
});

const btnTopo = document.getElementById("btnTopo");

// Mostrar/esconder botão ao rolar
window.addEventListener("scroll", () => {
  btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
});

// Rolar para o topo suavemente ao clicar
btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Função para verificar quando as seções entram na tela
const fadeInSections = document.querySelectorAll(".fade-in");

const checkVisibility = () => {
  const windowHeight = window.innerHeight;

  fadeInSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < windowHeight - 150) {
      section.classList.add("visible");
    }
  });
};

// Verificar a visibilidade sempre que o usuário rolar a página
window.addEventListener("scroll", checkVisibility);
const texto = "Wesley de Albuquerque Filgueiras";
let i = 0;
const typingEl = document.getElementById("typing");

function digitar() {
  if (i < texto.length) {
    typingEl.textContent += texto.charAt(i);
    i++;
    setTimeout(digitar, 80);
  }
}
digitar();
// No final do script.js
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});
const botoesSom = document.querySelectorAll(".botao-som");

const sons = {
  click1: new Audio("/sounds/click.wav"),
  click2: new Audio("/sounds/click2.mp3"),
  click3: new Audio("/sounds/click3.wav"),
  click4: new Audio("/sounds/fingerclick.wav"),
};

botoesSom.forEach((botao) => {
  botao.addEventListener("click", () => {
    const somNome = botao.dataset.som; // Obtém o nome do som do atributo data-som
    if (sons[somNome]) {
      sons[somNome].currentTime = 0;
      sons[somNome].play();
    }
  });
});