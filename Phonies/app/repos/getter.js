import PhonesRepo, {addPhones} from './PhonesRepo'
import UsersRepo, { getAdmins, getCustomers, getSellers } from './UsersRepo'
import phones from './storage/phones.json' with {type:"json"}
import sellersData from './storage/sellers.json' with {type:"json"}
import customersData from './storage/customers.json' with {type:"json"}
import adminsData from './storage/admins.json' with {type:"json"}
import prisma from './prisma'
import * as stats from './stats'

export async function starter() {
    const customer= await getCustomers()
    const seller= await getSellers()
    const admins= await getAdmins()
    
    await stats.newGuest()

    if(customer.length==0){
        await stats.resetStats()
       await customersData.map(async (user)=>{ await UsersRepo.addCustomer(user)
        stats.addCustomer()
       })
    }
    if(seller.length==0){
        await sellersData.map(async(user)=>{
           await UsersRepo.addSeller(user)
           stats.addSeller() 
        })

    }
    if(admins.length==0){
        adminsData.map(async(user)=>{await UsersRepo.addAdmin(user)})
    }
    setTimeout(async function(){
        const e=await PhonesRepo.getAllPhones()
        if(e.length==0){
        await addPhones(phones)
    }
        console.log("Executed after 1 second");
    }, 1000);
    

}

