const aurigaConfigs = {
    obsSelector: '.obs>li',
    prevPos: 0,
};

function scrollToTarget(selector = '') {
    if (selector) {
        if (document.querySelector(selector)) document.querySelector(selector).scrollIntoView({
            behavior: "smooth"
        });
    }
}

function registerObserver(selector) {
    window.addEventListener('scroll', () => {
        const activeItem = document.querySelector(`${selector}.active`);

        let items = Array.from(document.querySelectorAll(`${selector}`));
        let currentItem;
        let pos, lastPos;
        
        for (let e of items) {
            pos = e.getBoundingClientRect().top - window.innerHeight / 2;
            if (pos < 0) {
                if (!currentItem || Math.abs(pos) < Math.abs(lastPos)) {
                    currentItem = e;
                    lastPos = pos;
                }
            } else {
                if (e.classList.contains('active')) {
                    e.classList.remove('active');
                }
            }
        }

        if(currentItem){
            if (currentItem !== activeItem) {
                document.querySelectorAll(`${selector}.active`).forEach(el => el.classList.remove('active'));
                currentItem.classList.add('active');
            }
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll(selector).forEach(ele => {
            ele.classList.add('obs-hover');
            ele.addEventListener('click', () => {
                ele.scrollIntoView({behavior: "smooth", block: "center"});
            });
        });
    });
}

window.addEventListener('mousemove', e => {
    const elem = document.createElement('div');
    const spread = Math.round(Math.random() * 8) + 3;
    const blur = spread * (Math.round(Math.random() * 12) + 2);
    elem.classList.add('absolute', 'bg-light-green', 'inline-block', 'rounded-full', 'play-dot');
    elem.style = `top: ${e.pageY}; left: ${e.pageX}; box-shadow: 0 0 ${blur}px ${spread}px rgba(57, 240, 185, .9); filter: hue-rotate(${Math.random() * 180}deg) brightness(${Math.random() * 1 + 0.4});`;

    document.getElementById('bg-play').append(elem);
    setTimeout(function () {
        elem.remove();
    }, 1000);
});

// Set things up
window.addEventListener("load", () => {
    document.querySelectorAll(aurigaConfigs.obsSelector).forEach(e => {
        //createObserver(e);
    });
}, false);