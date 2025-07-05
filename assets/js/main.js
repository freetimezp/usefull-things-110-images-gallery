window.addEventListener("load", () => {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        multiplier: 0.75,
        scrollFromAnywhere: true,
    });
});

function generateRandomName() {
    //просто усі букви, цифри та _
    const characters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890_";
    const nameLength = Math.floor(Math.random() * 3) + 6;

    let randomName = "";

    for (let i = 0; i < nameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);

        randomName += characters.charAt(randomIndex);
    }

    return randomName + ".jpg";
}

function generateRandomImageName() {
    //відповідно до кількості зображень у нас в папці images 73
    const imageNumber = Math.floor(Math.random() * 73) + 1;

    return `img${imageNumber}.jpg`;
}

document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.querySelector(".gallery");
    const imgModal = document.querySelector(".img-modal");
    const imgViewContainer = imgModal.querySelector(".img");
    const modalName = imgModal.querySelector(".img-name p");
    const closeBtn = document.querySelector(".close-btn");

    let clickedItemImgSrc = "";
    let clickedItemname = "";

    const tl = gsap.timeline({ paused: true });

    tl.eventCallback("onStart", () => {
        imgModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    tl.eventCallback("onReverseComplete", () => {
        imgModal.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    tl.to(".img-modal", {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
        duration: 0.75,
    });

    tl.to(".img-modal .img", {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
        duration: 0.75,
    });

    tl.to(
        ".modal-item p",
        {
            top: 0,
            ease: "power4.inOut",
            duration: 1,
            stagger: {
                amount: 0.2,
            },
        },
        "<"
    );

    //буде створено лише 10 елементів, потім ми збільшимо кількість
    for (let i = 1; i <= 150; i++) {
        const item = document.createElement("div");
        item.classList.add("item");

        const itemImg = document.createElement("div");
        itemImg.classList.add("item-img");

        const imgTag = document.createElement("img");
        const randomImageName = generateRandomImageName();
        imgTag.src = `./assets/images/${randomImageName}`;
        itemImg.appendChild(imgTag);

        const itemName = document.createElement("div");
        itemName.classList.add("item-name");
        const randomName = generateRandomName();
        itemName.innerHTML = `<p>${randomName}</p>`;
        itemName.setAttribute("data-img", randomImageName.replace(".jpg", ""));

        item.appendChild(itemImg);
        item.appendChild(itemName);

        item.addEventListener("click", () => {
            clickedItemImgSrc = `./assets/images/${randomImageName}`;
            clickedItemname = randomName;

            imgViewContainer.innerHTML = `<img src="${clickedItemImgSrc}" alt=""/>`;
            modalName.textContent = randomName;

            tl.play(0);
        });

        galleryContainer.appendChild(item);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (!tl.reversed()) tl.reverse();
        });
    }
});
