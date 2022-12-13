let imageSlide = document.querySelector(".imageSlide");
let previus = document.querySelector(".fa-angle-left");
let next = document.querySelector(".fa-angle-right");

let imageArr = [
    "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
];

imageArr.forEach(item => {
    let img = document.createElement("img");
    img.src = `${item}`;
    imageSlide.append(img);
});

let state = 0;
let loop = 0;

function intervalSet() {
    if (state < 300) {
        state += 100;
        loop++;
    }
    else {
        state = 0;
        loop = 0;
    }
    imageSlide.style.marginLeft = `-${state}vw`;
    slideLine(4, loop);
}

function nextPage() {
    if (state < 300) {
        state += 100;
    }
    imageSlide.style.marginLeft = `-${state}vw`;
    clearInterval(autoNavigation);
    autoNavigation = setInterval(intervalSet, 5000);
}

function previusPage() {
    if (state !== 0) {
        state -= 100;
    }
    imageSlide.style.marginLeft = `-${state}vw`;
    clearInterval(autoNavigation);
    autoNavigation = setInterval(intervalSet, 5000);
}

function slideLine(lineCount, id) {
    let item;
    for (let i = 0; i < lineCount.length; i++) {
        item.document.getElementById(`count${id}`)
        if (i == id + 1) {
            item.style.background = "black";
        }
        else {
            item.style.background = "gray";
        }
    }
}

let autoNavigation = setInterval(intervalSet, 5000);
next.addEventListener("click", nextPage);
previus.addEventListener("click", previusPage);


