window.addEventListener("load", () => {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        multiplier: 0.75,
        scrollFromAnywhere: true,
    });
});

function generateRandomName() {
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
    const imageNumber = Math.floor(Math.random() * 73) + 1; // кількість зображень

    return `img${imageNumber}.jpg`;
}

document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.querySelector(".gallery");
    const imgModal = document.querySelector(".img-modal");
    const imgViewContainer = imgModal.querySelector(".img");
    const modalName = imgModal.querySelector(".img-name p");

    const tl = gsap.timeline({ paused: true });
    let clickedItemImgSrc = "";
    let clickedItemName = "";

    // кількість елементів, що буде створена
    for (let i = 1; i <= 100; i++) {
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
            const dataImg = itemName.getAttribute("data-img");

            if (imgViewContainer && modalName) {
                clickedItemImgSrc = `./assets/images/${dataImg}.jpg`;
                clickedItemName = itemName.textContent;

                tl.eventCallback("onStart", () => {
                    imgModal.classList.add("active");
                });

                tl.eventCallback("onReverseComplete", () => {
                    imgModal.classList.remove("active");
                });

                if (tl.reversed()) {
                    imgViewContainer.innerHTML = `<img src="${clickedItemImgSrc}" alt="" />`;
                    modalName.textContent = clickedItemName;
                    tl.play(); // open
                } else {
                    tl.reverse().eventCallback("onReverseComplete", () => {
                        imgViewContainer.innerHTML = `<img src="${clickedItemImgSrc}" alt="" />`;
                        modalName.textContent = clickedItemName;
                        tl.play();
                        tl.eventCallback("onReverseComplete", null); // clear callback
                    });
                }
            }
        });

        galleryContainer.appendChild(item);
    }

    const closeBtn = document.querySelector(".close-btn");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (!tl.reversed()) {
                tl.reverse();
            }
        });
    }

    function revealModal() {
        tl.to(".img-modal", 0.75, {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut",
            poinerEvents: "auto",
        });

        tl.to(".img-modal .img", 0.75, {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut",
        });

        tl.to(
            ".modal-item p",
            1,
            {
                top: 0,
                ease: "power4.inOut",
                stagger: {
                    amount: 0.2,
                },
            },
            "<"
        ).reverse();
    }

    if (!tl.reversed()) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    revealModal();
});
