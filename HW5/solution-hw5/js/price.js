// global variable declaration
const glazeSelect = document.getElementById("glazingOptions");
const packSelect = document.getElementById("pack-size");
let price = document.getElementById("total-price");
let priceContent = document.getElementById("total-price").textContent;
let currentGlaze = 0.00;
let currentPack = 1.00;
let currentGlazeName = "Keep Original";
let currentPackName = "1";
/*create glazing and pack size classes (classes contain name 
of option and price)*/
class Glazing{
    
    constructor(name,price){
        this.cinnamonRollName = name;
        this.cinnamonRollPrice = price;
    }
}

class PackSize{
    
    constructor(name, quantity){
        this.quantityName = name;
        this.cinnamonRollQuantity = quantity;
    }
}

//Declaration of galzing and pack option objects
const keepOriginal = new Glazing("Keep Original",0)
const sugarMilk = new Glazing("Sugar Milk",0)
const vanillaMilk = new Glazing("Vanilla Milk",0.5)
const doubleChocolate = new Glazing("Double Chocolate",1)

const one = new PackSize ("1",1)
const three = new PackSize ("3",3)
const six = new PackSize ("6",5)
const twelve = new PackSize("12",10)

//Array used to populate glazing and packsize options 
let glazingElmnts = [keepOriginal,sugarMilk,vanillaMilk,doubleChocolate];
let packSizeElmnts = [one, three, six, twelve];

//Forloop populates selection options by cycling through the list
for (let i = 0; i < glazingElmnts.length; i++) {
    let glazeOptn = glazingElmnts[i];
    let optn= document.createElement("option");
    optn.textContent = glazeOptn.cinnamonRollName;
    optn.value = glazeOptn.cinnamonRollPrice;
    glazeSelect.appendChild(optn)
}
for (let i = 0; i < packSizeElmnts.length; i++) {
    let packOptn = packSizeElmnts[i];
    let optn= document.createElement("option");
    optn.textContent = packOptn.quantityName;
    optn.value = packOptn.cinnamonRollQuantity;
    packSelect.appendChild(optn)
}

//glazing and pack change functions called when new val is selected
function glazingChange(element) {
    // get value of selected glazing option
    const priceChange = element.value
    currentGlaze = Number(priceChange);
    currentGlazeName = element.options[element.selectedIndex].text;
    console.log("updated glaze " + currentGlazeName);
    upDatePrice();
}
function packChange(element) {
    // get value of selected glazing option
    const priceChange = element.value
    currentPack = Number(priceChange);
    currentPackName = element.options[element.selectedIndex].text;
    console.log("updated pack " + currentPackName);
    upDatePrice();
}

//function to calculate new price
function upDatePrice (){
    let total = Math.round(((Number(priceContent) + currentGlaze)*currentPack)*100)/100;
    console.log("glaze" + currentGlaze);
    console.log("pack" + currentPack);
    console.log("total" + total);
    
    price.textContent = total;
}