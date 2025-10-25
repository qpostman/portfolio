// ====== MODAL ELEMENTS ======
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

let lastScrollY = 0;

// ====== OPEN MODAL ======
document.querySelectorAll('#graphics .grid .image-card')
  .forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      lastScrollY = window.scrollY;

      const full = card.dataset.full;
      const cap = card.dataset.caption || card.querySelector('.overlay h3')?.textContent;
      const link = card.dataset.link;

      modal.classList.add("open");
      modalImg.src = full;

      // Force layout reflow before showing caption
      void modal.offsetHeight;

      if (link && cap) {
        captionText.innerHTML = `
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="caption-link">
            ${cap}
          </a>
        `;
      } else {
        captionText.textContent = cap || "";
      }

      requestAnimationFrame(() => modal.classList.add("show"));
      document.body.style.overflow = "hidden";
    });
  });

// ====== CLOSE MODAL ======
function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.classList.remove("open");
    modalImg.src = "";
    captionText.innerHTML = "";
    document.body.style.overflow = "";
    window.scrollTo({ top: lastScrollY, behavior: "instant" });
  }, 250);
}

// ====== EVENT LISTENERS ======
closeBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === "Escape") closeModal();
});
