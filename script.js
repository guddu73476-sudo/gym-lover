
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const backToTop = document.getElementById("backToTop");
  const joinForm = document.getElementById("joinForm");
  const formMessage = document.getElementById("formMessage");

  // Hide the loading screen
  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("hidden"), 400);
  });

  // Fallback in case the load event already happened
  if (document.readyState === "complete") {
    loader?.classList.add("hidden");
  }

  // Mobile navigation
  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Header effect and back-to-top button
  function handleScroll() {
    header.classList.toggle("scrolled", window.scrollY > 30);
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal sections as they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // Select a membership from its pricing card
  const planSelect = document.getElementById("plan");

  document.querySelectorAll("[data-plan]").forEach(button => {
    button.addEventListener("click", () => {
      planSelect.value = button.dataset.plan;
    });
  });

  // Contact form demonstration
  joinForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!joinForm.checkValidity()) {
      joinForm.reportValidity();
      return;
    }

    const name = document.getElementById("name").value.trim();

    formMessage.textContent =
      `Thanks, ${name}! Your form looks good. This demo does not send your enquiry yet.`;

    formMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });

  // Automatic footer year
  document.getElementById("year").textContent =
    new Date().getFullYear();
});
