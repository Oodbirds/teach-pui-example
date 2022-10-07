//variable decleration
let cart = [];
let header = "Cinnamon Roll";
let productPrice = 0.00;
let productImg = "";

let headerVal = document.getElementById("page-title");
let imgVal = document.getElementById("big-display");
let priceVal = document.getElementById("total-price");

//classes and dictionaries
const rolls = {
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

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//load dictionary values
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

extractDetail(rollType);
setDetails();

//extracts deatils from dictionary using key
function extractDetail(rollType){
    header = rollType + " Cinnamon Roll";
    console.log(header);
    productPrice = rolls[rollType].basePrice;
    console.log(productPrice);
    productImg = "../products/" + rolls[rollType].imageFile;
    console.log(productImg);
}

//assigns extracted details to values.
function setDetails(){
    headerVal.textContent = header;
    console.log(headerVal.textContent);
    imgVal.src = productImg;
    priceVal.textContent = productPrice;
    console.log("img source "+ imgVal.src);
    priceContent = productPrice;
}

//button click listener. Calls fujnction to add current item to cart
document.getElementById("add-cart").onclick = function() {
    addToCart();
}

//adds item to csrt array and prints out values
 function addToCart(){
    let newRollName = new Roll(rollType, currentGlazeName, currentPackName, productPrice);
    cart.push(newRollName);
    for(let i = 0; i < cart.length;i++){
        console.log("Cinnamon Roll Type: "+cart[i].type);
        console.log("selected Glaze: "+cart[i].glazing);
        console.log("quantity: "+cart[i].size);
        console.log("Base Price: "+cart[i].basePrice);
    }

}

