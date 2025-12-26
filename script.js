// vratical scroll banner

document.addEventListener("DOMContentLoaded", () => {

  const columns = document.querySelectorAll(".gallery-col");
  const pauseDuration = 1000; // 1 second pause at end
  const speed = 1.5; // scroll speed (px per frame)

  let y = 0;
  let paused = false;

  function animate() {
    if (!paused) {
      y += speed;

      columns.forEach(col => {
        col.style.transform = `translateY(-${y}px)`;
      });

      // when half content scrolled → pause & reset
      if (y >= columns[0].scrollHeight / 2) {
        paused = true;

        setTimeout(() => {
          y = 0;
          columns.forEach(col => {
            col.style.transition = "none";
            col.style.transform = "translateY(0)";
          });

          // force reflow
          columns[0].offsetHeight;

          paused = false;
        }, pauseDuration);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});







document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".must-visit__track");
  const cards = document.querySelectorAll(".must-visit__card");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const dotsWrap = document.querySelector(".dots");

  if (!track || !cards.length) return;

  let index = 0;
  let cardWidth = cards[0].offsetWidth + 32;

  /* CREATE DOTS */
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => moveTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function moveTo(i) {
    index = i;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    if (index < cards.length - 1) moveTo(index + 1);
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) moveTo(index - 1);
  });

  window.addEventListener("resize", () => {
    cardWidth = cards[0].offsetWidth + 32;
    moveTo(index);
  });
});


const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(
  ".school-card, .must-visit__card, .trust-stat"
).forEach(el => {
  el.classList.add("fade-up");
  observer.observe(el);
});
