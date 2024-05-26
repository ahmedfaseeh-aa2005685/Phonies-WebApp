//import { mainPath } from "./paths.js";
import { resetSearch } from "./searchFunction.js";
const data=await fetch("http://localhost:3000/api/users")
const users=await data.json()
const datau=localStorage.getItem("user");
const user=JSON.parse(datau);



export function logged() {
    if (user == null) {

        const nav2 = document.querySelector("#loginButton");
        const nav1 = document.querySelector("#user");
        nav2.replaceChildren();
        const loginButton = document.createElement("a");
        loginButton.classList.add("login");
        loginButton.innerHTML = "Login";
        
        const guest = document.createElement("p");
        guest.innerHTML = "Guest"
        guest.classList.add("guest");
        const userImage = document.createElement("img");
        userImage.src = "../Media/icons/user.svg";
        userImage.classList.add("userImage");
        nav1.appendChild(userImage);
        nav1.appendChild(guest);
     
        nav2.addEventListener("click", (event) => {

            //localStorage.setItem("prevPath", (JSON.stringify(mainPath)))
        })
        loginButton.addEventListener("click",(event)=>{

            resetSearch()
            window.open("./login.html","_self")
        })
        nav2.appendChild(loginButton);
        
        //if(nav.hasChildNodes==false){
        //nav.replaceChildren();
        //
        //const loginButton= document.createElement("button");
        //loginButton.innerHTML="Login";
        //loginButton.addEventListener("click",()=>{
        // open("./login.html");
        //})

    }


    else {
        const nav2 = document.querySelector("#loginButton")
        const nav1 = document.querySelector("#user");
        const userImage = document.createElement("img");
        userImage.src = "../Media/icons/user.svg";
        userImage.classList.add("userImage");
        nav2.replaceChildren();
        const logoutButton = document.createElement("button");
        logoutButton.innerHTML = "Logout";
        logoutButton.classList.add("logoutButton");
        const usernam = document.createElement("p");
        const balance = document.createElement("p");
        balance.classList.add("#balance");
        balance.id="balance"
        balance.innerHTML=user.money
        balance.style.color="white"
        usernam.innerHTML = ` ${user.username}`;
        usernam.classList.add("username");
        logoutButton.addEventListener("click", () => {
          

            localStorage.setItem("user",JSON.stringify(user))
            logout();
        })
        nav1.appendChild(userImage);
        nav1.appendChild(usernam);
        nav1.appendChild(balance)
        nav2.appendChild(logoutButton);
    }
}
function logout() {
    updateUser();
    
    resetSearch()
   
    window.open("./main.html" , "_self");

}
function updateUser(){

    const ind=users.findIndex((u)=> u.username==user.username)
    users[ind]=user;

    localStorage.removeItem("user");
    
}