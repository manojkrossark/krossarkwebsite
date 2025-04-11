$(function () {
  "use strict";

  function bindNavEvents() {
    // Dropdown hover
    $(".navbar .dropdown")
      .off("mouseenter mouseleave")
      .hover(
        function () {
          $(this).find(".dropdown-menu").addClass("show");
        },
        function () {
          $(this).find(".dropdown-menu").removeClass("show");
        }
      );

    // Submenu hover
    $(".navbar .dropdown-item")
      .off("mouseenter mouseleave")
      .hover(
        function () {
          $(this).find(".dropdown-side").addClass("show");
        },
        function () {
          $(this).find(".dropdown-side").removeClass("show");
        }
      );

    // Search toggle
    $(".navbar .search-form")
      .off("click", ".search-icon")
      .on("click", ".search-icon", function () {
        $(".navbar .search-form").toggleClass("open");
        if ($(".navbar .search-form").hasClass("open")) {
          $(".search-form .close-search").slideDown();
        } else {
          $(".search-form .close-search").slideUp();
        }
      });

    // Navbar toggler
    $(".navbar .navbar-toggler")
      .off("click")
      .on("click", function () {
        $(".navbar .navbar-collapse").toggleClass("show");
      });

    // Hamburger menu
    $(".navbar .menu-icon")
      .off("click")
      .on("click", function () {
        $(".hamenu").addClass("open").animate({ left: 0 });
      });

    $(".hamenu .close-menu, .one-scroll .menu-links .main-menu > li")
      .off("click")
      .on("click", function () {
        $(".hamenu").removeClass("open").delay(300).animate({ left: "-100%" });
        $(
          ".hamenu .menu-links .main-menu .dmenu, .hamenu .menu-links .main-menu .sub-dmenu"
        ).removeClass("dopen");
        $(
          ".hamenu .menu-links .main-menu .sub-menu, .hamenu .menu-links .main-menu .sub-menu2"
        ).slideUp();
      });

    $(".hamenu .menu-links .main-menu > li")
      .off("mouseenter mouseleave")
      .on("mouseenter", function () {
        $(this).removeClass("hoverd").siblings().addClass("hoverd");
      })
      .on("mouseleave", function () {
        $(this).removeClass("hoverd").siblings().removeClass("hoverd");
      });

    // ✅ FIX: Prevent multiple triggers by unbinding first
    $(".main-menu > li .dmenu")
      .off("click")
      .on("click", function () {
        $(this)
          .parent()
          .parent()
          .find(".sub-menu")
          .toggleClass("sub-open")
          .slideToggle();
        $(this).toggleClass("dopen");
      });

    $(".sub-menu > ul > li .sub-dmenu")
      .off("click")
      .on("click", function () {
        $(this)
          .parent()
          .parent()
          .find(".sub-menu2")
          .toggleClass("sub-open")
          .slideToggle();
        $(this).toggleClass("dopen");
      });
  }

  // Load nav and re-bind events
  fetch("../common/nav.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("nav-placeholder").innerHTML = html;

      const currentPage = window.location.pathname.split("/").pop();

      document
        .querySelectorAll("a.nav-link, a.dropdown-item")
        .forEach((link) => {
          const linkHref = link.getAttribute("href");
          if (!linkHref) return;

          const linkPage = linkHref.split("/").pop(); // ← only get the file name

          if (linkPage === currentPage) {
            link.classList.add("active");

            const parentDropdown = link.closest(".dropdown-menu");
            if (parentDropdown) {
              const dropdownToggle = parentDropdown
                .closest(".nav-item.dropdown")
                ?.querySelector(".nav-link.dropdown-toggle");

              if (dropdownToggle) dropdownToggle.classList.add("active");
            }
          }
        });
    });

  fetch("../common/hamenu.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("hamenu-placeholder").innerHTML = html;
      // Re-bind nav events after content is added
      bindNavEvents();
    });

  // Load footer and bind if needed
  fetch("../common/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
    });

  // Scroll-triggered animation
  if (window.innerWidth > 991) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-ma .bg-img",
        start: "top",
        endTrigger: ".about-ma",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      },
    });
  }

  // Tab switch on hover
  $(".services-mp .serv-title .tab-title").on("mouseenter", function () {
    var tab_id = $(this).attr("data-tab");
    $(".services-mp .serv-title .tab-title").removeClass("current");
    $(this).addClass("current");

    $(".services-mp .content .item").removeClass("current");
    $("#" + tab_id).addClass("current");

    if ($(this).hasClass("current")) {
      return false;
    }
  });

  // Testimonials swiper
  var testim = new Swiper(".testimonials-ds .testim-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Cards animation
  let cards = gsap.utils.toArray(".cards .card-item");

  let stickDistance = 0;

  let firstCardST = ScrollTrigger.create({
    trigger: cards[0],
    start: "center center",
  });

  let lastCardST = ScrollTrigger.create({
    trigger: cards[cards.length - 1],
    start: "bottom bottom",
  });

  cards.forEach((card, index) => {
    var scale = 1 - (cards.length - index) * 0.025;
    let scaleDown = gsap.to(card, {
      scale: scale,
      transformOrigin: `"50% ${lastCardST.start + stickDistance}"`,
    });

    ScrollTrigger.create({
      trigger: card,
      start: "center center",
      end: () => lastCardST.start + stickDistance,
      pin: true,
      pinSpacing: false,
      ease: "none",
      animation: scaleDown,
      toggleActions: "restart none none reverse",
    });
  });

  // Accordion toggle
  $(".accordion .accordion-item").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // Show/hide toggle
  $(".crv-butn").click(function () {
    $(".showHide").slideToggle(500);
  });

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const inputFields = {
      name: document.getElementById("form_name"),
      email: document.getElementById("form_email"),
      subject: document.getElementById("form_subject"),
      message: document.getElementById("form_message"),
      organization: document.getElementById("form_Organizations")
    };

    const errorMessages = {
      name: "Name is required.",
      email: "Email is required.",
      subject: "Subject is required.",
      message: "Message is required."
    };

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    //  On-change validation (input + blur)
    Object.keys(errorMessages).forEach((key) => {
      const input = inputFields[key];
      const errorDiv = input.nextElementSibling;

      input.addEventListener("input", () => {
        const value = input.value.trim();
        if (value !== "") {
          input.classList.remove("input-error");
          if (errorDiv) errorDiv.textContent = "";
        }

        if (key === "email" && value !== "" && !emailRegex.test(value)) {
          input.classList.add("input-error");
          if (errorDiv) errorDiv.textContent = "Please enter a valid email address.";
        }
      });

      input.addEventListener("blur", () => {
        const value = input.value.trim();
        if (value === "") {
          input.classList.add("input-error");
          if (errorDiv) errorDiv.textContent = errorMessages[key];
        } else if (key === "email" && !emailRegex.test(value)) {
          input.classList.add("input-error");
          if (errorDiv) errorDiv.textContent = "Please enter a valid email address.";
        } else {
          input.classList.remove("input-error");
          if (errorDiv) errorDiv.textContent = "";
        }
      });
    });

    // Submit validation
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;
      let firstInvalidInput = null;

      const captchaError = document.getElementById("captcha-error");
      if (captchaError) captchaError.textContent = "";

      Object.keys(errorMessages).forEach((key) => {
        const input = inputFields[key];
        const value = input.value.trim();
        const errorDiv = input.nextElementSibling;

        input.classList.remove("input-error");
        if (errorDiv) errorDiv.textContent = "";

        if (value === "") {
          input.classList.add("input-error");
          if (errorDiv) errorDiv.textContent = errorMessages[key];
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        } else if (key === "email" && !emailRegex.test(value)) {
          input.classList.add("input-error");
          if (errorDiv) errorDiv.textContent = "Please enter a valid email address.";
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        }
      });

      if (!isValid) {
        firstInvalidInput.scrollIntoView({ behavior: "auto", block: "center" });
        firstInvalidInput.focus();
        return;
      }

      // Validate reCAPTCHA
      const response = grecaptcha.getResponse();
      if (response.length === 0) {
        if (captchaError) captchaError.textContent = "Please complete the reCAPTCHA.";
        return;
      } else {
        if (captchaError) captchaError.textContent = "";
      }

      // Compose Gmail URL
      const gmailComposeUrl =
        "https://mail.google.com/mail/?view=cm&fs=1&to=info@krossark.com" +
        "&su=" + encodeURIComponent(inputFields.subject.value.trim()) +
        "&body=" + encodeURIComponent(
          `Name: ${inputFields.name.value.trim()}\n` +
          `Email: ${inputFields.email.value.trim()}\n` +
          `Organization: ${inputFields.organization.value.trim()}\n\n` +
          `${inputFields.message.value.trim()}`
        );

      window.open(gmailComposeUrl, "_blank");

      // Reset form & captcha
      contactForm.reset();
      grecaptcha.reset();
    });
  }
});
