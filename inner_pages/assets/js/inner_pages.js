$(function () {
  "use strict";


  $(function () {
    $(".view-more-btn").on("click", function () {
      const $btn = $(this);
      const isExpanded = $btn.hasClass("expanded");

      if (isExpanded) {
        $(".more-item").slideUp();
        $btn.removeClass("expanded").find(".text").text("View More");
      } else {
        $(".more-item").slideDown();
        $btn.addClass("expanded").find(".text").text("View Less");
      }
    });
  });

  $(function () {
    $(".item").hover(function () {
      $(".item").removeClass("active"); // Remove from all
      $(this).addClass("active"); // Add to hovered one
    });
  });

  function toggleParagraph(link) {
    const $link = $(link);
    const $paragraph = $link.prev("p");

    $paragraph.toggleClass("expanded");

    if ($paragraph.hasClass("expanded")) {
      $link.html('View Less <i class="fa fa-arrow-up"></i>');
    } else {
      $link.html('Know More <i class="fa fa-arrow-right"></i>');
    }
  }
  window.toggleParagraph = toggleParagraph;


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
      organization: document.getElementById("form_Organizations"),
    };

    const errorMessages = {
      name: "Name is required.",
      email: "Email is required.",
      subject: "Subject is required.",
      message: "Message is required.",
    };

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

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
          if (errorDiv)
            errorDiv.textContent = "Please enter a valid email address.";
        }
      });

      input.addEventListener("blur", () => {
        const value = input.value.trim();
        if (value === "") {
          input.classList.add("input-error");
          if (errorDiv) errorDiv.textContent = errorMessages[key];
        } else if (key === "email" && !emailRegex.test(value)) {
          input.classList.add("input-error");
          if (errorDiv)
            errorDiv.textContent = "Please enter a valid email address.";
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

      // Check for form errors
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
          if (errorDiv)
            errorDiv.textContent = "Please enter a valid email address.";
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
        if (captchaError)
          captchaError.textContent = "Please complete the reCAPTCHA.";
        return;
      } else {
        if (captchaError) captchaError.textContent = "";
      }

      // Get form data
      const formData = {
        name: inputFields.name.value.trim(),
        email: inputFields.email.value.trim(),
        subject: inputFields.subject.value.trim(),
        message: inputFields.message.value.trim(),
        "g-recaptcha-response": response,
      };

      // Add organization only if it's not empty
      const organization = inputFields.organization.value.trim();
      if (organization) {
        formData.organization = organization;
      }

      fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          const alertBox = `<div class="alert alert-${data.type}">${data.message}</div>`;
          document.getElementById("formError").innerHTML = alertBox;
          contactForm.reset();
          grecaptcha.reset(); // Reset reCAPTCHA
        })
        .catch(() => {
          document.getElementById("formError").innerHTML =
            '<div class="alert alert-danger">Error sending message.</div>';

          // Compose Gmail URL (fallback)
          const gmailComposeUrl =
            "https://mail.google.com/mail/?view=cm&fs=1&to=info@krossark.com" +
            "&su=" +
            encodeURIComponent(inputFields.subject.value.trim()) +
            "&body=" +
            encodeURIComponent(
              `Name: ${inputFields.name.value.trim()}\n` +
              `Email: ${inputFields.email.value.trim()}\n` +
              `Organization: ${inputFields.organization.value.trim()}\n\n` +
              `${inputFields.message.value.trim()}`
            );

          window.open(gmailComposeUrl, "_blank");

          contactForm.reset();
          grecaptcha.reset();
        });
    });
  }
});


const video = document.getElementById("bgVideohomepage");
const homepage1 = document.getElementById("homepage1");
const homepage2 = document.getElementById("homepage2");
const homepage3 = document.getElementById("homepage3");
const homepage4 = document.getElementById("homepage4");
const homepage5 = document.getElementById("homepage5");

// Initially hide all text
[homepage1, homepage2, homepage3, homepage4, homepage5].forEach((text) => {
  text.style.display = "block";
  text.style.opacity = 0;
});

// Set video attributes
video.muted = true;
video.setAttribute("playsinline", "true");

// Try to play the video
function tryPlayHomePageVideo() {

  video
    .play()
    .then(() => {
      startTextHomePageSync();
    })
    .catch((err) => {
      console.warn("Autoplay failed. Waiting for user interaction.", err);
      document.addEventListener(
        "click",
        () => {
          video.play().then(startTextHomePageSync);
        },
        { once: true }
      );
    });
}

// Sync function using requestAnimationFrame
function startTextHomePageSync() {

  function syncText() {
    const time = video.currentTime;

    // Updated timing logic
    homepage1.style.opacity = (time >= 0 && time < 5) ? 1 : 0;
    homepage2.style.opacity = (time >= 5 && time < 12) ? 1 : 0;
    homepage3.style.opacity = (time >= 12 && time < 17) ? 1 : 0;
    homepage4.style.opacity = (time >= 17 && time < 21) ? 1 : 0;
    homepage5.style.opacity = (time >= 21) ? 1 : 0;

    requestAnimationFrame(syncText);
  }

  requestAnimationFrame(syncText);
}

// Wait for enough data to play smoothly
video.addEventListener("canplaythrough", tryPlayHomePageVideo);

