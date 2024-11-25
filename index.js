import {menuArray} from "./data.js"
const menu = document.getElementById("menu")

console.log(menuArray)

const displayMenu = (data) => {
    menu.innerHTML = ""
    const allItems = data.map((oneItem) => {
       const {name, ingredients, id, price, emoji} = oneItem
    return `
        <p>${name}</p>
        <p>image</p>
        <p>${ingredients.map((oneIngredience) => {return oneIngredience}).join(", ")}</p>
        <p>${price}</p>
        <br>
        `
        // <p>${([...ingredients])}</p>
   }).join(" ")
   menu.innerHTML = allItems
}

displayMenu(menuArray) 

//         name: "Pizza",
//         ingredients: ["pepperoni", "mushrom", "mozarella"],
//         id: 0,
//         price: 14,
//         emoji: "🍕"
//     },