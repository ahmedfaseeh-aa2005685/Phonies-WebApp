import { logged } from "./LogFunction.js";
import { getCountries } from "./countries.js";
import { renderPhone } from "./renderPhones.js";
import { showUserTab } from "./userTabFunction.js";


async function incrementSold(q){
   try{ 
   const res= await fetch('../api/stats',{
        method:"POST",
        body: JSON.stringify({method:"sold",quan:q}),
    })

    const data= await res.json()
    console.log("dats:  "+JSON.stringify(data.method));
     }
    catch(s){

    }
   
}
const countries=await getCountries();
const usersData = await fetch('http://localhost:3000/api/users')
const users = await usersData.json()
const userData=localStorage.getItem("user")
const user=JSON.parse(userData);
const data = await fetch('http://localhost:3000/api/')
const phones = await data.json()

   
    // const userData = localStorage.getItem("user");
    // const user = JSON.parse(userData);
    // const data = localStorage.getItem("phone");
    // const phone = JSON.parse(data);

    

    const phonesData = localStorage.getItem("phone");
    const phone = JSON.parse(phonesData);
    document.querySelector("#quantity").addEventListener("click",(event)=>{
        const quantity= document.querySelector("#quantity").value
        const total=document.querySelector("#total")
        const subTotal=quantity*phone.price;
        total.innerHTML=subTotal
    })
    phones
   function init(){
        const quan=document.querySelector("#quantity")
        quan.setAttribute("max",phone.quantity)
        const quantity= document.querySelector("#quantity").value
        const total=document.querySelector("#total")
        const subTotal=quantity*phone.price;
        total.innerHTML=subTotal

        document.querySelector("#submit").addEventListener("click",async(event)=>{
            if(checkInputs()){
                alert(getTotal())
                alert(user.money)
            if(user.money>=getTotal()){
              
             await  purchase();
            }
            else{
                alert("not enough money")
            }}
        });

    }
    function setCountries(){
        const con=document.querySelector("#country");
        countries.forEach(element => {
            const c=document.createElement("option");
            c.value=element.name;
            c.innerHTML=element.name
            con.appendChild(c);
        });
        
    }
    async function  purchase() {
       console.log(document.querySelector("#country").value); 
        const quantity= document.querySelector("#quantity").value
        const dat = new Date();
        const d=dat.getFullYear() + "/" + dat.getMonth() + "/" + dat.getDate() + "  " + dat.getHours() + "h :" + dat.getMinutes()+"m"
        const transaction = {
            date:d
        }
        const username=user.username;
        const address={}
         address.name=document.querySelector("#name").value
         address.ad=document.querySelector("#address").value
         address.country=document.querySelector("#country").value
        address.city=document.querySelector("#city").value
        address.state=document.querySelector("#state").value
        address.zip=document.querySelector("#zip").value
        
        const seller= phone.seller;
        const total=getTotal();
        editQuantity();
        const purchasedPhone=phone;
        transaction.phone=purchasedPhone
        const inc=document.querySelector("#quantity").value
        transaction.address=address;
        transaction.buyer=username;
        transaction.total=total;
        transaction.seller=seller;
        transaction.quantity=document.querySelector("#quantity").value
        console.log(transaction)
        user.transactions=[]
        alert(user.transactions)
        user.transactions.push(transaction)
        editMoney();
     
        updateUser(transaction,seller)
        updateUser(transaction,user.username)
        localStorage.removeItem("phones")
        //localStorage.setItem("phones",JSON.stringify(phones))
        console.log(inc+"quantity");
        await incrementSold(inc)
        alert("Phone purchased Successfully")
        
        
        //Buying Phone
        //1. Update Sellers transactions

        const res= await fetch('http://localhost:3000/api/phones',{
                method:"PUT",
                body: JSON.stringify({id:phone.id  ,  data:phone}),
            })
        const data= await res.json()     

        //2. Update Buyers 



        //window.open("./transactions.html","_self")
        window.open("./main.html","_self")
        logged();
       




    }

    function getTotal(){
        const quantity= document.querySelector("#quantity").value
        const total=document.querySelector("#total")
        const subTotal=quantity*phone.price;
        return subTotal;



    }
    function loadPhone(){
        const phonie=renderPhone(phone);
        const phoneDetails=document.querySelector("#phoneDetails")
        phoneDetails.appendChild(phonie)
    }
    function editQuantity(){
        const quan= document.querySelector("#quantity").value
        const newQ=phone.quantity-quan;
        if(newQ<1){
            const delet=phones.findIndex((p)=> p.model==phone.model && p.brand==phone.brand && p.storage==phone.storage &&  phone.seller==p.seller &&   phone.price==p.price);
            console.log(phones[delet])
            phones.splice(delet,1);
            
            
        }
        else{
            const getPhone=phones.findIndex((p)=> p.model==phone.model && p.brand==phone.brand && p.storage==phone.storage &&  phone.seller==p.seller &&   phone.price==p.price);
            console.log(phones[getPhone]);
                phones[getPhone].quantity=newQ;
                phone.quantity=newQ;

        }

        
    }
    function checkInputs(){

        const name=document.querySelector("#name").value+" "+document.querySelector("#address").value;
        const address=document.querySelector("#address").value
        const city=document.querySelector("#city").value
        const state=document.querySelector("#state").value
        const zip=document.querySelector("#zip").value
        const country=document.querySelector("#country").value;
        if(name!="" && address!="" && city!="" && state!="" && zip!="" && country!=""){
            return true
        }
        else{
           alert("field missing")
           return false
        }


    }
    function editMoney(){
        //const t=Number(getTotal());
        const newMoney= user.money-getTotal()
        let mon=newMoney;
        if(newMoney<=0){
             mon=0;
        }
        const f=users.findIndex((u)=> user.username=u.username );

        users[f].money=mon
        user.money=mon;
        console.log(users)
    
       
        
        
        
        localStorage.setItem("user",JSON.stringify(user))
        //alert(" done")

        
    }

    function updateUser(tran,usr){
      //  const f=users.findIndex((u)=> usr==u.username );
      // const t=users[f].transactions
      // t.push(tran);
      // users[f].transactions=t;

    }


    
    logged();
    showUserTab();
    init();
    setCountries()
    loadPhone();

