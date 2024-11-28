import {menuArray} from "./data.js"
const menu = document.getElementById("menu")
const cart = document.getElementById("cart")
const allItemsInCart = document.getElementById("all-items-in-cart")
const checkoutBtn = document.getElementById("checkout-btn")
const paymentForm = document.getElementById("payment-form")

console.log(menuArray)

let cartArr = []

const displayMenu = (data) => { //the visual display of array
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
        addToCartArr(e.target.dataset.product)
        displayCart(cartArr)
    }
    if (e.target.id === "remove-btn"){
        removeFromCardArr(e.target.dataset.remove, cartArr)
    }
})

const addToCartArr = (clickedProductId) => { //addition to Cart array
    const existingProduct = cartArr.find((oneProduct) => oneProduct.id === Number(clickedProductId));

    if (existingProduct) {
        // Increment quantity if the product already exists in the cart
        existingProduct.quantity += 1;
    } else {

    const targetProduct = menuArray.filter((oneProduct) => {
        return oneProduct.id === Number(clickedProductId)
    })[0]
    cartArr.push({...targetProduct, quantity: 1})
}
    console.log("cartArr", cartArr)
    return cartArr
}

const displayCart = (cartArr) => { //visual display of Cart array
    cart.classList.add("shopping-cart")
    let displaiedItemsInCart = cartArr.map((eachItem) =>{
        return `
        <div class="one-item-in-a-cart" >
            <div class="ordered-item-and-remove-btn">
                <p><span>${eachItem.quantity} x </span>${eachItem.name}</p>
                <button class="remove-btn" id="remove-btn" data-remove=${eachItem.id}>remove</button>
            </div>
            <p>${eachItem.price * eachItem.quantity} SEK</p>
        </div>    
                `
    }).join(" ")
    displaiedItemsInCart += `   
        <div class="divider-shopping-cart"></div>     
        <div class="total-price">
            <p>Total price</p> <p>${totalPrice(cartArr)} SEK</p>
        </div>`
    return  allItemsInCart.innerHTML = displaiedItemsInCart
}

const totalPrice = (cartArr) =>{ //total sum of Cart array
   return cartArr.reduce((total, currentElement) => {
    return total + currentElement.price * currentElement.quantity
    },0)
}

const removeFromCardArr = (idToDelete, cartArr) => { //deletion from Cart array
    console.log(idToDelete)
    const deleteIndex = cartArr.findIndex((oneProduct) => {
        return oneProduct.id === Number(idToDelete) 
    })
    console.log("deleteIndex", deleteIndex)
    if (deleteIndex !== -1) { //you need to ensure the index exists, otherwise undexpected behavior happens with splice
        const product = cartArr[deleteIndex]
        if (product.quantity > 1){
            product.quantity -= 1
        } 
        else {
        cartArr.splice(deleteIndex, 1) //splice means remove
        }
    }
    console.log("cartArr", cartArr)
    displayCart(cartArr)
}    

const registerPaymentDetails = () => {
    paymentForm.style.display = "block";
    paymentForm.innerHTML = `
    <h2>Enter card details</h2>
    <form id="submit-form">
        <input required type="text" id="fullname" name="fullname" placeholder="Enter your name"></input>
        <input required type="number" id="card-number" name="card-number" placeholder="Enter card number"></input>
        <input required type="number" id="cvv" name="cvv" placeholder="Enter CVV"></input>
        <button type="submit">Pay</button>
    </form>
    `;

    // Add the event listener to the form after it is added to the DOM
    const submitForm = document.getElementById("submit-form");
    submitForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = new FormData(submitForm);

        const name = data.get("fullname");
        const cardNumber = data.get("card-number");
        const cvv = data.get("cvv");

        console.log(name, cardNumber, cvv);
    });

    return paymentForm.innerHTML;
};


checkoutBtn.addEventListener("click", registerPaymentDetails);
