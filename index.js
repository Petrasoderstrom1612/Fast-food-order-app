import {menuArray} from "./data.js"
const menu = document.getElementById("menu")
const cart = document.getElementById("cart")
const allItemsInCart = document.getElementById("all-items-in-cart")
const checkoutBtn = document.getElementById("checkout-btn")
const paymentForm = document.getElementById("payment-form")
const innerPaymentForm = document.getElementById("inner-payment-form")
const closeBtn = document.getElementById("close-btn")

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


const blockNumbers = (event) => {
    const key = event.key
    if(/[0-9]/.test(key)){
        event.preventDefault()
    }
}

const registerPaymentDetails = () => {
    paymentForm.style.display = "block"; //show the form
    innerPaymentForm.innerHTML = `                                   
    
    <h2>Enter card details</h2>
    <form id="submit-form">
    <input required type="text" id="firstname" name="firstname" placeholder="Firstname" aria-label="firstname"/>
    <input required type="text" id="lastname" name="lastname" placeholder="Lastname" aria-label="lastname"/>
    <input required type="number" id="card-number" name="card-number" placeholder="Enter card number" aria-label="card-number"/>
    <input required type="expiration-date" id="expiration-date" class="expiration-date" name="expiration-date" placeholder="MM/YY" maxlength="5" aria-label="expiration date"/>
    <input required type="number" id="cvv" name="cvv" placeholder="CVV" 
    min="100" 
    max="999" 
    oninput="this.value = this.value.slice(0, 3)"  aria-label="CVV"/>
    <span id="cvv-error" style="color: red; display: none;">Please enter a valid 3-digit CVV.</span>
    <button class="submit-btn" type="submit">Pay</button>
    </form>
    `; //input fields has type, id, name, placeholder
    
    
    closeBtn.addEventListener("click", function(){
        console.log("closing")
        paymentForm.style.display = 'none' //hide the form
    })
    
    //enter only characters and not numbers
    document.getElementById('firstname').addEventListener('keypress', blockNumbers);
    document.getElementById('lastname').addEventListener('keypress', blockNumbers);
    
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
            e.preventDefault(); //the browser assumes you are sending data to a server and you are done with it so it displays the string with all the information you filled in the url, e.preventDefault() listens on this submit event and hides it
        }
    });
    
    const cvvInput = document.getElementById("cvv");
    
    // Clear the custom error message when the user types
    cvvInput.addEventListener("input", () => {
        cvvInput.setCustomValidity("");
    });
    
    // Set a custom error message for invalid input
    cvvInput.addEventListener("invalid", () => { //maxlength attribute works only for type="text"
        if (cvvInput.value.length !== 3) {
            cvvInput.setCustomValidity("CVV must be exactly 3 digits.");
        }
    });
    
    // Add the event listener to the form after it is added to the DOM
    document.getElementById("submit-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form from reloading the page
    
        const dataFromTheForm = new FormData(submitForm);
        const firstname = dataFromTheForm.get("firstname");
        console.log(firstname);
    
        const dataFromTheFormObject = Object.fromEntries(dataFromTheForm.entries());
        console.log(dataFromTheFormObject);
    
        const closeBtn = document.getElementById("close-btn");
        const innerPaymentForm = document.getElementById("inner-payment-form");
        const paymentForm = document.getElementById("payment-form");
    
        setTimeout(() => {
            closeBtn.disabled = true;
            innerPaymentForm.innerHTML = `
                <div class="modal-after-purchase">
                    <img src="images/loading.svg" class="loading">
                    <p class="arimo-font">Processing the order...</p>
                </div>`;
        }, 1000);
    
        setTimeout(() => {
            innerPaymentForm.innerHTML = `
                <div class="modal-after-purchase">
                    <p class="arimo-font">Thank you for your purchase, ${firstname}!</p>
                </div>`;
            document.getElementById("close-btn-rate-experience")?.addEventListener("click", () => {
                console.log("closing");
                paymentForm.style.display = "none"; // Hide the form
            });
        }, 4000);
    
        setTimeout(() => {
            closeBtn.disabled = false; //aria labels on icons is per default unless you disable it
            innerPaymentForm.innerHTML = `
                <p class="arimo-font rate-experience">Please rate your experience with us!</p>
                <div class="modal-after-purchase">
                    <form id="stars-form">
                        <div class="stars-div">
                            <i class="fa-regular fa-star" title="1"></i>
                            <i class="fa-regular fa-star" title="2"></i>
                            <i class="fa-regular fa-star" title="3"></i>
                            <i class="fa-regular fa-star" title="4"></i>
                            <i class="fa-regular fa-star" title="5"></i>
                        </div>
                        <input type="hidden" name="rating" id="rating-value" value="0">
                        <button type="submit" class="rate-experience-btn">Submit</button>
                    </form>
                </div>`;
    
            setUpStarRating();
    
            document.getElementById("close-btn-rate-experience")?.addEventListener("click", () => {
                console.log("closing");
                paymentForm.style.display = "none"; // Hide the form
            });
        }, 6000);
    
        const setUpStarRating = () => {
            const stars = document.querySelectorAll(".stars-div i");
            const ratingInput = document.getElementById("rating-value");
    
            stars.forEach((star, index) => { //set up when the page is loaded
                star.addEventListener("click", () => { 
                    stars.forEach((s, i) => { //changed by click
                        s.classList.toggle("fa-solid", i <= index);
                        s.classList.toggle("fa-regular", i > index);
                    });
                    ratingInput.value = index + 1; // Set the selected star rating
                    console.log(`Selected rating: ${ratingInput.value}`);
                });
            });
        };
    
        document.addEventListener("submit", (e) => {
            if (e.target && e.target.id === "stars-form") {
                e.preventDefault();
    
                const starsForm = e.target;
                const dataFromTheRatingForm = Object.fromEntries(new FormData(starsForm).entries());
                console.log(dataFromTheRatingForm);
            }
        });
    });
    
};



checkoutBtn.addEventListener("click", registerPaymentDetails); //this one must be after the function is declared