import {menuArray} from "./data.js"
const menu = document.getElementById("menu")
const cart = document.getElementById("cart")
const allItemsInCart = document.getElementById("all-items-in-cart")

console.log(menuArray)

let cartArr = []

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
            <button class="buy-btn" ><img id="buy-btn" data-product=${id} src="./images/add-btn.jpg"/></button>
        </div>    
        <div class="divider"></div>
        `
        // <p>${([...ingredients])}</p>
    }).join(" ")
    menu.innerHTML = allItems
}

displayMenu(menuArray) 


document.addEventListener("click", (e) => {
    if (e.target.id === "buy-btn"){
        console.log(e.target.dataset.product)
        updateCartArr(e.target.dataset.product)
        displayCart(cartArr)
    }
})

const updateCartArr = (clickedProductId) => {
    const targetProduct = menuArray.filter((oneProduct) => {
        return oneProduct.id === Number(clickedProductId)
    })[0]
    console.log(targetProduct)
    cartArr.push(targetProduct)
    console.log("cartArr",cartArr)
    return cartArr
}

const displayCart = (cartArr) => {
    cart.style.display = "flex"
    const displaiedItemsInCart = cartArr.map((eachItem) =>{
        return `<p>${eachItem.name}</p>`
    }).join(" ")
    return  allItemsInCart.innerHTML = displaiedItemsInCart
}