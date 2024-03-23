document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery__img")
    const overlay = document.createElement("DIV")
    const header = document.getElementById("header")

    for (let i = 1; i <= 12; i++) {
        const div = document.createElement("DIV")
        div.innerHTML = `
    <picture class="item__img">
        <source srcset='./build/img/thumb/${i}.avif' type='image/avif'>
        <source srcset='./build/img/thumb/${i}.webp' type='image/webp'>
        <img loading='lazy' src='./build/img/grande/${i}.jpg' alt='' class="img">
    </picture>
    `
        gallery.appendChild(div)
    }


    const image = document.querySelectorAll(".img")

    for (const img of image) {
        img.addEventListener("click", handler)
    }

    function handler(e) {
        overlay.classList.add("active")
        document.body.classList.add("no-overflow")
        gallery.appendChild(overlay)
        overlay.innerHTML = `
    <img src="${e.target.src}" alt="" class="animation-img img-abs">
    `
        const absoluteI = document.querySelector(".img-abs")
        absoluteI.addEventListener("click", mainDetect)
        overlay.addEventListener("click", mainDetect)
    }


    function mainDetect() {
        overlay.classList.remove("active")
        document.body.classList.remove("no-overflow")
        overlay.remove()
    }


    let lastScroll = 0
    window.addEventListener("scroll", handlerScroll)
    const widthMin = 480

    function handlerScroll() {
        if (screen.width > widthMin) {
            header.classList.remove("static")
            let currentScroll = window.scrollY || document.documentElement.lastScroll;

            if (currentScroll > lastScroll) {
                document.getElementById("header").classList.add("hidden");
            } else {
                document.getElementById("header").classList.remove("hidden");
            }
            lastScroll = currentScroll;
        } else {
            header.classList.add("static")
        }
    }
})