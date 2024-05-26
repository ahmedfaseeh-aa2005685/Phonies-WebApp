
import { logged } from "./LogFunction.js";
import { showUserTab } from "./userTabFunction.js";
async function incrementListedPhones(q){
    try{ 
    const res= await fetch('../api/stats',{
         method:"POST",
         body: JSON.stringify({method:"newPhone",quan:q}),
     })
 
     const data= await res.json()
     console.log("dats:  "+JSON.stringify(data.method));
      }
     catch(s){
 
     }
    
 }

    //const usersDatas =await fetch("http://localhost:3000/api/users")
    //const users =await usersDatas.json()
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);

    //const phonesData = await fetch("http://localhost:3000/api/phones")
    //const phones = JSON.parse(phonesData);




    const getPage = (a) => a.split("/").reduce((a, v) => v)
    const yourPath = getPage(window.location.pathname);
    const mainPath = ".html";
    const prevData=localStorage.getItem("prevPath");
    const prevPath=JSON.parse(prevData);
    console.log("current :"+yourPath)
    console.log("previous:"+prevPath);



    function init(){
        
        const storage=document.querySelector("#storage")
        const confirm=document.createElement("button");
        confirm.innerHTML="confirm";
        confirm.classList.add("button");
        const submitTab=document.querySelector("#submitTab");
        console.log(submitTab);
        const submitButton=document.querySelector("#submitButton");
        console.log(submitButton)
        submitButton.addEventListener("click",(event)=>{
           
            if(checkInputs()){
                submitButton.style.display="none";
                submitTab.appendChild(confirm);
                confirm.addEventListener("click",(event)=>{
                   
                    submits();
                })
               
                
            }
        })


    }
    function checkInputs(){
        const brand=document.querySelector("#brand").value;
        const model=document.querySelector("#model").value;
        const price=document.querySelector("#price").value;
        const year=document.querySelector("#year").value;
        const storage=document.querySelector("#storage").value;
        const img=document.querySelector("#image").value;
        const quantity=document.querySelector("#quantity").value;

        console.log(brand!="")
        console.log(model!=0)
        console.log(price>0)
        console.log(storage>=16)
        console.log(img!='')
        console.log(quantity)

        if(brand!=""  &&   model!=""    &&   price!=""       && storage>=16     && img!=""  && quantity>0 && year>0){
            return true;
        }
        else{
            alert("filed missing")
            false
        }
    }
    function submits(){
        const brand=document.querySelector("#brand").value;
        const model=document.querySelector("#model").value;
        const year=document.querySelector("#year").value;
        const price=document.querySelector("#price").value;
        const storage=document.querySelector("#storage").value;
        const img=document.querySelector("#image").value;
        const quantity=document.querySelector("#quantity").value;
        console.log("price:"+price)
        console.log(brand)
        console.log(model)
        console.log(price)
        console.log(storage)
        console.log(img)
        console.log(quantity)
        let newPhone={};
        newPhone.brand=brand;
        newPhone.name=model;
        newPhone.year=year;
        newPhone.price=price
        newPhone.storage=storage;
        newPhone.img=getImg(img);
        newPhone.quantity=quantity;
        incrementListedPhones(quantity)
        newPhone.seller=user.username;
  


        localStorage.setItem("phone",JSON.stringify(newPhone))
        alert("phone listed successfully")
        window.open("./item.html","_self");
        
    }

    function getImg(img){
        let p=[];
         p=img.split("\\")
        const imgName=p.pop();
        return "../Media/images/"+imgName
    }
    //function moveFile(img){
    //    var object = new ActiveXObject("Scripting.FileSystemObject");
    //    var file = object.GetFile(img);
    //    console.log(file+"file int")
    //    console.log(mainPath+"target path")
    //    file.Move(mainPath);
    // }
    async function handleSale(phoneId, sellerId, customerId, price) {
        try {
            // Assuming each sale decrements the quantity by 1
            const phone = await PhonesRepo.decrementPhoneQuantity(phoneId, 1);
            await UsersRepo.updateCustomerBalance(customerId, price);
            await UsersRepo.updateSellerBalance(sellerId, price);
    
            // Record the transaction for the customer
            const transaction = {
                date: new Date(),
                type: 'purchase',
                details: {
                    phoneId: phoneId,
                    amount: price,
                    description: `Purchased phone: ${phone.name}`
                }
            };
            await UsersRepo.addTransactionToCustomer(customerId, transaction);
        } catch (error) {
            console.error("Failed to complete the sale:", error);
        }
    }

    init();
    logged()
    showUserTab()



