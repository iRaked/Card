document.addEventListener("DOMContentLoaded", () => {
  const cubos = document.querySelectorAll(".cubo, .cubo-s11, .cubo-s11b");
  if (!cubos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.40,
    rootMargin: "0px 0px -20% 0px"
  });

  cubos.forEach(cubo => observer.observe(cubo));
});

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

  actualizar();
  setInterval(actualizar, 1000);
}

// 🧭 Desplazamiento suave a secciones
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 🚪 Activación de la Card + temporizador + audio
document.addEventListener("DOMContentLoaded", () => {
  const botonEntrada = document.getElementById("activarSmartCard");
  const entradaCard = document.querySelector(".entrada-card");
  const smartCard = document.querySelector(".smart-card");
  const audio = document.getElementById("musica-fondo");

  // ⏳ Fecha del evento: sábado 24 agosto 2030 a las 14:00
  const fechaEvento = new Date("2030-08-24T14:00:00").getTime();
  iniciarTemporizador(fechaEvento);

  if (botonEntrada && entradaCard && smartCard) {
    botonEntrada.addEventListener("click", () => {
      entradaCard.style.display = "none";
      entradaCard.style.setProperty("display", "none", "important");
      entradaCard.style.visibility = "hidden";
      entradaCard.style.opacity = "0";
      smartCard.classList.add("activa");

      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(() => {
          console.log("🔇 Autoplay bloqueado. Se requiere interacción directa.");
        });
      }
    });
  }
});
