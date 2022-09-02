function scrollToTarget(selector = '') {
    if (selector) {
        if (document.querySelector(selector)) document.querySelector(selector).scrollIntoView({
            behavior: "smooth"
        });
    }
}

window.addEventListener('mousemove', e => {
    const elem = document.createElement('div');
    const spread = Math.round(Math.random() * 8) + 3;
    const blur = spread * (Math.round(Math.random() * 12) + 2);
    elem.classList.add('absolute', 'bg-light-green', 'inline-block', 'rounded-full', 'play-dot');
    elem.style = `top: ${e.pageY}; left: ${e.pageX}; box-shadow: 0 0 ${blur}px ${spread}px rgba(57, 240, 185, .9); filter: hue-rotate(${Math.random()*180}deg) brightness(${Math.random()*1+0.3});`;

    document.getElementById('bg-play').append(elem);
    setTimeout(function () {
        elem.remove();
    }, 1000);
});