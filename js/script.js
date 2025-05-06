// Configuração inicial
const body = document.body;
const toggleBtn = document.getElementById("toggle-theme");
const btnTopo = document.getElementById("btnTopo");
const menuToggle = document.getElementById('menuToggle');
const menuMobile = document.getElementById('menuMobile');
const preloader = document.getElementById('preloader');
const typingElement = document.getElementById('typing');

// Sons
const sons = {
  click1: new Audio("/sounds/click.wav"),
  click2: new Audio("/sounds/click2.mp3"),
  click3: new Audio("/sounds/click3.wav"),
  click4: new Audio("/sounds/fingerclick.wav"),
};

// Inicialização do tema
if (localStorage.getItem("tema") === "escuro" || !localStorage.getItem("tema")) {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️ Modo Claro";
}

// Event Listeners
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const darkMode = body.classList.contains("dark");
  toggleBtn.textContent = darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  localStorage.setItem("tema", darkMode ? "escuro" : "claro");
});

// Botão Voltar ao Topo
window.addEventListener("scroll", () => {
  btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Menu Mobile
const menuLinks = menuMobile.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
  menuMobile.classList.toggle('active');
  document.body.style.overflow = menuMobile.classList.contains('active') ? 'hidden' : '';
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuMobile.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (menuMobile.classList.contains('active') && !menuMobile.contains(e.target) && !menuToggle.contains(e.target)) {
    menuMobile.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Progress Bar
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const parallaxSections = document.querySelectorAll('.parallax-section');
  parallaxSections.forEach(section => {
    const speed = 0.5;
    const rect = section.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const bg = section.querySelector('.parallax-bg');
      if (bg) {
        bg.style.transform = `translateY(${scrolled * speed}px)`;
      }
    }
  });
});

// Fade In Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// Efeito de Digitação
const text = "Wesley de Albuquerque Filgueiras";
let typingIndex = 0;

function typeWriter() {
  if (typingIndex < text.length) {
    typingElement.innerHTML += text.charAt(typingIndex);
    typingIndex++;
    setTimeout(typeWriter, 80);
  }
}

// Botões de Som
const botoesSom = document.querySelectorAll(".botao-som");
botoesSom.forEach((botao) => {
  botao.addEventListener("click", () => {
    const somNome = botao.dataset.som;
    if (sons[somNome]) {
      sons[somNome].currentTime = 0;
      sons[somNome].play();
    }
  });
});

// Inicialização
window.addEventListener("load", () => {
  // Esconder preloader
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
  
  // Iniciar efeito de digitação
  typeWriter();
});