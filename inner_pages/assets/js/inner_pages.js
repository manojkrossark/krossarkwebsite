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
  fetch("nav.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("nav-placeholder").innerHTML = html;

      // Highlight active link
      const currentPage = window.location.pathname.split("/").pop();
      document
        .querySelectorAll("a.nav-link, a.dropdown-item")
        .forEach((link) => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            const parentDropdown = link.closest(".dropdown-menu");
            if (parentDropdown) {
              const dropdownToggle = parentDropdown
                .closest(".nav-item.dropdown")
                .querySelector(".nav-link.dropdown-toggle");
              if (dropdownToggle) dropdownToggle.classList.add("active");
            }
          }
        });
    });

  fetch("hamenu.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("hamenu-placeholder").innerHTML = html;
      // Re-bind nav events after content is added
      bindNavEvents();
    });

  // Load footer and bind if needed
  fetch("footer.html")
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

  // Contact form handling
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
      const response = grecaptcha.getResponse();
      if (response.length === 0) {
        alert("Please complete the reCAPTCHA.");
        return;
      }

      const name = document.getElementById("form_name").value.trim();
      const email = document.getElementById("form_email").value.trim();
      const subject = document.getElementById("form_subject").value.trim();
      const message = document.getElementById("form_message").value.trim();
      const organization = document
        .getElementById("form_Organizations")
        .value.trim();

      if (name && email && message && subject) {
        const gmailComposeUrl =
          "https://mail.google.com/mail/?view=cm&fs=1&to=info@krossark.com" +
          "&su=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(
            "Name: " +
              name +
              "\nEmail: " +
              email +
              "\nOrganization: " +
              organization +
              "\n\n" +
              message
          );

        window.open(gmailComposeUrl, "_blank");

        contactForm.reset();
        grecaptcha.reset();
      } else {
        const fieldsArr = [name, email, subject, message];
        const fieldNames = ["Name", "Email", "Subject", "Message"];
        const alertArr = [];

        for (let i = 0; i < fieldsArr.length; i++) {
          if (fieldsArr[i] === "") {
            alertArr.push(fieldNames[i]);
          }
        }

        alert("Please enter the following fields: " + alertArr.join(", "));
      }
    });
  }
});
