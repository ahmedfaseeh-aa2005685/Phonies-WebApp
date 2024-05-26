import { logged } from "./LogFunction.js";

import { loadCustomer, loadSeller } from "./transFunctions.js";
import { showUserTab } from "./userTabFunction.js";

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const userData = localStorage.getItem('user'); // Assuming user data is stored under 'user' key
    const user = JSON.parse(userData);

    if (!user) {
        alert('Please log in to view your transactions.');
        window.location.href = './login.html'; // Redirect to login page
        return;


    }
    else if(user.type=="Seller"){
        document.querySelector("#listedPhonesButton").style.display=""
        document.querySelector("#salesButton").style.display=""
        loadSeller()

    }
    else if(user.type=="Customer"){
        document.querySelector("#listedPhonesButton").style.display="none"
        document.querySelector("#salesButton").style.display="none"
        loadCustomer()
        


    }
    logged();
    showUserTab();
    

});
