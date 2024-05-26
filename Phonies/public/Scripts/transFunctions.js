
import { renderPhone } from "./renderPhones.js";
const userData = localStorage.getItem('user'); // Assuming user data is stored under 'user' key
const user = JSON.parse(userData);

export function loadSeller() {
    const listedPhonesButton = document.querySelector("#listedPhonesButton");

    listedPhonesButton.addEventListener("click", (event) => {
        document.querySelector("#listedPhonesContainer").replaceChildren()
        document.querySelector("#salesContainer").replaceChildren();
        // Fetch and parse phones data
        const phones = JSON.parse(localStorage.getItem('phones') || '[]');
        // Filter phones based on logged-in user's username
        const userPhones = phones.filter((phone) => phone.seller == user.username);
        console.log(userPhones);

        // Display phones
        const container = document.querySelector('#listedPhonesContainer'); // Ensure you have a div with this id in your HTML
        userPhones.forEach(phone => {
            const phoneElement = document.createElement('div');
            phoneElement.classList.add("eachPhone");
            phoneElement.innerHTML = `
                <div class="sellerItem">
                <h4>${phone.brand} ${phone.name}</h4>
                <img src="${phone.img}" alt="${phone.name}" class="phoneImg">
                <p>Year: ${phone.year}</p>
                <p>Storage: ${phone.storage}GB</p>
                <p>Quantity Left: ${phone.quantity}</p>
                <p class="price"><strong>${phone.price}</strong>QR</p>
                </div>
                `;
            phoneElement.addEventListener("click", (event) => {
                localStorage.setItem("phone", JSON.stringify(phone))
                window.open("./item.html", "_self")
            })
            container.appendChild(phoneElement);
        });

        if (userPhones.length === 0) {
            container.innerHTML = '<p>No phones found for this seller.</p>';
        }

    })
    const salesButton = document.querySelector("#salesButton");
    salesButton.addEventListener("click", (event) => {
        const con = document.querySelector("#listedPhonesContainer")
        if (con != null) {
            con.replaceChildren();
        }
        const userTransactions = user.transactions;
        console.log(userTransactions)
        const salesContainer = document.querySelector("#salesContainer")
        userTransactions.forEach((t) => salesContainer.appendChild(getTransaction(t)));

    })
}


export function loadCustomer() {
    const userTransactions = user.transactions;
    if(userTransactions.length>=1){
    console.log(userTransactions)
    const salesContainer = document.querySelector("#salesContainer")
    userTransactions.forEach((t) => salesContainer.appendChild(getTransaction(t)));}
    else{
        alert("No Previous Purchases")
    }
}



function getTransaction(tran) {
    const adList = tran.address
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    const phoneBox = renderPhone(tran.phone);
    const address = document.createElement("p")
    const zip = document.createElement("p")
    const name = document.createElement("p")
    const city = document.createElement("p")
    const country = document.createElement("p")
    const state = document.createElement("p")
    const quantity = document.createElement("p")
    const total = document.createElement("p");
    const date = document.createElement("p");
    const buyer = document.createElement("p");
    const price=document.createElement("p");
    const seller=document.createElement("p")
    console.log(tran.address);
    seller.classList.add("seller")
    name.classList.add("name")
    price.classList.add("Pricee")
    city.classList.add("city")
    country.classList.add("country")
    state.classList.add("state")
    address.classList.add("address")
    quantity.classList.add("quantity")
    total.classList.add("total")
    date.classList.add("date")
    buyer.classList.add("buyer")
    //alert("")
    console.log(tran.address)
    seller.innerHTML="<strong>Seller: </strong>"+tran.seller
    name.innerHTML ="<strong>Full Name: </strong>"+ adList.name
    city.innerHTML = "<strong>City: </strong>"+adList.city
    country.innerHTML ="<strong>Country: </strong>"+ adList.country
    state.innerHTML ="<strong>State: </strong>"+ adList.state
    zip.innerHTML = "<strong>Zip: </strong>"+adList.zip
    address.innerHTML ="<strong>Address: </strong>" +adList.ad
    quantity.innerHTML = "<strong>Quantity: </strong>"+tran.quantity
    total.innerHTML ="<strong>Total: </strong>"+ tran.total+"QR"
    date.innerHTML ="<strong>Transaction Date: </strong>"+ tran.date
    buyer.innerHTML ="<strong>Buyer's Name: </strong>"+ tran.buyer;
    price.innerHTML="<strong>Phone's Price: </strong>"+tran.phone.price+"QR"
    
    top.appendChild(phoneBox)
    bottom.appendChild(buyer)
    bottom.appendChild(seller)
    bottom.appendChild(date)
    top.classList.add("transTop")
    bottom.classList.add("transBottom")
    bottom.appendChild(name)
    bottom.appendChild(country)
    bottom.appendChild(city)
    bottom.appendChild(state)
    bottom.appendChild(address)
    bottom.appendChild(zip)
    bottom.appendChild(price)
    bottom.appendChild(quantity)
    bottom.appendChild(total)
    const tarnsBox = document.createElement("div");
    tarnsBox.classList.add("transBox")
    tarnsBox.appendChild(top)
    tarnsBox.appendChild(bottom)
    tarnsBox.classList.add("transBox")
    return tarnsBox
}