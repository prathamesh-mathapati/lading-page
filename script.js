document.addEventListener("DOMContentLoaded", () => {
  const cols = document.querySelectorAll(".gallery-col");
  const speed = 1.5;
  const pauseDuration = 1000;

  let y = 0;
  let paused = false;
  let startY = 0;
  let dragging = false;

  const getY = e => (e.touches ? e.touches[0].clientY : e.clientY);

  const update = () =>
    cols.forEach(c => (c.style.transform = `translateY(-${y}px)`));

  cols.forEach(col => {
    col.addEventListener("mouseenter", () => paused = true);
    col.addEventListener("mouseleave", () => paused = false);

    col.addEventListener("mousedown", e => {
      paused = true;
      dragging = true;
      startY = getY(e);
    });

    col.addEventListener("touchstart", e => {
      paused = true;
      dragging = true;
      startY = getY(e);
    }, { passive: true });
  });

  window.addEventListener("mousemove", e => {
    if (!dragging) return;
    y += startY - getY(e);
    startY = getY(e);
    update();
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    paused = false;
  });

  window.addEventListener("touchmove", e => {
    if (!dragging) return;
    y += startY - getY(e);
    startY = getY(e);
    update();
  }, { passive: true });

  window.addEventListener("touchend", () => {
    dragging = false;
    paused = false;
  });

  function animate() {
    if (!paused) {
      y += speed;
      update();

      if (y >= cols[0].scrollHeight / 2) {
        paused = true;
        setTimeout(() => {
          y = 0;
          update();
          paused = false;
        }, pauseDuration);
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".visit-track");
  const cards = document.querySelectorAll(".visit-card");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const dotsWrap = document.querySelector(".dots");

  if (!track || !cards.length) return;

  let i = 0;
  let w = cards[0].offsetWidth + 32;
  let autoplayInterval;

  cards.forEach((_, idx) => {
    const d = document.createElement("span");
    d.className = "dot" + (idx === 0 ? " active" : "");
    d.onclick = () => {
      move(idx);
      resetAutoplay();
    };
    dotsWrap.appendChild(d);
  });

  const dots = document.querySelectorAll(".dot");

  function move(n) {
    i = n;
    track.style.transform = `translateX(-${i * w}px)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[i].classList.add("active");
  }

  function nextSlide() {
    i = i < cards.length - 1 ? i + 1 : 0; // loop
    move(i);
  }

  // Controls
  next.onclick = () => {
    nextSlide();
    resetAutoplay();
  };

  prev.onclick = () => {
    i = i > 0 ? i - 1 : cards.length - 1;
    move(i);
    resetAutoplay();
  };

  // Auto-play
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000); 
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  window.onresize = () => {
    w = cards[0].offsetWidth + 32;
    move(i);
  };
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
}, { threshold: 0.15 });

document.querySelectorAll(".card, .visit-card, .trust-stat")
  .forEach(el => {
    el.classList.add("fade-up");
    observer.observe(el);
  });
