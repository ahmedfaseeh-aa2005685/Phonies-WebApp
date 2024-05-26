import { showUserTab } from "./userTabFunction.js";
import { logged } from "./LogFunction.js";
import {
  checkFeatured,
  renderFeaturedPhones,
  renderPhone,
  removeFromFeatured,
} from "./renderPhones.js";

const phones = [];
const phonesd = await fetch("http://localhost:3000/api")
  .then((res) => res.json())
  .then((phs) => {
    phs.map((phone) => {
      phones.push(phone);
    });
  });
//to get the logged in user
const userData = localStorage.getItem("user");
const user = JSON.parse(userData);
//
const getPage = (a) => a.split("/").reduce((a, v) => v);
const yourPath = getPage(window.location.pathname);
const mainPath = "./item.html";
const prevData = localStorage.getItem("prevPath");
const prevPath = JSON.parse(prevData);
console.log("current :" + yourPath);
console.log("previous:" + prevPath);

//function init(){
const data = localStorage.getItem("phone");
const phone = JSON.parse(data);
console.log(phone + "phone cur");
renderPhonie(phone);
//}
function renderPhonie(phone) {
  const phoneBox = document.querySelector("#item");
  const top = document.createElement("div");
  const bottom = document.createElement("div");
  //const buttons=document.createElement("div")
  bottom.classList.add("phoneDetails");

  phoneBox.classList.add("phone");
  // buttons.classList.add("buttons")
  ////elements of the phone///

  const brand = document.createElement("p");
  brand.classList.add("brand");
  const name = document.createElement("p");
  const year = document.createElement("p");
  const price = document.createElement("p");
  const storage = document.createElement("p");
  const img = document.createElement("img");
  const buyButton = document.createElement("button");
  const removeButton = document.createElement("button");
  const editQuanButton = document.createElement("button");
  buyButton.classList.add("buyButton");
  editQuanButton.classList.add("editQuanButton");
  editQuanButton.addEventListener("click", () => {
    editQuan();
  });
  removeButton.classList.add("buyButton");
  removeButton.addEventListener("click", (event) => {
    const delet = phones.findIndex(
      (p) =>
        p.model == phone.model &&
        p.brand == phone.brand &&
        p.storage == phone.storage &&
        phone.seller == p.seller &&
        phone.price == p.price
    );
    console.log(phones[delet]);

    const dta = JSON.parse(localStorage.getItem("featuredPhones"));

    dta.filter((e) => e != phone.id);
    localStorage.setItem("featuredPhones", JSON.stringify(dta));

    phones.splice(delet, 1);
    //localStorage.setItem("phones", JSON.stringify(phones))

    window.open("/main.html", "_self");
  });

  const seller = document.createElement("p");
  const total = document.createElement("p");
  const quantityv = document.createElement("p");
  quantityv.id = "quantity";
  ///////////////assing values to each element////////////////////
  editQuanButton.innerHTML = "Edit Quantity";
  if (checkStock()) {
    quantityv.innerHTML = "Quantity: " + phone.quantity;
  } else {
    quantityv.innerHTML = "Quantity: " + 0;
  }
  total.innerHTML = phone.price;
  total.classList.add("total");
  seller.innerHTML = "Seller: " + phone.seller;
  removeButton.innerHTML = "Remove Phone";
  buyButton.innerHTML = "Buy Now!";

  brand.innerHTML = phone.brand;
  name.innerHTML = "Model: " + phone.name;
  year.innerHTML = "Year: " + phone.year;
  price.innerHTML = "Price: " + phone.price;
  storage.innerHTML = "Storage: " + phone.storage;
  img.src = phone.img;

  ////////////// attaching elements///////////
  top.appendChild(brand);
  top.appendChild(img);
  bottom.appendChild(name);
  bottom.appendChild(year);
  bottom.appendChild(price);
  bottom.appendChild(storage);
  bottom.appendChild(quantityv);

  bottom.appendChild(seller);

  if (checkStock()) {
    if (user != null) {
      if (user.type == "seller" || user.type == "admin") {
        if (user.username == phone.seller) {
          bottom.appendChild(editQuanButton);
          bottom.appendChild(removeButton);
        } else if (user.type == "admin") {
          bottom.appendChild(removeButton);
          const setFeatureButton = document.createElement("button");
          setFeatureButton.classList.add("buyButton");
          setFeatureButton.innerHTML = "Set as Featured Phone";
          setFeatureButton.addEventListener("click", () => {
            //const dta=JSON.parse(localStorage.getItem("featuredPhones"))
            //dta.push(phone.id)

            //localStorage.setItem("featuredPhones",JSON.stringify(dta))
            addFeatured(phone.id);
            window.open("./main.html", "_self");
          });
          if (checkFeatured(phone) == false) {
            bottom.appendChild(setFeatureButton);
          } else {
            const removeFromFeat = document.createElement("button");
            removeFromFeat.classList.add("buyButton");
            removeFromFeat.innerHTML = "Remove Featured";
            removeFromFeat.addEventListener("click", (evet) => {
              removeFromFeatured(phone);
            });
            bottom.appendChild(removeFromFeat);
          }
        } else {
          bottom.appendChild(buyButton);
          buyButton.addEventListener("click", (event) => {
            purchase();
          });
        }
      } else {
        bottom.appendChild(buyButton);
        buyButton.addEventListener("click", (event) => {
          purchase();
        });
      }
    } else {
      bottom.appendChild(buyButton);
      buyButton.addEventListener("click", (event) => {
        purchase();
      });
    }
  } else {
    buyButton.innerHTML = "Out of Stock";
    bottom.appendChild(buyButton);
  }

  phoneBox.appendChild(top);
  phoneBox.appendChild(bottom);
  //phoneBox.append(buttons);
}
function purchase() {
  if (user != null) {
    if (user.type == "customer") {
      localStorage.setItem("phone", JSON.stringify(phone));
      //user.transactions.push(phone);
      window.open("./purchase.html", "_self");
    } else {
      window.alert("you are not a customer");
    }
  } else {
    window.alert("you are not logged in");
    setTimeout(() => {
      window.open("./login.html", "_self");
    }, 1000);
  }
}
function editQuan() {
  const select = document.createElement("input");
  const sub = document.createElement("button");
  document.querySelector(".editQuanButton").replaceWith(select, sub);

  sub.innerHTML = "Submit";
  select.setAttribute("type", "number");
  select.setAttribute("min", 1);
  select.setAttribute("setp", 1);
  select.setAttribute("value", 1);

  sub.addEventListener("click", () => {
    phone.quantity = "Quantity" + select.value;
    document.querySelector("#quantity").innerHTML = "Quantity: " + select.value;
    const editQuanButton = document.createElement("button");
    editQuanButton.classList.add("editQuanButton");
    editQuanButton.innerHTML = "Edit Quantity";
    select.remove();
    sub.remove();
    updatePhone(select.value);
    document.querySelector(".phoneDetails").appendChild(editQuanButton);
    editQuanButton.addEventListener("click", () => {
      editQuan();
    });
  });
}

function updatePhone(v) {
  const index = phones.findIndex(
    (p) =>
      p.model == phone.model &&
      p.brand == phone.brand &&
      p.storage == phone.storage &&
      phone.seller == p.seller &&
      phone.price == p.price
  );
  phones[index].quantity = v;

  //localStorage.setItem("phones", JSON.stringify(phones))
}

function checkStock() {
  console.log(phones);

  const stock = phones.findIndex(
    (p) =>
      p.model == phone.model &&
      p.brand == phone.brand &&
      p.storage == phone.storage &&
      phone.seller == p.seller &&
      phone.price == p.price
  );
  if (stock != -1) {
    return true;
  } else {
    return false;
  }
}

logged();
showUserTab();
