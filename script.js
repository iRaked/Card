document.addEventListener("DOMContentLoaded", () => {
  const cubo = document.querySelector(".cubo-redondeado");
  if (!cubo) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cubo.classList.add("visible");
        observer.unobserve(cubo); // solo una vez
      }
    });
  }, {
    threshold: 0.3 // activa cuando el 30% del cubo es visible
  });

  observer.observe(cubo);
});

// ⛔ Bloqueo del menú contextual
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// 🎈 Animación de burbujas en canvas
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('burbujas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // 🔁 Ajuste dinámico del tamaño del canvas según su contenedor real
  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 🎈 Generación inicial de burbujas
  let burbujas = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 8 + 2,       // radio entre 2 y 10px
    d: Math.random() * 1 + 0.5      // velocidad entre 0.5 y 1.5
  }));

  // 🖌️ Animación continua de burbujas
  function dibujarBurbujas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';

    burbujas.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      // Movimiento ascendente
      b.y -= b.d;

      // Si sale por arriba, reaparece abajo
      if (b.y < -10) {
        b.y = canvas.height + 10;
        b.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(dibujarBurbujas);
  }

  dibujarBurbujas();

  // ⏳ Inicializar temporizador cuando el DOM esté listo
  iniciarTemporizador(new Date("2030-08-17T17:00:00").getTime());
});

// 🧭 Desplazamiento suave a secciones
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ⏳ Temporizador hacia la fecha del evento
function iniciarTemporizador(fechaEvento) {
  const contenedor = document.getElementById("temporizador");
  if (!contenedor) return;

  function actualizar() {
    const ahora = new Date().getTime();
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

  actualizar(); // muestra el primer valor sin esperar
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
  const entrada = document.querySelector(".entrada-movil");
  const smartCard = document.querySelector(".smart-card");
  const audio = document.getElementById("musica-fondo");

  if (!botonEntrada || !entrada || !smartCard) return;

  botonEntrada.addEventListener("click", () => {
    console.log("✅ Botón 'Entrar' fue clickeado"); // ← Aquí validamos el clic

    entrada.style.display = "none";
    entrada.style.setProperty("display", "none", "important");
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
