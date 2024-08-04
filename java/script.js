//Card
let CardIcon = document.querySelector("#card_icon");
let Card = document.querySelector(".Card");
let CloseCard = document.querySelector("#card_close");

CardIcon.onclick = () => {
  Card.classList.add("active");
};

CloseCard.onclick = () => {
  Card.classList.remove("active");
};

//Cart Working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//making fanction
function ready() {
  //Remove item from cart
  var removeCartButtons = document.getElementsByClassName("card_remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
}

//Quantity Changes
var quantityInputs = document.getElementsByClassName("card_content");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

//Added to Cart
var addCart = document.getElementsByClassName("add-card");
for (var i = 0; i < addCart.length; i++) {
  var button = addCart[i];
  button.addEventListener("click", addCardclicked);
}

//Buy buttton
document
  .getElementsByClassName("btn_buy")[0]
  .addEventListener("click", buyButtonClicked);

//fuction Buy button
function buyButtonClicked() {
  let totalElement = document.getElementsByClassName("total_price")[0];
  let totalValue = parseFloat(totalElement.innerText.replace("$", ""));
  if (totalValue === 0) {
    alert("Your cart is empty");
  } else {
    alert("Your order is placed");
    let cartContent = document.getElementsByClassName("cart_content")[0];
    while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
  }
}

//Add cart function

function addCardclicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("Product_title")[0].innerText;
  var price = shopProducts.getElementsByClassName("Price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("Product_img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

//add to cart function

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart_box");
  var cartItems = document.getElementsByClassName("cart_content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("card_product_title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You Have Already Add this Items To Cart");
      return;
    }
  }
  var cartBoxContent = ` 
                        <img src="${productImg}" alt="" class="card_img">
                        <!-- Cartbox -->
                        <div class="box_details">
                            <div class="card_product_title">${title}</div>
                            <div class="product_price">${price}</div>
                            <input type="number" value="1" class="card_quantity">
                        </div>

                        <!-- Remove card -->
                        <i class='bx bxs-trash card_remove'></i>
                      `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName("card_remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("card_quantity")[0]
    .addEventListener("click", quantityChanged);
}

function removeCartItem(event) {
  var buttonclicked = event.target;
  buttonclicked.parentElement.remove();
  updatetotal();
}

// Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

//Updata Total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart_content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart_box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("product_price")[0];
    var quantityElement = cartBox.getElementsByClassName("card_quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // price have same content value
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total_price")[0].innerText = "$" + total;
}


//search button
function searchWord() {
	// Get the word to search from the input field
	var word = document.getElementById("searchInput").value.toLowerCase();
	
	// Get all h2 elements with the class "title_section"
	var titles = document.querySelectorAll("h2.Product_title");

	// Variable to keep track if the word was found
	var found = false;

	// Loop through each title
	titles.forEach(function(title) {
			// Remove previous highlights
			title.classList.remove("highlight");

			// Check if the title contains the word
			if (title.textContent.toLowerCase().includes(word)) {
					// Highlight the title
					title.classList.add("highlight");

					// Scroll to the title if it's the first match
					if (!found) {
							title.scrollIntoView({ behavior: 'smooth', block: 'center' });
							found = true;
					}
			}
	});

	// Alert if no matches were found
	if (!found) {
			alert("No matching titles found.");
	}
}