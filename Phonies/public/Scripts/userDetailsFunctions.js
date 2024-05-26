const phonesd = localStorage.getItem("phones")
const phones = JSON.parse(phonesd);

export function loadCustomerDetails( usr) {
    const container=document.querySelector("#userDetails");
    const username = document.createElement("p")
    const password = document.createElement("p")
    const surname = document.createElement("p")
    const address = document.createElement("p")
    const money = document.createElement("p")


    username.classList .add("userName");
    password.classList .add ("password");
    surname.classList.add("surname")
    address.classList.add("address")
    money.classList.add("money")
    username.id="userName"




    username.innerHTML = "<strong>Username: </strong>" + usr.username;
    password.innerHTML = "<strong>Password: </strong>" + usr.password;
    surname.innerHTML = "<strong>Surname: </strong>" + usr.surname
    address.innerHTML = "<Strong>Address: </strong>" + usr.address
    money.innerHTML = "<strong>Balance: </strong>" + usr.money

    container.appendChild(surname)
    container.appendChild(username)
    container.appendChild(password)
    container.appendChild(address)
    container.appendChild(money)


}



export function loadSellerDetails( usr) {
    const container=document.querySelector("#userDetails")

    const username = document.createElement("p")
    const password = document.createElement("p")
    const companyName=document.createElement("p")
    const bankAccount=document.createElement("p")
    const listedPhonesAmount=document.createElement("p")
    listedPhonesAmount.classList.add("listedPhonesAmount");



    username.classList.add("userName");
    password.classList.add("password");
    companyName.classList.add("companyName");
    bankAccount.classList.add("bankAccount")
    username.id="userName"



    username.innerHTML = "<strong>Username: </strong>" + usr.username;
    password.innerHTML = "<strong>Password: </strong>" + usr.password;
    companyName.innerHTML="<strong>Company: </strong>"+usr.companyName;
    bankAccount.innerHTML="<strong>Bank Account: </strong>"+usr.bankAccount;
    listedPhonesAmount.innerHTML="Lised Phones: "+sellerCurrentListedAmount(usr.username)


    container.appendChild(companyName)
    container.appendChild(username)
    container.appendChild(password)
    container.appendChild(bankAccount);
    container.appendChild(listedPhonesAmount)

}



export function loadAdminDetails( usr) {
    const container=document.querySelector("#userDetails")


    const username = document.createElement("p")
    const password = document.createElement("p")



    username.classList.add("userName");
    password.classList.add("password");
    username.id="userName"




    username.innerHTML = "<strong>Username: </strong>" + usr.username;
    password.innerHTML = "<strong>Password: </strong>" + usr.password;




    container.appendChild(username)
    container.appendChild(password)

}

function sellerCurrentListedAmount(username) {

    const amount = phones.reduce((a, v) => v.seller == username ? 1+a : a, 0);
    return amount
}