/**
 * Comportamento do site — menu mobile, header no scroll, animações
 * discretas e preenchimento das seções a partir de js/data.js.
 */

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileNav();
    initReveal();
    initWhatsAppLinks();
    initDirections();
    initServicos();
    initFaq();
    initFooterYear();
  });

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    var toggle = document.getElementById("menu-toggle");
    var closeBtn = document.getElementById("mobile-nav-close");
    var nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    function open() {
      nav.classList.add("is-open");
      nav.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var firstLink = nav.querySelector("a");
      if (firstLink) firstLink.focus();
    }

    function close() {
      nav.classList.remove("is-open");
      nav.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      toggle.focus();
    }

    toggle.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) close();
    });
  }

  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((el) => {
      observer.observe(el);
    });
  }

  function initWhatsAppLinks() {
    if (typeof CLINICA_DATA === "undefined") return;
    var mensagem = encodeURIComponent(
      "Olá! Gostaria de agendar uma consulta na Colp Odontologia Especializada.",
    );
    var link = CLINICA_DATA.negocio.whatsappLink + "?text=" + mensagem;

    [
      "cta-header",
      "cta-hero",
      "cta-mobile-nav",
      "cta-servicos",
      "cta-final",
      "footer-whatsapp",
      "local-whatsapp",
      "local-whatsapp-2",
      "mobile-bar-whatsapp",
      "mobile-bar-agendar",
    ].forEach((id) => {
      var el = document.getElementById(id);
      if (el) el.href = link;
    });
  }

  function initDirections() {
    if (typeof CLINICA_DATA === "undefined") return;
    var e = CLINICA_DATA.negocio.endereco;
    var destino = encodeURIComponent(e.linha1 + ", " + e.linha2 + ", " + e.linha3);
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + destino;
    var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + destino;

    var como = document.getElementById("cta-como-chegar");
    if (como) como.href = url;
    var maps = document.getElementById("footer-maps");
    if (maps) maps.href = mapsUrl;
  }

  function initServicos() {
    if (typeof CLINICA_DATA === "undefined") return;
    var list = document.getElementById("servicos-list");
    if (!list) return;

    list.innerHTML = CLINICA_DATA.servicos
      .map(
        (s, i) =>
          '<div class="servico-row">' +
          '<span class="servico-row__index">' +
          String(i + 1).padStart(2, "0") +
          "</span>" +
          '<span class="servico-row__nome">' +
          s.nome +
          "</span>" +
          "</div>",
      )
      .join("");
  }

  function initFaq() {
    if (typeof CLINICA_DATA === "undefined") return;
    var list = document.getElementById("faq-list");
    if (!list) return;

    list.innerHTML = CLINICA_DATA.faq
      .map(
        (item) =>
          '<div class="faq-item"><dt>' +
          item.pergunta +
          "</dt><dd>" +
          item.resposta +
          "</dd></div>",
      )
      .join("");
  }

  function initFooterYear() {
    var el = document.getElementById("ano-atual");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
