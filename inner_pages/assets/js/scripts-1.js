

$(function () {
    var width = $(window).width();
    if (width > 991) {

        "use strict";

        $(function () {
            let cards = gsap.utils.toArray(".cards .card-item");
    
            let stickDistance = 0;
    
            let firstCardST = ScrollTrigger.create({
                trigger: cards[0],
                start: "center center"
            });
    
            let lastCardST = ScrollTrigger.create({
                trigger: cards[cards.length - 1],
                start: "bottom bottom"
            });
    
            cards.forEach((card, index) => {
                var scale = 1 - (cards.length - index) * 0.025;
                let scaleDown = gsap.to(card, { scale: scale, 'transform-origin': '"50% ' + (lastCardST.start + stickDistance) + '"' });
    
                ScrollTrigger.create({
                    trigger: card,
                    start: "center center",
                    end: () => lastCardST.start + stickDistance,
                    pin: true,
                    pinSpacing: false,
                    ease: "none",
                    animation: scaleDown,
                    toggleActions: "restart none none reverse"
                });
            });
        });

    }
});

