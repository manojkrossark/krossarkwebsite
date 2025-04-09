$(function () {
  "use strict";

  // Load nav
  fetch("nav.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("nav-placeholder").innerHTML = html;

      const currentPage = window.location.pathname.split("/").pop();

      // Highlight current link
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

              if (dropdownToggle) {
                dropdownToggle.classList.add("active");
              }
            }
          }
        });
    });

  // Load footer
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
      const organization = document.getElementById("form_Organizations").value.trim();

      if (name && email && message && subject) {
        const gmailComposeUrl =
          "https://mail.google.com/mail/?view=cm&fs=1&to=info@krossark.com" +
          "&su=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\nOrganization: " + organization +
            "\n\n" + message
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
