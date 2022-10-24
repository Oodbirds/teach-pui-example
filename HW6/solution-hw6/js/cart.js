//declaration of classes and dictionaries
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}
//roll, glaze, pack dictionaries
const rollType = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};
const glaze = {
    "Keep Original": {
        "price": 0
    },
    "Sugar Milk": {
        "price": 0
    },
    "Vanilla Milk": {
        "price": 0.5
    },
    "Double Chocolate": {
        "price": 1
    }
};

const pack = {
    1: {
        "priceChange": 1
    },
    3: {
        "priceChange": 3
    },
    6: {
        "priceChange": 5
    },
    12: {
        "priceChange": 10
    }
};

//declaration of array and template
let cart = [];
if(localStorage.getItem('storedCart') != null){
    retrieveFromLocalStorage();
}else {
    cart = [];
}
let productList = document.getElementById("prodList");
console.log(productList);
let template = document.getElementById("my-paragraph");

//function to calculate price of total cinamon roll and add roll to cart
function calculatePrice(roll, glazing, packSize){
    let totalPrice = Math.round(((rollType[roll].basePrice + glaze[glazing].price)*pack[packSize].priceChange)*100)/100;
    console.log("total price of unit " + totalPrice);
    return totalPrice;
}
function addToCart(cType,cGlazing,cSize,cBasePrice){
    let newRollName = new Roll(cType,cGlazing,cSize,cBasePrice);
    cart.push(newRollName);
}
/*
//creation of roll objects
let original = new Roll("Original","Sugar Milk",1);
console.log("hello");
let walnut = new Roll("Walnut","Vanilla Milk",12, calculatePrice("Walnut","Vanilla Milk",12));
let raisin = new Roll("Raisin","Sugar Milk",3, calculatePrice("Raisin","Sugar Milk",3));
let apple = new Roll("Apple", "Original", 3, calculatePrice("Apple","Original",3));

//adding object to cart
addToCart(original);
addToCart(walnut);
addToCart(raisin);
addToCart(apple);
*/

//populate DOM with templated cinnamon rolls from cart array
function addCinnamonRoll(cinnamonRoll){
    const templateClone = template.content.cloneNode(true);
    let image = templateClone.querySelector("img");
    image.src = "../products/" + rollType[cinnamonRoll.type].imageFile;
    let crName = templateClone.querySelectorAll("p");
    crName[0].textContent = cinnamonRoll.type + " Cinnamon Roll";
    crName[1].textContent = "Glazing: "+ cinnamonRoll.glazing;
    crName[2].textContent = "Pack Size: " + cinnamonRoll.size;
    crName[3].textContent = "$" + calculatePrice(String(cinnamonRoll.type), String(cinnamonRoll.glazing), cinnamonRoll.size);
    let removeBtn = templateClone.querySelectorAll("h5");
    removeBtn[0].value = cinnamonRoll;
    removeBtn[0].onclick = function() {
        console.log("clicked " + removeBtn[0].value.type);
        remover(removeBtn[0].value); 
    }
    console.log("remove button " + removeBtn[0].value);
    let templateContent = template.content;
    productList.appendChild(templateClone);
}
//function to add up total price of cart items, also display items
function displayCart(){
    let cartTotalDisplay = document.getElementById("price-number");
    let cartTotal = 0;

    for(let i = 0; i < cart.length;i++){
        addCinnamonRoll(cart[i]);
        cartTotal += Number(calculatePrice(String(cart[i].type), String(cart[i].glazing), cart[i].size));
        console.log("Cinnamon Roll Type: "+cart[i].type);
        console.log("selected Glaze: "+cart[i].glazing);
        console.log("quantity: "+cart[i].size);
        console.log("total Price: "+ calculatePrice(String(cart[i].type), String(cart[i].glazing), cart[i].size));
    }
    cartTotalDisplay.textContent = cartTotal;
    console.log("price cat total "+ cartTotal);
}

//removes and updates cinamon rolls in DOM 
function remover(target){
//remove target from cart
    for(let i = 0; i < cart.length;i++){
        if(target === cart[i]){
            cart.splice(i,1);
        }
    }
    //update current display of items
    let currentCart =  document.getElementsByClassName("product-checkout");
    console.log("elements lengths "+ currentCart.length);
    let currentCartlength = currentCart.length
    for(let i = 0; i< currentCartlength; i++){
        console.log(currentCart[0]);
        currentCart[0].remove();
    }
    saveToLocalStorage();
    //display the new updated cart
    displayCart();
}

function retrieveFromLocalStorage(){
    const cartArrayString = localStorage.getItem('storedCart');
    const cartArray = JSON.parse(cartArrayString);
    for (let cartData of cartArray) {
      addToCart(cartData.type,cartData.glazing,cartData.size,cartData.basePrice)
    }
}
function saveToLocalStorage() {
    const cartArray = Array.from(cart);
    const cartArrayString = JSON.stringify(cartArray);
    localStorage.setItem('storedCart', cartArrayString);
    console.log("Items in local Storage " + localStorage.getItem('storedCart'));
}

displayCart();

