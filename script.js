let circleCount = document.querySelector(".circle-count");
let countProducts = 0;
function itemsCountAccrue() {
    circleCount.innerHTML = `<p class="count-products-p">${countProducts += 1}</p>`;
}

function itemsCountDecrease() {
    circleCount.innerHTML = `<p class="count-products-p">${countProducts -= 1}</p>`;
}

function SliderAll() {
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
    let autoNavigation = setInterval(intervalSet, 5000);
    function intervalSet() {
        if (state < 300) {
            state += 100;
        }
        else {
            state = 0;
        }
        imageSlide.style.marginLeft = `-${state}vw`;
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
    next.addEventListener("click", nextPage);
    previus.addEventListener("click", previusPage);
}
SliderAll()

let innerProduct = document.querySelector(".innerProduct");
let arrayProducts = document.querySelector(".arrayProducts");
let categories = document.querySelector(".categories");
let allPrice = document.querySelector(".allPrice");

//allProduct
// function generateProduct() {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', 'https://fakestoreapi.com/products');
//     xhr.onload = (resp /*Respone*/) => {
//         let urlProducts = JSON.parse(resp.target.response);
//         for (let i = 0; i < urlProducts.length; i++) {
//             let productItems = document.createElement("div");
//             productItems.setAttribute("class", "productItems")
//             productItems.innerHTML = `<h3>${urlProducts[i].title}</h3> <img src="${urlProducts[i].image}"> 
//                                     <div class="price-rating"> <p>${urlProducts[i].price}</p> <p class="rating-icon"> 
//                                     <i class="fa fa-star" aria-hidden="true"></i> ${urlProducts[i].rating.rate}</p> </div> 
//                                     <button class="add-to-cart">Add to Carts</button>`;
//             innerProduct.append(productItems);
//         }
//     }
//     xhr.send();
// }
// generateProduct()

function getProducts(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = (resp /*Respone*/) => {
        let urlProducts = JSON.parse(resp.target.response);
        innerProduct.innerHTML = "";
        let shopArray = [];

        //all elementssss
        for (let i = 0; i < urlProducts.length; i++) {
            let productItems = document.createElement("div");
            productItems.setAttribute("class", "productItems")
            productItems.innerHTML = `<h3>${urlProducts[i].title}</h3> <img src="${urlProducts[i].image}">
                                    <div class="price-rating"> <p>${urlProducts[i].price}</p> <p class="rating-icon">
                                    <i class="fa fa-star" aria-hidden="true"></i> ${urlProducts[i].rating.rate}</p> </div>
                                    <button class="add-to-cart">Add to Carts</button>`;
            innerProduct.append(productItems);

            let addToCart = document.querySelectorAll(".add-to-cart");

            //arrayyyyyy

            addToCart[i].addEventListener("click", () => {
                shopArray.push(urlProducts[i]);
                itemsCountAccrue();
                //AllPrice
                let sumElem;
                if (shopArray.length > 0) {
                    sumElem = shopArray.reduce((start, prices) => {
                        return start += prices.price;
                    }, 0)
                    allPrice.innerHTML = sumElem;
                }

                arrayProducts.innerHTML = "";
                for (let i = 0; i < shopArray.length; i++) {
                    let arrayElements = document.createElement("div");
                    arrayElements.setAttribute("class", "arrayElementsDivs");
                    arrayElements.innerHTML = `<h3>${shopArray[i].title}</h3> <img src="${shopArray[i].image}">
                                    <div class="price-rating"> <p>${shopArray[i].price}</p> <p class="rating-icon">
                                    <i class="fa fa-star" aria-hidden="true"></i> ${shopArray[i].rating.rate}</p> </div>
                                    <button class="delete">Delete</button>`;
                    arrayProducts.append(arrayElements);



                    //deleeteeeeee
                    let deleteFromArray = document.querySelectorAll(".delete");
                    deleteFromArray[i].addEventListener("click", function () {
                        itemsCountDecrease();
                        let newArr = shopArray.splice(shopArray[i], 1);
                        console.log(newArr);
                        arrayElements.style.display = "none";
                        //AllPriceMinus
                        let minusElem;
                        if (shopArray.length > 0) {
                            minusElem = shopArray.reduce((start, prices) => {
                                return prices.price -= start;
                            }, 0)
                            allPrice.innerHTML = minusElem;
                        }
                        else {
                            allPrice.innerHTML = "";
                        }
                    })
                }
            })
        }
    }
    xhr.send();
}
getProducts('https://fakestoreapi.com/products');


function getCategories(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = (resp /*Respone*/) => {
        let urlProducts = JSON.parse(resp.target.response);
        let all = document.createElement("button");
        all.innerHTML = "all";
        categories.append(all);
        for (let i = 0; i < urlProducts.length; i++) {
            let categoriesButtons = document.createElement("button");
            categoriesButtons.setAttribute("class", "categories-buttons");
            all.setAttribute("class", "categories-buttons");
            categoriesButtons.innerHTML = urlProducts[i];
            categories.append(categoriesButtons);

            categoriesButtons.addEventListener("click", function () {
                getProducts(`https://fakestoreapi.com/products/category/${urlProducts[i]}`);
            })
        }
        all.addEventListener("click", function () {
            getProducts('https://fakestoreapi.com/products');
        })
    }
    xhr.send();
}
getCategories('https://fakestoreapi.com/products/categories')

//Search
// let serachFromArr = document.querySelector(".serach-fromArr");
// function serach(url) {
//     let xhr = new XMLHttpRequest();
//     let serachArr = [];
//     xhr.open('GET', url);
//     let serachingArray;
//     xhr.onload = (resp /*Respone*/) => {
//         let urlProducts = JSON.parse(resp.target.response);
//         urlProducts.forEach(item => serachArr.push(item))
//         console.log(serachArr);
//         serachFromArr.addEventListener("change", function (e) {
//             serachingArray = serachArr.filter(item => {
//                 return item.title.toLowerCase().includes(e.target.value.toLowerCase());
//             })
//             console.log(serachingArray);
//             generateProduct(serachingArray)
//         })
//     }
//     xhr.send();
// }
// serach('https://fakestoreapi.com/products')

function sliderSecond() {
    let secondSlide = document.querySelector(".all-slides");
    let secondSlideLeft = document.querySelector(".fa-arrow-left");
    let secondSlideRight = document.querySelector(".fa-arrow-right");

    let state = 0;
    let autoNavigationSecond = setInterval(slideSecontInterval, 3000)

    function slideSecontInterval() {
        if (state < 105) {
            state += 105;
        }
        else {
            state = 0;
        }
        secondSlide.style.marginLeft = `-${state}%`;
    }

    function secondSlideNextPage() {
        if (state < 105) {
            state += 105;
        }
        secondSlide.style.marginLeft = `-${state}%`;
        clearInterval(autoNavigationSecond);
        autoNavigation = setInterval(slideSecontInterval, 5000);
    }

    function secondSlidePreviusPage() {
        if (state !== 0) {
            state -= 105;
        }
        secondSlide.style.marginLeft = `-${state}%`;
        clearInterval(autoNavigationSecond);
        autoNavigation = setInterval(slideSecontInterval, 5000);
    }
    secondSlideLeft.addEventListener("click", secondSlidePreviusPage);
    secondSlideRight.addEventListener("click", secondSlideNextPage);
}
sliderSecond();