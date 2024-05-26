//import { mainPath,yourPath } from "./paths.js";
import { renderPhone } from "./renderPhones.js";

const phonesData = localStorage.getItem("phones");
const phones = JSON.parse(phonesData);




function letterss(word) {
    const list = []

    word = word.toLowerCase();
    for (var i = 0; i < word.length; i++) {
        list.push(word[i]);
    }
    return list;
}
function compare(ae, be) {
    const a = wordInt(ae);
    const b = wordInt(be);
    let er = 1;
    let len = 0;
    if (a.length < b.length) {
        len = a.length;
    }
    else {
        len = b.length;
    }


    for (var w = 0; w < len; w++) {
        let ax = a[w];
        let bx = b[w];
        if (ax > bx) {
            console.log(a[w] + " > " + b[w]);
            console.log(ae + " is bigger than " + be)
            return 2;
        }
        else if (a[w] == b[w]) {

        }
        else if (a[w] < b[w]) {
            console.log(a[w] + " < " + b[w]);
            console.log(ae + " is smaller than " + be)
            return 0
        }
    }
    console.log(er + " ." + ae + " ." + be)
    return er;

}






function wordInt(word) {
    const strength = []
    const letters = letterss(word);
    const numsAndLets = [{ let: "a", num: 25 }, { let: "b", num: 24 }, { let: "c", num: 23 }, { let: "d", num: 22 }, { let: "e", num: 21 }, { let: "f", num: 20 }, { let: "g", num: 19 }, { let: "h", num: 18 }, { let: "i", num: 17 }, { let: "j", num: 16 }, { let: "k", num: 15 }, { let: "l", num: 14 }, { let: "m", num: 13 }, { let: "n", num: 12 }, { let: "o", num: 11 }, { let: "p", num: 10 }, { let: "q", num: 9 }, { let: "r", num: 8 }, { let: "s", num: 7 }, { let: "t", num: 6 }, { let: "u", num: 5 }, { let: "v", num: 4 }, { let: "w", num: 4 }, { let: "x", num: 3 }, { let: "y", num: 2 }, { let: "z", num: 1 }
    ]
    for (var s = 0; s < letters.length; s++) {
        for (var d = 0; d < numsAndLets.length; d++) {
            let o = letters[s];
            let j = numsAndLets[d].let;
            if (letters[s] == numsAndLets[d].let) {
                strength.push(numsAndLets[d].num);
            }
        }
    }
    return strength;
}




function sort(t, dir, phonies) {
    console.log(" inside sort function");
    console.log(phonies)
    const type = t.toString();
    if (type == "price") {
        if (dir == "asc") {
            renderAfterSort(phonies.sort((a, b) => a.price - b.price))
        }
        else if (dir == "dsc") {
            renderAfterSort(phonies.sort((a, b) => b.price - a.price))
        }
    }
    //////////////////////
    if (type == "name") {
        if (dir == "asc") {
            renderAfterSort(phonies.sort((a, b) => compare(a.brand, b.brand) ? -1 : compare(b.brand, a.brand) ? 1 : 0))
        }
        else if (dir == "dsc") {
            renderAfterSort(phonies.sort((a, b) => compare(a.brand, b.brand) ? 1 : compare(b.brand, a.brand) ? -1 : 0))
        }
    }
    /////////////
    if (type == "storage") {
        if (dir == "asc") {
            renderAfterSort(phonies.sort((a, b) => a.storage - b.storage))
        }
        else if (dir == "dsc") {
            renderAfterSort(phonies.sort((a, b) => b.storage - a.storage))
        }
    }
    if (type == "year") {
        if (dir == "asc") {
            renderAfterSort(phonies.sort((a, b) => a.year - b.year))
        }
        else if (dir == "dsc") {
            renderAfterSort(phonies.sort((a, b) => b.year - a.year))
        }

    }
    //searchedPhones = phonies;
}
function renderAfterSort(phonz) {
    const container = document.querySelector("#items");
    container.replaceChildren();
    phonz.forEach((phone) => container.appendChild(renderPhone(phone)));
    //localStorage.removeItem("searchedPhones");
}
export function renderSort() {
    //if (mainPath == yourPath) {
        const container = document.querySelector("#itemsheader")
        const ic = document.querySelector("#typeContain");
        const name = document.createElement('a');
        const price = document.createElement('a');
        const year = document.createElement('a');
        const storage = document.createElement('a');
        const sortContain = document.createElement('div');
        const nameImg = document.createElement("img");
        const yearImg = document.createElement("img");
        const priceImg = document.createElement("img");
        const storageImg = document.createElement("img");
        name.style.cursor="pointer"
        price.style.cursor="pointer"
        year.style.cursor="pointer"
        name.style.cursor="pointer"
        storage.style.cursor="pointer"
        nameImg.style.cursor = "pointer";
        yearImg.style.cursor = "pointer";
        priceImg.style.cursor = "pointer";
        storageImg.style.cursor = "pointer";
        nameImg.src = "../Media/icons/sort.svg"
        yearImg.src = "../Media/icons/sort.svg"
        priceImg.src = "../Media/icons/sort.svg"
        storageImg.src = "../Media/icons/sort.svg"
        /////assign names/////////
        name.innerHTML = "Name";
        price.innerHTML = "Price";
        year.innerHTML = "Year";
        storage.innerHTML = "Storage";

        name.value = "name";
        price.value = "price";
        year.value = "year";
        storage.value = "storage";
        /////assign css selectors///
        name.classList.add("sortName");
        price.classList.add("sortPrice");
        year.classList.add("sortYear");
        storage.classList.add("sortStorage");
        sortContain.classList.add("sortContainer");
        ////adding events//////
        name.addEventListener("click", (event) => { replaceSortType(), showSortType(name, name.value) });
        price.addEventListener("click", (event) => { replaceSortType(), showSortType(price, price.value) });
        year.addEventListener("click", (event) => { replaceSortType(), showSortType(year, year.value) });
        storage.addEventListener("click", (event) => { replaceSortType(), showSortType(storage, storage.value) });
        name.addEventListener("mouseleave", (event) => { replaceSortType(); });
        price.addEventListener("mouseleave", (event) => { replaceSortType(); });
        year.addEventListener("mouseleave", (event) => { replaceSortType(); });
        storage.addEventListener("mouseleave", (event) => { replaceSortType(); });
        /////structure//////
        name.appendChild(nameImg);
        price.appendChild(priceImg);
        year.appendChild(yearImg);
        storage.appendChild(storageImg);
        sortContain.appendChild(name);
        sortContain.appendChild(year);
        sortContain.appendChild(price);
        sortContain.appendChild(storage);
        container.appendChild(sortContain);

   // }
}


function replaceSortType() {
    const ic = document.querySelector("#typeContain");
    ic.replaceChildren();
}


function showSortType(node, type) {
    const data=localStorage.getItem("searchedPhones");
let searchedPhones=JSON.parse(data);
    const typeContain = document.querySelector("#typeContain");
    const asc = document.createElement("button");
    const dsc = document.createElement("button");
    const sortType = document.createElement("div");
    sortType.classList.add("sortType")
    asc.innerHTML = "ascending"
    dsc.innerHTML = "descending"
    asc.value = "asc";
    dsc.value = "dsc";
    asc.addEventListener('click', (event) => { searchedPhones !=null ? (replaceSortType(), sort(type, asc.value, searchedPhones)) : (replaceSortType(), sort(type, asc.value, phones)) })
    dsc.addEventListener('click', (event) => { searchedPhones !=null  ? (replaceSortType(), sort(type, dsc.value, searchedPhones)) : (replaceSortType(), sort(type, dsc.value, phones)) })
    typeContain.appendChild(asc);
    typeContain.appendChild(dsc);
    node.appendChild(typeContain);
    //typeContain.appendChild(node);

}