const aurigaConfigs = {
    obsSelector: '.obs>li',
    prevPos: 0,
    pointerX: 0,
    pointerY: 0,
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

        if (currentItem) {
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
                ele.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        });
    });
}

// window.addEventListener('mousemove', e => {
//     aurigaConfigs.pointerX = e.pageX;
//     aurigaConfigs.pointerY = e.pageY;

//     const elem = document.createElement('div');
//     const spread = Math.round(Math.random() * 8) + 3;
//     const blur = spread * (Math.round(Math.random() * 12) + 2);
//     const hue = Math.random() * 180;
//     const brightness = Math.random() + 0.35;
//     elem.classList.add('absolute', 'bg-light-green', 'inline-block', 'rounded-full', 'play-dot');
//     elem.style = `top: ${e.pageY}; left: ${e.pageX}; box-shadow: 0 0 ${blur}px ${spread}px rgba(57, 240, 185, .9); filter: hue-rotate(${hue}deg) brightness(${brightness});`;

//     document.getElementById('bg-play').append(elem);
//     setTimeout(function () {
//         elem.remove();
//     }, 1000);
// });

// window.addEventListener('pointerdown', holdingEffects);
// window.addEventListener('pointerup', holdingEffects);

// var holdInt = [];
// function holdingEffects(e) {
//     if ('pointerdown' === e.type) {
//         aurigaConfigs.pointerX = e.pageX;
//         aurigaConfigs.pointerY = e.pageY;
//         holdInt.push(setInterval(() => {
//             const elem = document.createElement('div');
//             const spread = Math.round(Math.random() * 4) + 2;
//             const blur = spread * 1.5;
//             const hue = Math.random() * 180;
//             const brightness = Math.random() + 0.8;

//             // const posX = aurigaConfigs.pointerX + Math.round(Math.random() * 50) -25;
//             // const posY = aurigaConfigs.pointerY + Math.round(Math.random() * 60) -30;
//             const posX = aurigaConfigs.pointerX;
//             const posY = aurigaConfigs.pointerY;

//             const childElem = document.createElement('div');
//             childElem.classList.add('bg-light-green', 'rounded-full', 'play-dot-1');
//             childElem.style = `font-size: ${blur}px; box-shadow: 20px 0 ${blur}px ${spread}px rgba(100, 224, 255, 0.74); filter: hue-rotate(${hue}deg) brightness(${brightness});`;

//             elem.classList.add('absolute', 'inline-block');
//             elem.style = `top: ${posY}; left: ${posX}; transform: rotate(${Math.random() * 360}deg);`;
//             elem.append(childElem);
//             document.getElementById('bg-play').append(elem);
//             setTimeout(function () {
//                 elem.remove();
//             }, 1000);
//         }, 120));
//     } else {
//         holdInt.forEach(int => clearInterval(int));
//         holdInt = [];
//     }
// }

// window.addEventListener('contextmenu', () => {
//     holdInt.forEach(int => clearInterval(int));
//     holdInt = [];
// });

// window.addEventListener('lostpointercapture', () => {
//     holdInt.forEach(int => clearInterval(int));
//     holdInt = [];
// });

// function is_rightclick() {
//     var rightclick;
//     var e = window.event;
//     if (e.which) rightclick = (e.which == 3);
//     else if (e.button) rightclick = (e.button == 2);
//     return rightclick;
// }

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menu-toggle').onclick = e => {
        document.querySelector('#auriga>header').classList.toggle('active');
    };

    document.querySelectorAll('.continue-btn').forEach(ele => ele.addEventListener('click', () => {
        window.scroll({
            top: document.querySelector('main>section:first-of-type+*').offsetTop - 108 - 30,
            behavior: 'smooth'
        });
        //document.querySelector('main>section:nth-of-type(2)').scrollIntoView({ behavior: "smooth" })
    }));

    document.querySelectorAll('.has-sub>a').forEach(ele => ele.addEventListener('click', e => {
        if (window.innerWidth < 768) {
            if (e.target.nextElementSibling.clientHeight > 0) {
                e.target.classList.add('close');
            } else {
                e.target.classList.remove('close');
            }
        }
    }));

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            document.querySelector('body>header').classList.add('bg');
        } else {
            document.querySelector('body>header').classList.remove('bg');
        }
    });
});

window.addEventListener('wheel', e => {
    e.preventDefault();
    window.scrollBy({
        top: -e.wheelDelta*1.2,
        behavior: 'smooth'
    });
}, { passive: false });

// window.addEventListener('scroll', () => {
//     document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight));
// }, false);