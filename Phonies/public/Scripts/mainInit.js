import { logged } from "./LogFunction.js";
import { renderFeaturedPhones, renderPhones } from "./renderPhones.js";
import { showUserTab } from "./userTabFunction.js";
import { renderSort } from "./sortFunction.js";
//import { yourPath, mainPath } from "./paths.js"
import { searchPhone } from "./searchFunction.js";




    
    const userData =  localStorage.getItem("user");
    const user = JSON.parse(userData);

    const usersDatas =await fetch("http://localhost:3000/api/users")
    const users =await usersDatas.json()



    

    function popem(a) {
        for (var x = 0; x < a; x++) {
            phones.pop();
        }
        localStorage.removeItem("phones")
        //localStorage.setItem("phones", JSON.stringify(phones));
    }
    ///////used to manually delete phones///
    popem();



    let searchedPhones = [];




    function renderFunctions() {

        //localStorage.removeItem("phone");

        //if (mainPath == yourPath) {
            const searchButton = document.querySelector("#searchButton");
            const searchImg = document.querySelector(".searchImage");
            document.addEventListener("keypress", (event) => { event.key == "Enter" ? searchPhone() : null })
            searchButton.addEventListener("mouseover", (event) => {
                searchImg.src = "../Media/Icons/searchHover.svg"
            })
            searchButton.addEventListener("mouseout", (event) => {
                searchImg.src = "../Media/Icons/search.svg"
            })
            searchButton.addEventListener("click", (event) => {
                const searchRequest = document.querySelector("#searchBar").value;
                if (searchRequest != "") {
                    localStorage.removeItem("searchedPhones")
                    searchPhone();
                }
            })
       // }
    }









    logged();
    renderFunctions();
    showUserTab()
    renderSort();
    renderFeaturedPhones();
    renderPhones();





 
    


