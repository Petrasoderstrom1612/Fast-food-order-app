import {menuArray} from "./data.js"
const menu = document.getElementById("menu")

console.log(menuArray)

const displayMenu = (data) => {
   menu.innerHTML = ""
   const allItems = menuArray.map((oneItem) => {
    return `
        <p>${oneItem.name}</p>
        <p>image</p>
        <p>${oneItem.ingredients.map(oneIngredience => " " + oneIngredience)}</p>
        <p>price</p>
    `
   })
   menu.innerHTML = allItems
}

displayMenu(menuArray) 

//         name: "Pizza",
//         ingredients: ["pepperoni", "mushrom", "mozarella"],
//         id: 0,
//         price: 14,
//         emoji: "🍕"
//     },