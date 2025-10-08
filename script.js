// ⛔ Bloqueo del menú contextual
document.addEventListener("contextmenu", e => e.preventDefault());

// 🧭 Desplazamiento suave a secciones reales
function scrollToSection(id) {
  const mapa = {
    intro: "s1",
    photo: "s2",
    "temporizador-section": "s3",
    invitacion: "s4",
    location: "s5"
  };
  const targetId = mapa[id] || id;
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ⏳ Temporizador hacia la fecha del evento
function iniciarTemporizador(fechaEvento) {
  const contenedor = document.getElementById("temporizador");
  if (!contenedor) return;

  function actualizar() {
    const ahora = Date.now();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) {
      contenedor.innerHTML = "¡Ha llegado el gran día!";
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    contenedor.innerHTML = `Faltan ${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  actualizar();
  setInterval(actualizar, 1000);
}

// 🔊 AutoPlay en primer clic
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("musica-fondo");
  if (!audio) return;

  const activarAudio = () => {
    audio.volume = 0.5;
    audio.play().catch(() => {
      console.log("Autoplay bloqueado. Se requiere interacción directa.");
    });

    document.removeEventListener("click", activarAudio);
  };

  document.addEventListener("click", activarAudio);
});

// 🚪 Entrada móvil + activación de Smart Card y audio
document.addEventListener("DOMContentLoaded", () => {
  const botonEntrada = document.getElementById("activarSmartCard");
  const entrada = document.querySelector(".entrada-card");
  const smartCard = document.querySelector(".smart-card");
  const audio = document.getElementById("musica-fondo");

  if (!botonEntrada || !entrada || !smartCard) return;

  botonEntrada.addEventListener("click", () => {
    entrada.style.display = "none";
    entrada.style.visibility = "hidden";
    entrada.style.opacity = "0";
    smartCard.classList.add("activa");

    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {
        console.log("🔇 Autoplay bloqueado. Se requiere interacción directa.");
      });
    }
  });
});

// 🧊 Activación de cubos redondeados (S5)
document.addEventListener("DOMContentLoaded", () => {
  const cubos = document.querySelectorAll(".rounded-cube");
  if (!cubos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  }, {
    threshold: 0.45,
    rootMargin: "0px 0px -20% 0px"
  });

  cubos.forEach(cubo => observer.observe(cubo));
});

// 🎈 Animación de burbujas en canvas (si se incluye)
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("burbujas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let burbujas = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 8 + 2,
    d: Math.random() * 1 + 0.5
  }));

  function dibujarBurbujas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";

    burbujas.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      b.y -= b.d;

      if (b.y < -10) {
        b.y = canvas.height + 10;
        b.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(dibujarBurbujas);
  }

  dibujarBurbujas();

  iniciarTemporizador(new Date("2030-08-17T17:00:00").getTime());
});
