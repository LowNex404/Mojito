const btn = document.getElementById("customBtn");
const img = btn.querySelector("img");

let isIce = false;

function updateImage(isHover = false) {
  if (isIce) {
    img.src = isHover ? "assets/icons/ice2.png" : "assets/icons/ice1.png";
  } else {
    img.src = isHover ? "assets/icons/lemon2.png" : "assets/icons/lemon1.png";
  }
}

btn.addEventListener("mouseenter", () => updateImage(true));
btn.addEventListener("mouseleave", () => updateImage(false));

const container = document.querySelector(".container");
const objects = [];
let mouseX = 0;
let mouseY = 0;

function createFallingObject(type) {
  const el = document.createElement("img");
  el.classList.add("falling-object");
  el.src = type === "ice" ? "assets/sprites/ice.png" : "assets/sprites/lemon.png";

  const x = Math.random() * window.innerWidth;
  const y = -50;
  const scale = 1 + Math.random() * 2; // tamanho aleatório entre 1 e 3 (maior escala)

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.width = `${100 * scale}px`; // tamanho maior
  el.style.height = "auto"; // mantém proporção
  el.style.transform = `translate(${x}px, ${y}px)`;

  const obj = {
    el,
    x,
    y,
    vy: 0,
    type,
  };

  container.appendChild(el);
  objects.push(obj);
}

function animate() {
  for (let obj of objects) {
    obj.vy += 0.5;
    obj.y += obj.vy;

    const maxY = window.innerHeight - 50;
    if (obj.y > maxY) {
      obj.y = maxY;
      obj.vy *= -0.3;
    }

    const dx = obj.x - mouseX;
    const dy = obj.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      const angle = Math.atan2(dy, dx);
      const force = (100 - dist) * 0.1;
      obj.x += Math.cos(angle) * force;
      obj.y += Math.sin(angle) * force;
    }

    obj.el.style.transform = `translate(${obj.x}px, ${obj.y}px)`;
  }

  requestAnimationFrame(animate);
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// 🔄 Ao clicar, cria o objeto e troca o tipo corretamente
btn.addEventListener("click", () => {
  // Solta o tipo correspondente ao estado atual de isIce
  createFallingObject(isIce ? "ice" : "lemon");
  
  // Depois, alterna o estado de isIce
  isIce = !isIce;
  updateImage();
});

animate();
