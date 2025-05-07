// Configuração inicial
const body = document.body;
const toggleThemeBtn = document.getElementById('toggle-theme');

// Inicialização do tema
if (localStorage.getItem('tema') === 'claro') {
  body.classList.remove('dark');
} else {
  body.classList.add('dark');
}

toggleThemeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const darkMode = body.classList.contains('dark');
  localStorage.setItem('tema', darkMode ? 'escuro' : 'claro');
});

// const btnTopo = document.getElementById("btnTopo"); // REMOVIDO
// const menuToggle = document.getElementById('menuToggle'); // REMOVIDO
// const menuMobile = document.getElementById('menuMobile'); // REMOVIDO
// const menuLinks = menuMobile.querySelectorAll('a'); // REMOVIDO
const preloader = document.getElementById('preloader');
const typingElement = document.getElementById('typing');

// Sons
const sons = {
  click1: new Audio("/sounds/click.wav"),
  click2: new Audio("/sounds/click2.mp3"),
  click3: new Audio("/sounds/click3.wav"),
  click4: new Audio("/sounds/fingerclick.wav"),
};

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

// Fade In Animation melhorado para múltiplas animações
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

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .zoom-in').forEach(element => {
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

document.addEventListener('DOMContentLoaded', function () {
  const projetos = document.querySelectorAll('.projeto');
  projetos.forEach((projeto, i) => {
    if (i % 2 === 0) {
      projeto.classList.add('slide-in-right');
    } else {
      projeto.classList.add('slide-in-left');
    }
  });

  function handleProjectAnimations() {
    const windowHeight = window.innerHeight;
    projetos.forEach((projeto, i) => {
      const rect = projeto.getBoundingClientRect();
      const isVisible = rect.top < windowHeight - 60 && rect.bottom > 60;
      const isLeft = projeto.classList.contains('slide-in-left');
      const isRight = projeto.classList.contains('slide-in-right');

      if (isVisible) {
        projeto.classList.add('slide-in-visible');
        projeto.classList.remove('slide-out-left', 'slide-out-right');
      } else {
        projeto.classList.remove('slide-in-visible');
        if (rect.top >= windowHeight) {
          // Indo para baixo, sai para o lado de entrada
          if (isRight) {
            projeto.classList.add('slide-out-right');
            projeto.classList.remove('slide-out-left');
          } else if (isLeft) {
            projeto.classList.add('slide-out-left');
            projeto.classList.remove('slide-out-right');
          }
        } else if (rect.bottom <= 0) {
          // Indo para cima, sai para o lado de entrada
          if (isRight) {
            projeto.classList.add('slide-out-right');
            projeto.classList.remove('slide-out-left');
          } else if (isLeft) {
            projeto.classList.add('slide-out-left');
            projeto.classList.remove('slide-out-right');
          }
        }
      }
    });
  }

  window.addEventListener('scroll', handleProjectAnimations);
  handleProjectAnimations(); // Para ativar ao carregar
});

// Botão Voltar ao Topo
const btnTopo = document.getElementById("btnTopo");
window.addEventListener("scroll", () => {
  btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
});
btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Seta da apresentação rola para a próxima seção
const seta = document.querySelector('.apresentacao-seta');
if (seta) {
  seta.addEventListener('click', () => {
    const nextSection = document.querySelector('section:not(#apresentacao)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}