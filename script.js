const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const service = (formData.get("service") || "paslaugos").toString();
    const name = (formData.get("name") || "").toString();
    const phone = (formData.get("phone") || "").toString();
    const location = (formData.get("location") || "").toString();
    const message = (formData.get("message") || "").toString();

    const subject = encodeURIComponent(`Užklausa dėl ${service}`);
    const body = encodeURIComponent(
      [
        `Paslauga: ${service}`,
        `Vardas: ${name}`,
        `Telefonas: ${phone}`,
        `Lokacija: ${location}`,
        "",
        "Užklausos informacija:",
        message
      ].join("\n")
    );

    window.location.href = `mailto:trinkeles.nr1@gmail.com?subject=${subject}&body=${body}`;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});
