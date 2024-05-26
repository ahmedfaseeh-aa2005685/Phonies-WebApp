import {getCountries } from "./countries.js";
const countries=await getCountries();
const userData = localStorage.getItem("user");
const user = JSON.parse(userData);
const data = localStorage.getItem("phone");
const phone = JSON.parse(data);
const datau = localStorage.getItem("users");
const users = JSON.parse(datau)
const phonesData = localStorage.getItem("phones");
const phones = JSON.parse(phonesData);

export      function loadPhone(){
    const phonie=renderPhone(phone);
    const phoneDetails=document.querySelector("#phoneDetails")
    phoneDetails.appendChild(phonie)
}

