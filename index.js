import {menuArray} from "./data.js"
const menu = document.getElementById("menu")

console.log(menuArray)

const displayMenu = (data) => {
    menu.innerHTML = ""
    const allItems = data.map((oneItem) => {
       const {name, ingredients, imgName, id, price} = oneItem
    return `
    <div class="menu-inner">
        <img src="./images/${imgName}"/>
        <div class="food-details">
            <p>${name}</p>
            <p>${ingredients.map((oneIngredience) => {return oneIngredience}).join(", ")}</p>
            <p>${price} SEK</p>
        </div>
        <button id="buy-btn" class="buy-btn"><img src="./images/add-btn.jpg"/></button>
    </div>    
    <div class="divider"></div>
        `
        // <p>${([...ingredients])}</p>
   }).join(" ")
   menu.innerHTML = allItems
}

displayMenu(menuArray) 

