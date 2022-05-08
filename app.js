let products = document.getElementById("product-card");
let cartproducts = document.getElementById("cart-card");
const element = document.getElementsByClassName("nav-content");
const heading = document.getElementById("store-name");
let orders = document.getElementById("cart-total");
let logo = document.getElementById("cart-logo");
let productArray = [];
let cartArray = [];
 
async function Fetchapi(path=" ") {
    const url = `https://fakestoreapi.com/products/${path}`;
    const response = await fetch(url);
    let data = await response.json();
    ProductCard(data)
}

Fetchapi();

function ProductCard(data){
    for(let i = 0; i < data.length; i++){
        let product = document.createElement("product")
        let pic = document.createElement("pic")
        let information = document.createElement("information")
        pic.innerHTML =  '<img src="'+data[i].image+'">';
        information.innerHTML = '<h3>'+data[i].title+'</h3>'+'<h4>'+"$ "+data[i].price+'</h4>'+'<button data-id = '+data[i].id+'>'+"Add to Cart"+'</button>';
        products.appendChild(product);
        product.appendChild(pic);
        product.appendChild(information);
    }
}

for(i=0; i<element.length; i++){
    element[i].addEventListener("click", NavClick);
}

function NavClick(){
    products.innerHTML = '';
    orders.innerHTML = '';
    const category = (this.innerHTML)
    Fetchapi("category/"+category.toLowerCase())
}

heading.addEventListener("click",TitleClick);

function TitleClick(){
    products.innerHTML= '';
    orders.innerHTML = '';
    Fetchapi()
}

products.addEventListener("click",AddtoCart);
cartproducts.addEventListener("click",DeletefromCart);

logo.innerHTML = '\uD83D\uDED2'+productArray.length;

function AddtoCart(event){
    if(event.target.matches("button")){
        const id = event.target.getAttribute("data-id");
        productArray.push(id);
        logo.innerHTML = '\uD83D\uDED2'+productArray.length;        
    }
}

function DeletefromCart(event){
    if(event.target.matches("button")){
        const id = event.target.getAttribute("data-did");
        productArray = productArray.filter((item) => item !== id);
        cartItem(productArray)
        logo.innerHTML = '\uD83D\uDED2'+productArray.length;        
    }
}

logo.addEventListener("click",logoClick);

function logoClick(event){
    if(event.target.matches("#cart-logo")){
        if(productArray){
            cartItem(productArray)
        }else{
            cartTotal()
        }
    }
}

async function cartItem(productArray){
    cartArray = []
    for(let i = 0; i < productArray.length; i++){
        const response = await fetch(`https://fakestoreapi.com/products/${productArray[i]}`);
        const data = await response.json();
        cartArray.push(data);
        console.log(cartArray)
        cartSummary(cartArray)
    }
}

function cartSummary(cartArray){
    orders.innerHTML = '';
    products.innerHTML='';
    cartproducts.innerHTML='';
    let order;
    let sum = 0;
    let total = 0;
    let price = [];
    for(let i = 0; i < cartArray.length; i++){
        let cartproduct = document.createElement("cartproduct")
        let cartpic = document.createElement("cartpic")
        let cartinformation = document.createElement("cartinformation")
        cartpic.innerHTML =  '<img src="'+cartArray[i].image+'">';
        cartinformation.innerHTML = '<h3>'+cartArray[i].title+'</h3>'+'<h4>'+"$ "+cartArray[i].price+'</h4>'+'<button data-did = '+cartArray[i].id+'>'+"Delete"+'</button>';
        cartproducts.appendChild(cartproduct);
        cartproduct.appendChild(cartpic);
        cartproduct.appendChild(cartinformation);
        price.push(cartArray[i].price)
    }
    for(let i = 0; i < price.length; i++){      
    total += price[i];
    }
    if (total === 0) {
      sum = 0;
    } else if (total < 100) {
      sum = 99;
    } else {
      sum = 0;
    }
    order = total + sum;

    cartTotal(total,sum,order)
}


function cartTotal(total,sum,order){
    let cartTotal = document.createElement("div");
    cartTotal.setAttribute("id","cartTotal")
    let summary = document.createElement("summary");
    summary.setAttribute("id","summary");
    let subTotal = document.createElement("subTotal");
    subTotal.setAttribute("id","subTotal")
    let delivery = document.createElement("delivery"); 
    delivery.setAttribute("id","delivery");
    let Total = document.createElement("total");
    Total.setAttribute("id","Total");
    summary.innerHTML = '<h3>Order Summary</h3>';
    subTotal.innerHTML = '<p>Items:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'+total+'</p>';
    delivery.innerHTML = '<p>Delivery:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'+sum+'</p>';
    Total.innerHTML = '<p>Order Total:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'+order+'</p>';
    orders.appendChild(cartTotal)
    cartTotal.appendChild(summary);
    cartTotal.appendChild(subTotal);
    cartTotal.appendChild(delivery);
    cartTotal.appendChild(Total);
}