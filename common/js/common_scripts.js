/*-----------------------------------------------------------------------------------

    Theme Name: Hubfolio
    Theme URI: http://
    Description: Creative Agency & Portfolio
    Author: Uithemez
    Author URI: http://.net/user/Uithemez
    Version: 1.0

-----------------------------------------------------------------------------------*/

$(function () {
  "use strict";

  var wind = $(window);

  /* =============================================================================
    -----------------------------  Smooth Scroll nav   -----------------------------
    ============================================================================= */

  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: "linear", // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: "active", // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -75, // offste (in px) for fixed top navigation
  });

  /* =============================================================================
    --------------------------------  Navbar Menu   --------------------------------
    ============================================================================= */

  $(".navbar .dropdown").hover(
    function () {
      $(this).find(".dropdown-menu").addClass("show");
    },
    function () {
      $(this).find(".dropdown-menu").removeClass("show");
    }
  );

  $(".navbar .dropdown-item").hover(
    function () {
      $(this).find(".dropdown-side").addClass("show");
    },
    function () {
      $(this).find(".dropdown-side").removeClass("show");
    }
  );

  $(".navbar .search-form").on("click", ".search-icon", function () {
    $(".navbar .search-form").toggleClass("open");

    if ($(".navbar .search-form").hasClass("open")) {
      $(".search-form .close-search").slideDown();
    } else {
      $(".search-form .close-search").slideUp();
    }
  });

  $(".navbar").on("click", ".navbar-toggler", function () {
    $(".navbar .navbar-collapse").toggleClass("show");
  });

  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".navbar"),
      logo = $(".navbar.change .logo> img");

    if (bodyScroll > 200) {
      navbar.addClass("nav-scroll");
      logo.attr("src", "assets/imgs/logo-dark.png");
    } else {
      navbar.removeClass("nav-scroll");
      logo.attr("src", "assets/imgs/logo-light.png");
    }
  });

  function noScroll() {
    window.scrollTo(0, 0);
  }

  $(".navbar .header_menu_icon__q1NWM").on("click", function () {
    $(".hamenu").addClass("open");

    $(".hamenu").animate({ left: 0 });
  });

  $(".hamenu .close-menu, .one-scroll .menu-links .main-menu > li").on(
    "click",
    function () {
      $(".hamenu").removeClass("open").delay(300).animate({ left: "-100%" });
      $(
        ".hamenu .menu-links .main-menu .dmenu, .hamenu .menu-links .main-menu .sub-dmenu"
      ).removeClass("dopen");
      $(
        ".hamenu .menu-links .main-menu .sub-menu, .hamenu .menu-links .main-menu .sub-menu2"
      ).slideUp();
    }
  );

  $(".hamenu .menu-links .main-menu > li").on("mouseenter", function () {
    $(this).removeClass("hoverd").siblings().addClass("hoverd");
  });

  $(".hamenu .menu-links .main-menu > li").on("mouseleave", function () {
    $(this).removeClass("hoverd").siblings().removeClass("hoverd");
  });

  $(".main-menu > li .dmenu").on("click", function () {
    $(this)
      .parent()
      .parent()
      .find(".sub-menu")
      .toggleClass("sub-open")
      .slideToggle();
    $(this).toggleClass("dopen");
  });

  $(".sub-menu > ul > li .sub-dmenu").on("click", function () {
    $(this)
      .parent()
      .parent()
      .find(".sub-menu2")
      .toggleClass("sub-open")
      .slideToggle();
    $(this).toggleClass("dopen");
  });

  /* =============================================================================
        ------------------------------  Data Background   ------------------------------
        ============================================================================= */

  $(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollTrigger.normalizeScroll(false);

    // create the smooth scroller FIRST!
    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });

    let headings = gsap.utils.toArray(".js-title").reverse();
    headings.forEach((heading, i) => {
      let headingIndex = i + 1;
      let mySplitText = new SplitText(heading, { type: "chars" });
      let chars = mySplitText.chars;

      chars.forEach((char, i) => {
        smoother.effects(char, { lag: (i + headingIndex) * 0.1, speed: 1 });
      });
    });

    let splitTextLines = gsap.utils.toArray(".js-splittext-lines");

    splitTextLines.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          duration: 2,
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
          // toggleActions: 'play none play reset'
        },
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" });
      // tl.from(itemSplitted.lines, { y: 100, delay: 0.2, opacity: 0, stagger: 0.1, duration: 1, ease: 'inOut' });
      // tl.from(itemSplitted.lines, { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'back.inOut' });
      tl.from(itemSplitted.lines, {
        duration: 1,
        delay: 0.5,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    });
  });

  /* =============================================================================
    ------------------------------  Data Background   ------------------------------
    ============================================================================= */

  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  var pageSectionColor = $(".bg-solid-color, section");
  pageSectionColor.each(function (indx) {
    var color = $(this).attr("data-solid-color");

    if ($(this).attr("data-solid-color")) {
      $(this).css("background-color", color);
    }
  });

  /* =============================================================================
    -----------------------------------  Tabs  -------------------------------------
    ============================================================================= */

  $("#tabs .tab-links").on("click", ".item-link", function () {
    var tab_id = $(this).attr("data-tab");

    $("#tabs .tab-links .item-link").removeClass("current");
    $(this).addClass("current");

    $(".tab-content").hide();
    $("#" + tab_id).show();
  });

  $("#tabs-fade .tab-links").on("click", ".item-link", function () {
    var tab2_id = $(this).attr("data-tab");

    $("#tabs-fade .tab-links .item-link").removeClass("current");
    $(this).addClass("current");

    $(".tab-content").fadeOut();
    $("#" + tab2_id).fadeIn();
  });

  /* =============================================================================
    --------------------------------  Accordion  -----------------------------------
    ============================================================================= */

  $(".accordion").on("click", ".title", function () {
    $(this).next().slideDown();

    $(".accordion-info").not($(this).next()).slideUp();
  });

  $(".accordion").on("click", ".item", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  /* =============================================================================
    -------------------------------  Progress Bar  ---------------------------------
    ============================================================================= */

  wind.on("scroll", function () {
    $(".skill-progress .progres").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal,
        });
      }
    });
  });

  /* =============================================================================
    -----------------------------  Trigger Plugins  --------------------------------
    ============================================================================= */

  /* ========== YouTubePopUp ========== */

  $("a.vid").YouTubePopUp();
});

/* =============================================================================
-----------------------------  cursor Animation  -----------------------------
============================================================================= */

(function () {
  const link = document.querySelectorAll(".hover-this");
  const cursor = document.querySelector(".cursor");
  const animateit = function (e) {
    const hoverAnim = this.querySelector(".hover-anim");
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,
      move = 25,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;
    hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === "mouseleave") hoverAnim.style.transform = "";
  };
  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  };
  link.forEach((b) => b.addEventListener("mousemove", animateit));
  link.forEach((b) => b.addEventListener("mouseleave", animateit));
  window.addEventListener("mousemove", editCursor);

  $("a, .cursor-pointer").hover(
    function () {
      $(".cursor").addClass("cursor-active");
    },
    function () {
      $(".cursor").removeClass("cursor-active");
    }
  );

  /* =============================================================================
    -----------------------------  Text Animation  -----------------------------
    ============================================================================= */

  let elements = document.querySelectorAll(".rolling-text");

  elements.forEach((element) => {
    let innerText = element.innerText;
    element.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
      let span = document.createElement("span");
      span.innerText = letter.trim() === "" ? "\xa0" : letter;
      span.classList.add("letter");
      textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
  });

  elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.classList.remove("play");
    });
  });
})();

/* =============================================================================
////////////////////////////////////////////////////////////////////////////////
============================================================================= */

$(window).on("load", function () {
  /* =============================================================================
    -----------------------------  isotope Masonery   ------------------------------
    ============================================================================= */

  $(".gallery").isotope({
    itemSelector: ".items",
  });

  // isotope
  $(".gallery2").isotope({
    // options
    itemSelector: ".items",
    masonry: {
      // use element for option
      columnWidth: ".width2",
    },
  });

  var $gallery = $(".gallery , .gallery2").isotope();

  $(".filtering").on("click", "span", function () {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  /* =============================================================================
    -----------------------------  Contact Valdition   -----------------------------
    ============================================================================= */

  // $("#contact-form").validator();

  // $("#contact-form").on("submit", function (e) {
  //   if (!e.isDefaultPrevented()) {
  //     // var url = "contact.php";
  //     var url = "assets/js/sendEmail.php";
  //     const captchaResponse = grecaptcha.getResponse();
  //     if (!captchaResponse) {
  //       $("#g-recaptcha").addClass('error');
  //       $("#contact-form .messages").html('<div class="alert alert-danger">Please complete the reCAPTCHA.</div>');
  //       return;
  //     }
  //     var formData = $(this).serialize() + "&g-recaptcha-response=" + captchaResponse;

  //     $.ajax({
  //       type: "POST",
  //       url: url,
  //       data: formData,
  //       success: function (data) {
  //         var messageAlert = "alert-" + data.type;
  //         var messageText = data.message;

  //         var alertBox =
  //           '<div class="alert ' +
  //           messageAlert +
  //           ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
  //           messageText +
  //           "</div>";
  //         if (messageAlert && messageText) {
  //           $("#contact-form").find(".messages").html(alertBox);
  //           $("#contact-form")[0].reset();
  //         }
  //       },
  //     });
  //     return false;
  //   }
  // });

  $(".header-cst .caption h1").addClass("normal");
});

/* =============================================================================
-----------------------------  Button scroll up   ------------------------------
============================================================================= */

$(document).ready(function () {
  "use strict";

  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

// Right Sidebar Canvas

document.addEventListener("DOMContentLoaded", function () {
  let bsOffcanvas = null;

  fetch("/common/common-offcanvas.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("offcanvasContainer").innerHTML = html;

      // Initialize a single instance
      const offcanvasEl = document.getElementById("offcanvasRight");
      if (offcanvasEl) {
        bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);

        // Optional: Listen to hidden event to ensure scroll is re-enabled
        offcanvasEl.addEventListener("hidden.bs.offcanvas", () => {
          document.getElementById("whitepaper").style.display = "block";
          document.getElementById("successMessage").style.display = "none";
          clearErrorMessages();
          document.body.classList.remove(
            "offcanvas-backdrop",
            "modal-open",
            "overflow-hidden"
          );
        });
      }

      bindOffcanvasEvents();
    })
    .catch((error) => {
      console.error("Failed to load offcanvas:", error);
    });

  function bindOffcanvasEvents() {
    const buttons = document.querySelectorAll(".loadOffcanvasBtn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const title = button.getAttribute("data-title") || "";
        const description = button.getAttribute("data-description") || "";
        const image =
          button.getAttribute("data-image") ||
          "/inner_pages/assets/imgs/kross-book.png";

        const titleElement = document.getElementById("offcanvas-title");
        const descriptionElement = document.getElementById(
          "offcanvas-description"
        );
        const imageElement = document.getElementById("offcanvas-image");

        if (titleElement) titleElement.textContent = title;
        if (descriptionElement) descriptionElement.textContent = description;
        if (imageElement) imageElement.src = image;
        if (imageElement) imageElement.srcset = image;
        if (bsOffcanvas) {
          bsOffcanvas.show();
        }
      });
    });
  }
});

/* =============================================================================
-----------------------------  Modal Open   ------------------------------
============================================================================= */

// Load modal HTML dynamically
fetch("/common/common-modal.html")
  .then((res) => res.text())
  .then((html) => {
    const container = document.getElementById("modal-container");
    if (container) {
      container.innerHTML = html;
    } else {
      console.error("modal-container not found in the DOM");
    }
  });

// Function to open the modal
function openModal() {
  resetModal();
  const modal = new bootstrap.Modal(document.getElementById("offcanvasRight"));
  modal.show();
}

function closeModal() {
  const offcanvas = bootstrap.Offcanvas.getInstance(
    document.getElementById("offcanvasRight")
  );
  if (offcanvas) {
    offcanvas.hide();
  }
}

function resetModal() {
  document.getElementById("whitepaper").style.display = "block";
  document.getElementById("successMessage").style.display = "none";
  var form = document.getElementById("whitepaperForm");
  form.reset();
}


function copyLinkToClipboard() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const toast = document.getElementById("copyToast");
    toast.style.bottom = "0px";
    toast.style.position = "relative";
    setTimeout(() => {
      toast.style.bottom = "-60px";
      toast.style.position = "fixed";
    }, 2000);
  });
}
/* =============================================================================
-------------------------------  Wow Animation   -------------------------------
============================================================================= */

wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

$(function () {
  // Animate header container without preloader
  gsap.from("main", {
    y: 50, // slide up a little
    opacity: 0, // fade in from transparent
    duration: 0.8, // fast but smooth
    ease: "power2.out",
  });
});

/* =============================================================================
-----------------------------  Common Modal      ------------------------------
============================================================================= */

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const company = document.getElementById("company").value.trim();
  const jobTitle = document.getElementById("jobTitle").value.trim();
  const consent = document.getElementById("gridCheck").checked;

  clearErrorMessages();

  const validationRules = [
    { field: "fullName", value: name, message: "Full Name is required." },
    {
      field: "email",
      value: email,
      message: "Please enter a valid email address.",
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
    },
    { field: "company", value: company, message: "Company is required." },
    { field: "jobTitle", value: jobTitle, message: "Job Title is required." },
    {
      field: "gridCheck",
      value: consent,
      message: "You must agree to the Privacy Policy.",
    },
  ];

  let hasError = false;

  validationRules.forEach((rule) => {
    if (!rule.value || (rule.pattern && !rule.pattern.test(rule.value))) {
      showError(rule.field, rule.message);
      hasError = true;
    }
  });

  if (hasError) return;

  fetch("/api/sendWhitePaper", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, company, jobTitle }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        // Hide form, show success
        document.getElementById("whitepaper").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
        event.target.reset(); // reset the form
      } else {
        console.error(data.message);
        // Optionally show a general error message
      }
    })
    .catch((error) => {
      console.error("Error sending form:", error);
    });
}

function showError(inputId, message) {
  const inputElement = document.getElementById(inputId);
  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.style.color = "red";
  errorMessage.textContent = message;

  // Append the error message below the input field
  inputElement.parentNode.appendChild(errorMessage);
}

// Function to clear previous error messages
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((message) => message.remove());
}

var testim = new Swiper(".case-studies .testim-swiper", {
  slidesPerView: 3,
  spaceBetween: 30, // Optional spacing between slides
  speed: 600,
  loop: false,

  // Disable autoplay
  autoplay: false,

  // Remove pagination
  pagination: false,

  // Add navigation arrows
  navigation: {
    nextEl: ".case-studies .swiper-button-next",
    prevEl: ".case-studies .swiper-button-prev",
  },
});
