import { resetSearch } from "./searchFunction.js";

const data=await fetch("http://localhost:3000/api/users")
const users=await data.json()
const datau=localStorage.getItem("user");
const user=JSON.parse(datau);

export function showUserTab() {
    if (user !== null) {
        const userContainer = document.querySelector("#user");
        closeUserTab();
        const userTab = document.createElement("div");
        userTab.classList.add("userTab");

        const username = document.querySelector(".username")
        if (user.type == "customer") {
            
            const trans = document.createElement("div");
            trans.classList.add("transDiv");
            const transaction = document.createElement("p");
            const transactionLogo = document.createElement("img");
            transaction.classList.add("transaction");
            transactionLogo.classList.add("transLogo");


            const userDetails = document.createElement("div");
            userDetails.classList.add("usrDetails");
            const details = document.createElement("p");
            const detailsLogo = document.createElement("img");
            details.classList.add("details");
            detailsLogo.classList.add("detailsLogo")


            trans.style.cursor = "pointer";
            trans.addEventListener("click", (event) => {
                resetSearch()
                window.open("./transactions.html", "_self");
            })
            transactionLogo.src = "../Media/Icons/icons8-letter-64.png";
            transaction.innerHTML = "Transactions";


            userDetails.style.cursor = "pointer";
            userDetails.addEventListener("click", () =>{
                resetSearch()
                window.open("./userDetails.html", "_self")
            })
            details.innerHTML = "Details";
            detailsLogo.src = "../Media/Icons/icons8-view-details-32.png"

            trans.appendChild(transaction);
            trans.appendChild(transactionLogo);
            userTab.appendChild(trans);

            userDetails.appendChild(details);
            userDetails.appendChild(detailsLogo);
            userTab.appendChild(userDetails);

            username.addEventListener("click", (event) => {
                const u = document.querySelector(".username")
                const v = document.querySelector(".userImage")
                const w = document.getElementById("balance")
                u.style.display = "none";
                v.style.display = "none";
                w.style.display = "none";
                const firstChild = userContainer.firstChild;
                userContainer.insertBefore(userTab, firstChild);
            })

        }

        else if (user.type == "seller") {
            document.querySelector("#balance").style.display="none"
            const sellDiv = document.createElement("div");
            sellDiv.classList.add("sellDiv");
            const saleDiv = document.createElement("div");
            saleDiv.classList.add("saleDiv");

            const sell = document.createElement("p");
            const sellLogo = document.createElement("img");
            sell.classList.add("sell");
            sellLogo.classList.add("sellLogo");

            const sale = document.createElement("p");
            const saleLogo = document.createElement("img");
            sale.classList.add("sale");
            saleLogo.classList.add("saleLogo");

            sell.style.cursor = "pointer";
            sellLogo.style.cursor = "pointer";
            sale.style.cursor = "pointer";
            saleLogo.style.cursor = "pointer";

            const userDetails = document.createElement("div");
            userDetails.classList.add("usrDetails");
            const details = document.createElement("p");
            const detailsLogo = document.createElement("img");
            details.classList.add("details");
            detailsLogo.classList.add("detailsLogo")

            userDetails.style.cursor = "pointer";
            userDetails.addEventListener("click", () =>{
                window.open("./userDetails.html", "_self")
            })
            details.innerHTML = "Details";
            detailsLogo.src = "../Media/Icons/icons8-view-details-32.png"

            sell.addEventListener("click", (event) => {
                window.open("./sell.html", "_self");
            })
            sellLogo.addEventListener("click", (event) => {
                resetSearch()
                window.open("./sell.html", "_self");
            })
            sellDiv.addEventListener("click", () =>{
                resetSearch()
                window.open("./sell.html", "_self");
            })

            sale.addEventListener("click", (event) => {
                resetSearch()
                window.open("./transactions.html", "_self");
            })
            saleLogo.addEventListener("click", (event) => {
                resetSearch()
                window.open("./transactions.html", "_self");
            })
            saleDiv.addEventListener("click", (event) => {
                resetSearch()
                window.open("./transactions.html", "_self");
            })


            sellLogo.src = "../Media/Icons/sell.png";
            saleLogo.src = "../Media/Icons/sale.png"
            sell.innerHTML = "Sell Item";
            sale.innerHTML = "My Sales";

            sellDiv.appendChild(sell);
            sellDiv.appendChild(sellLogo);
            userTab.appendChild(sellDiv);

            saleDiv.appendChild(sale);
            saleDiv.appendChild(saleLogo);
            userTab.appendChild(saleDiv);

            userDetails.appendChild(details);
            userDetails.appendChild(detailsLogo);
            userTab.appendChild(userDetails);

            username.addEventListener("click", (event) => {
                const u = document.querySelector(".username")
                const v = document.querySelector(".userImage")
                u.style.display = "none";
                v.style.display = "none";
                userContainer.appendChild(userTab);
            })
        }

        else if(user.type=="admin"){
            document.querySelector("#balance").style.display="none"

            const userDetails = document.createElement("div");
            userDetails.classList.add("usrDetails");
            const details = document.createElement("p");
            const detailsLogo = document.createElement("img");
            details.classList.add("details");
            detailsLogo.classList.add("detailsLogo")

            userDetails.style.cursor = "pointer";
            userDetails.addEventListener("click", () =>{
                resetSearch()
                window.open("./userDetails.html", "_self")
            })
            details.innerHTML = "Details";
            detailsLogo.src = "../Media/Icons/icons8-view-details-32.png"

            userDetails.appendChild(details);
            userDetails.appendChild(detailsLogo);
            userTab.appendChild(userDetails);

            username.addEventListener("click", (event) => {
                const u = document.querySelector(".username")
                const v = document.querySelector(".userImage")
                u.style.display = "none";
                v.style.display = "none";
                userContainer.appendChild(userTab);
            })


            document.querySelector(".userImage").addEventListener("click",()=>{
                //rests users and phones
                localStorage.removeItem("phones")
                localStorage.removeItem("users")
                localStorage.removeItem("user")
                localStorage.removeItem("featuredPhones")
                alert("Phones and users reloaded successfully")
                starter()
            })
        }


        if(user.type == "customer"){
            userTab.addEventListener("mouseleave", (event) => {
                const u = document.querySelector(".username")
                const v = document.querySelector(".userImage")
                const w = document.getElementById("balance")
                u.style.display = "";
                v.style.display = "";
                w.style.display = "";
                userContainer.querySelector(".userTab").remove();
            })
        }
        else {
            userTab.addEventListener("mouseleave", (event) => {
                const u = document.querySelector(".username")
                const v = document.querySelector(".userImage")
                u.style.display = "";
                v.style.display = "";
                userContainer.querySelector(".userTab").remove();
            })
        }
    }
}

function closeUserTab() {
    const closeIt = document.querySelector(".userTab");
    console.log(closeIt);
    if (closeIt != null) {
        closeIt.replaceChildren();
        closeIt.remove();
    }
}