(() => {
  "use strict";
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [
    ...parent.querySelectorAll(selector),
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lenis = null;
  let animationContext = null;
  let currentPage = "";
  let requestText = "";
  let scrollFrame = 0;

  // Navigation and forms remain usable if either animation library is unavailable.
  function setupMotion() {
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
    if (!reducedMotion.matches && window.Lenis) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
      });
      if (window.ScrollTrigger)
        lenis.on("scroll", () => ScrollTrigger.update());
    }
  }
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  setupMotion();
  reducedMotion.addEventListener("change", () => {
    setupMotion();
    animatePage();
  });

  function animatePage() {
    if (animationContext) {
      animationContext.revert();
      animationContext = null;
    }
    if (!window.gsap || reducedMotion.matches) return;
    const page = $("#page-" + currentPage);
    animationContext = gsap.context(() => {
      if (currentPage === "home") {
        gsap.from(".hero-enter", {
          y: 19,
          opacity: 0,
          stagger: 0.075,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".hero-visual", {
          opacity: 0,
          y: 18,
          duration: 1.1,
          ease: "power3.out",
          clearProps: "all",
        });
      } else {
        gsap.from(".services-hero .section-heading", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "all",
        });
      }
      if (window.ScrollTrigger)
        $$(".reveal", page).forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
          });
        });
    }, page);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  const menu = $("#mobile-nav");
  const menuButton = $(".menu-toggle");
  function closeMenu() {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "فتح القائمة");
    document.body.classList.remove("menu-open");
    if (lenis) lenis.start();
  }
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "إغلاق القائمة" : "فتح القائمة",
    );
    document.body.classList.toggle("menu-open", open);
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      menuButton.focus();
    }
    if (event.key === "Tab" && !menu.hidden) {
      const items = [menuButton, ...$$("a", menu)];
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
        event.preventDefault();
        items[0].focus();
      }
    }
  });
  window
    .matchMedia("(min-width: 761px)")
    .addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });

  function scrollToTarget(target, immediate = false) {
    if (lenis)
      lenis.scrollTo(target || 0, { offset: target ? -110 : 0, immediate });
    else if (target)
      target.scrollIntoView({
        behavior: reducedMotion.matches || immediate ? "instant" : "smooth",
        block: "start",
      });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }
  const tabs = $$("[data-tab]");
  function selectTab(name, animate = false) {
    if (!["hvac", "fire", "engineering"].includes(name)) return;
    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      $("#panel-" + tab.dataset.tab).hidden = !selected;
    });
    if (animate && window.gsap && !reducedMotion.matches)
      gsap.fromTo(
        $("#panel-" + name),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, clearProps: "all", overwrite: true },
      );
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectTab(tab.dataset.tab, true);
      history.replaceState(null, "", "#services/" + tab.dataset.tab);
    });
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowLeft") next = (index + 1) % tabs.length;
      if (event.key === "ArrowRight")
        next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        tabs[next].focus();
        tabs[next].click();
      }
    });
  });
  function route(initial = false) {
    const [requestedPage, section] = location.hash.replace(/^#/, "").split("/");
    if (requestedPage === "main-content" && currentPage) {
      $("#main-content").focus();
      return;
    }
    const page = requestedPage === "services" ? "services" : "home";
    const changed = currentPage !== page;
    closeMenu();
    if (changed && animationContext) {
      animationContext.revert();
      animationContext = null;
    }
    currentPage = page;
    $("#page-home").hidden = page !== "home";
    $("#page-services").hidden = page !== "services";
    $$("[data-nav]").forEach((link) => {
      if (link.dataset.nav === page) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.title =
      page === "home"
        ? "التكييف المركزي ومكافحة الحريق | راحة تدوم وأمان لا يُساوَم"
        : "خدماتنا وطلب عرض سعر | التكييف المركزي ومكافحة الحريق";
    if (
      page === "services" &&
      ["hvac", "fire", "engineering"].includes(section)
    )
      selectTab(section);
    const validSection = page === "home" ? ["about", "process"] : ["contact"];
    const target = validSection.includes(section) ? $("#" + section) : null;
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      if (lenis) lenis.resize();
      scrollToTarget(target, initial || changed);
      if (changed || initial) animatePage();
      if (!initial && (changed || target)) {
        const focusTarget = target || $("#page-" + page + " h1");
        focusTarget.setAttribute("tabindex", "-1");
        focusTarget.focus({ preventScroll: true });
      }
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  }
  window.addEventListener("hashchange", () => route());
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    if (link.dataset.selectService) {
      $("#service-select").value = link.dataset.selectService;
      $("#form-result").hidden = true;
    }
    const href = link.getAttribute("href");
    if (href?.startsWith("#") && href === location.hash) {
      event.preventDefault();
      route();
    }
  });

  const form = $("#quote-form");
  form.addEventListener("input", () => {
    $("#form-result").hidden = true;
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = $("#full-name");
    nameInput.setCustomValidity(
      nameInput.value.trim().length < 2 ? "يرجى إدخال اسم صحيح." : "",
    );
    const rawPhone = $("#phone").value.trim();
    const digits = rawPhone
      .replace(/[٠-٩]/g, (c) => c.charCodeAt(0) - 1632)
      .replace(/[۰-۹]/g, (c) => c.charCodeAt(0) - 1776)
      .replace(/\D/g, "");
    const validPhone =
      /^[+0-9٠-٩۰-۹() \-]+$/.test(rawPhone) &&
      digits.length >= 7 &&
      digits.length <= 15;
    $("#phone").setCustomValidity(
      validPhone ? "" : "يرجى إدخال رقم هاتف صحيح من 7 إلى 15 رقمًا.",
    );
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    requestText = [
      "مرحبًا، أرغب في طلب دراسة وعرض سعر لمشروعي.",
      "الاسم: " + data.get("name").trim(),
      "الهاتف: " + rawPhone,
      "الخدمة: " + data.get("service"),
      data.get("location").trim()
        ? "موقع المشروع: " + data.get("location").trim()
        : "",
      data.get("details").trim()
        ? "تفاصيل المشروع: " + data.get("details").trim()
        : "",
    ]
      .filter(Boolean)
      .join("\n");
    $("#whatsapp-send").href =
      "https://wa.me/201092703355?text=" + encodeURIComponent(requestText);
    $("#copy-request").textContent = "نسخ نص الطلب بدلًا من ذلك";
    $("#form-result").hidden = false;
    if (lenis) lenis.resize();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    scrollToTarget($("#form-result"));
  });
  ["#full-name", "#phone"].forEach((selector) =>
    $(selector).addEventListener("input", (event) =>
      event.target.setCustomValidity(""),
    ),
  );
  $("#copy-request").addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext)
        await navigator.clipboard.writeText(requestText);
      else {
        const textarea = document.createElement("textarea");
        textarea.value = requestText;
        textarea.style.cssText = "position:fixed;top:0;left:0;opacity:0";
        document.body.append(textarea);
        textarea.focus();
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Copy unavailable");
      }
      $("#copy-request").textContent = "تم نسخ الطلب ✓";
    } catch {
      $("#copy-request").textContent =
        "النسخ غير متاح — افتح واتساب لقراءة الرسالة";
    }
  });
  $$(".faq-list details").forEach((item) =>
    item.addEventListener("toggle", () => {
      if (item.open)
        $$(".faq-list details").forEach((other) => {
          if (other !== item) other.open = false;
        });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }),
  );
  $("#year").textContent = new Date().getFullYear();
  // Export the exact standalone document with embedded fonts, images and scripts.
  $(".download-link").addEventListener("click", async (event) => {
    if (location.protocol === "file:") return;
    event.preventDefault();
    try {
      const response = await fetch(location.pathname);
      if (!response.ok) throw new Error("Download failed");
      const blob = new Blob([await response.text()], {
        type: "text/html;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "index.html";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      window.open("index.html", "_blank", "noopener");
    }
  });
  route(true);
  if (document.fonts?.ready)
    document.fonts.ready.then(() => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
})();
