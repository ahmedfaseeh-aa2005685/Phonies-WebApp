import { renderPhone } from "./renderPhones.js";
const data=localStorage.getItem("phones");
const phones=JSON.parse(data);
let searchedPhones=[]
export function resetSearch(){
    searchedPhones=[]
    localStorage.removeItem("searchedPhones")
}
export function searchPhone() {
    if (document.querySelector(".cancelSearch") != null) {
        document.querySelector(".cancelSearch").remove();
    }

    


    const searchResult = searchAlgo();
    
    const container = document.querySelector("#items");
    container.replaceChildren();
    console.log(searchResult);
    if(searchResult!=undefined){
    searchedPhones=searchResult.map((e)=>e)
    console.log(searchedPhones);
    localStorage.setItem("searchedPhones",JSON.stringify(searchedPhones))
    searchResult.forEach((phone) => container.appendChild(renderPhone(phone)));}
    const searchDiv = document.querySelector("#searchDiv");
    const cancelSearch = document.createElement("img");
    cancelSearch.src = "../Media/icons/circlex.svg";
    cancelSearch.classList.add("cancelSearch");
    cancelSearch.style.cursor = "pointer"
    cancelSearch.addEventListener("click", (event) => 
    {
        localStorage.removeItem("searchedPhones")
        const searchRequest = document.querySelector("#searchBar").value=""
        renderPhones();
        searchedPhones=[]
        cancelSearch.remove();

    })
    cancelSearch.addEventListener("mouseover", (event) => {
        cancelSearch.src = "../Media/icons/circlexHover.svg"

    })
    cancelSearch.addEventListener("mouseout", (event) => {
        cancelSearch.src = "../Media/icons/circlex.svg"

    })


    searchDiv.appendChild(cancelSearch);
}
function notEmpty(li){
    return li.length!==0;
}


function searchAlgo(){
    let result=[];
    const searchRequest = document.querySelector("#searchBar").value;
    let keywords = searchRequest.split(" ");
    const len=keywords.length
    keywords=keywords.filter((e)=> e!="")
    keywords.reverse();
    const e="fr"
    const clearSpace=(li)=>( i.filter((e)=>e!=""))
    ////methods////
    const splits = (a) => a.toLowerCase().split(" ").filter((x)=>x!='');
    const searchInt = (keys, int) => keys.reduce((a, v) => v == int ? true : a, false);
    const searchString = (keys, value) => keys.reduce((a, v) => splits(value).reduce((x, s) => s.startsWith(v)||s.endsWith(v) ? true : x, false) ? true : a, false)
    const searchString2 = (keys, value) => keys.reverse().reduce((a, v) => {
        let r;
        r= splits(value).reverse().reduce((x, s) =>s.endsWith(v) ? true : x, false)

        if(r){
            return true
        }
        r= splits(value).reverse().reduce((x, s) =>s.endsWith(v)? true : x, false);

        
        if(r){
            return true
        }
    })
    


    //////very specific search e.g()///////////1st/////////////
   result= phones.filter((e) =>
    
    (( searchString(keywords, e.brand) && searchInt(keywords, e.storage) ||
        searchString(keywords, e.brand) && searchInt(keywords, e.year) || searchString(keywords, e.name) && searchInt(keywords, e.year) ||
        searchString(keywords, e.name) && searchInt(keywords, e.storage) || searchInt(keywords, e.storage) && searchInt(keywords, e.year) )
                    &&


        (searchString(keywords, e.brand) || searchString(keywords, e.name) ||    searchInt(keywords, e.year) || searchInt(keywords, e.storage)))

    )
    if(notEmpty(result)){
        console.log("1st")
        return result;
    }
///////////2nd search////////////
   if(len==2){
    console.log(len)
    result= phones.filter((e) =>
    
    (

        searchString2(keywords, e.name) )
    )

    if(notEmpty(result)){
        console.log("2nd")
        return result;
    }}
    ///////////3rd search////////////
   if(len==3){
    console.log(len);
    result= phones.filter((e) =>
    
    (

        searchString2(keywords, e.name) )
    )

    if(notEmpty(result)){
        console.log("3rd")
        return result;
    }}
///////////4th search////////////
    result= phones.filter((e) =>
    
    (
        searchString(keywords, e.brand) && searchString(keywords, e.name) )
    )
    if(notEmpty(result)){
        console.log("4th")
        return result;
    }
///////////5th search////////////

    result= phones.filter((e) =>
    
    ((searchString(keywords, e.brand) && searchString(keywords, e.name) || searchString(keywords, e.brand) && searchInt(keywords, e.storage) ||
        searchString(keywords, e.brand) && searchInt(keywords, e.year) || searchString(keywords, e.name) && searchInt(keywords, e.year) ||
        searchString(keywords, e.name) && searchInt(keywords, e.storage) || searchInt(keywords, e.storage) && searchInt(keywords, e.year) )
                    ||


        (searchString(keywords, e.brand) || searchString(keywords, e.name) ||    searchInt(keywords, e.year) || searchInt(keywords, e.storage)))

    )
    if(notEmpty(result)){
        console.log("5th")
        return result;
    }
    

}
