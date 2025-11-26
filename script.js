document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  const cards = document.querySelectorAll(".image-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const fullSrc = card.dataset.full || card.querySelector("img")?.src;
      const text = card.dataset.caption || "";
      const link = card.dataset.link || "";

      const inInstagram = card.closest("#instagram") !== null;
      const inGraphics = card.closest("#graphics") !== null;

      // Set modal image
      modalImg.src = fullSrc;

      // ==========================
      // INSTAGRAM — only button
      // ==========================
      if (inInstagram) {
        caption.innerHTML = link
          ? `<a href="${link}" target="_blank" class="caption-link">View on Instagram </a>`
          : "";
        modal.classList.add("open");
        return;
      }

      // ==========================
      // GRAPHIC PITCHES — caption IS the link (NO extra text)
      // ==========================
      if (inGraphics) {
        caption.innerHTML = link
          ? `<a href="${link}" target="_blank" class="caption-link">${text}</a>`
          : text;
        modal.classList.add("open");
        return;
      }

      // ==========================
      // DEFAULT — writing or others
      // (show caption only; link optional)
      // ==========================
      if (link) {
        caption.innerHTML = `
          ${text}
          <br>
          <a href="${link}" target="_blank" class="caption-link">${link}</a>
        `;
      } else {
        caption.textContent = text;
      }

      modal.classList.add("open");
    });
  });

  // Close button
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  // Click outside closes modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  // ESC closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.remove("open");
  });
});
