
$(function () {

    "use strict";


    var testim = new Swiper(".testimonials-dm .process-swiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        // centeredSlides: true,
        speed: 1500,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 2,
            },
        }
    });

});



$(function () {
    var width = $(window).width();
    if (width > 991) {

        /* ===============================  isotope Masonery  =============================== */

        $('.gallery').isotope({
            itemSelector: '.items'
        });

    }
});