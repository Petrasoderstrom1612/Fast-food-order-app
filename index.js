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
            <h2 class="product-name">${name}</h2>
            <p class="ingrediences">${ingredients.map((oneIngredience) => {return oneIngredience}).join(", ")}</p>
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
    paymentForm.style.display = "block"; //show the form
    paymentForm.innerHTML = `                                   
    <button class="close-btn" id="close-btn">X</button>
    <h2>Enter card details</h2>
    <form id="submit-form">
        <input required type="text" id="fullname" name="fullname" placeholder="Firstname Lastname"/>
        <input required type="number" id="card-number" name="card-number" placeholder="Enter card number"/>
        <input required type="expiration-date" id="expiration-date" class="expiration-date" name="expiration-date" placeholder="MM/YY" maxlength="5"/>
        <input required type="number" id="cvv" name="cvv" placeholder="CVV"/>
        <button class="submit-btn" type="submit">Pay</button>
    </form>
    `; //input fields has type, id, name, placeholder

    //styling for expiry date
    const expirationInput = document.getElementById("expiration-date");

    expirationInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4); // Add `/` after 2 digits
        }
        e.target.value = value;
    });

    expirationInput.addEventListener("keydown", (e) => {
        // Prevent deleting the `/`
        if ((e.key === "Backspace") && expirationInput.selectionStart === 3) {
            e.preventDefault();
        }
    });



    // Add the event listener to the form after it is added to the DOM
    const submitForm = document.getElementById("submit-form");
    submitForm.addEventListener("submit", function (e) {
        e.preventDefault(); //do not forget e.preventDefault()

        const data = new FormData(submitForm);

        const name = data.get("fullname");
        const cardNumber = data.get("card-number");
        const cvv = data.get("cvv");

        console.log(name, cardNumber, cvv);
        setTimeout((e) => console.log("Thank you for your order"),1000)
        setTimeout((e) => console.log("How was your experience? Rate us."),2000)
    });

    const closeBtn = document.getElementById("close-btn")
    
    closeBtn.addEventListener("click", function(){
        paymentForm.style.display = 'none' //hide the form
    })


};


checkoutBtn.addEventListener("click", registerPaymentDetails);
