$(function () {
  "use strict";

  /* ===============================  Services Tabs  =============================== */

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

  var testim = new Swiper(".testimonials-mp .testim-swiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    loop: false,
    pagination: {
      el: ".testimonials-mp .swiper-pagination",
      clickable: true,
    },
  });

  var process = new Swiper(".process-mp .process-swiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 2,
      },
    },
  });
});

$(window).on("load", function () {
  $(".gallery").isotope({
    itemSelector: ".items",
  });
});

const video = document.getElementById("bgVideo");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const text4 = document.getElementById("text4");
const text5 = document.getElementById("text5");

// Initially hide all text
[text1, text2, text3, text4, text5].forEach((text) => {
  text.style.display = "block";
  text.style.opacity = 0;
});

// Set video attributes
video.muted = true;
video.setAttribute("playsinline", "true");

// Try to play the video
function tryPlayVideo() {
  video
    .play()
    .then(() => {
      startTextSync();
    })
    .catch((err) => {
      console.warn("Autoplay failed. Waiting for user interaction.", err);
      document.addEventListener(
        "click",
        () => {
          video.play().then(startTextSync);
        },
        { once: true }
      );
    });
}

// Sync function using requestAnimationFrame
function startTextSync() {
  function syncText() {
    const time = video.currentTime;

    // Updated timing logic
    text1.style.opacity = (time >= 0 && time < 5) ? 1 : 0;
    text2.style.opacity = (time >= 5 && time < 12) ? 1 : 0;
    text3.style.opacity = (time >= 12 && time < 17) ? 1 : 0;
    text4.style.opacity = (time >= 17 && time < 21) ? 1 : 0;
    text5.style.opacity = (time >= 21) ? 1 : 0;

    requestAnimationFrame(syncText);
  }

  requestAnimationFrame(syncText);
}

// Wait for enough data to play smoothly
video.addEventListener("canplaythrough", tryPlayVideo);

// const video = document.getElementById('bgVideo');
// const text1 = document.getElementById('text1');
// const text2 = document.getElementById('text2');
// const text3 = document.getElementById('text3');

// video.addEventListener('timeupdate', () => {
//   const time = video.currentTime;

//   if (time >= 0 && time < 16) {
//     text1.style.opacity = 1;
//   } else {
//     text1.style.opacity = 0;
//   }

//   if (time >= 16 && time < 20) {
//     text2.style.opacity = 1;
//   } else {
//     text2.style.opacity = 0;
//   }

//   if (time >= 20) {
//     text3.style.opacity = 1;
//   } else {
//     text3.style.opacity = 0;
//   }
// });
