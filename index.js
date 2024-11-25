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
    cart.classList.add("shopping-cart")
    let displaiedItemsInCart = cartArr.map((eachItem) =>{
        return `
        <div class="one-item-in-a-cart">
            <p>${eachItem.name}</p>
            <button>remove</button>
            <p>${eachItem.price}</p>
        </div>    
                `
    }).join(" ")
    displaiedItemsInCart += `        
        <div>
            <p>Total price ${totalPrice(cartArr)}</p>
        </div>`
    return  allItemsInCart.innerHTML = displaiedItemsInCart
}

const totalPrice = (cartArr) =>{
   return cartArr.reduce((total, currentElement) => {
    return total + currentElement.price
    },0)
}