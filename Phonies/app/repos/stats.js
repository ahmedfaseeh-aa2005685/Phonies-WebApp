import prisma from "./prisma";
const stat="clw21kfv900008m0blc6g9cep"
export async function addPhone(quan){
    await prisma.stat.update({
        where:{
            id:stat,
        },
        data:{
            currentListedPhone: {increment : quan},
            listedToday:{increment : quan},
        }
    })
}
export async function soldPhone(quan){
   
    await prisma.stat.update({
        where:{
            id:stat
        },
        data:{
            currentListedPhone:{decrement:quan},
            soldPhones:{increment:quan},
            
        }
    })
}
export async function getStats(){
    return await prisma.stat.findUnique({
        where:{
            id:stat,
        },

    })
}
export async function newGuest(){
    await prisma.stat.update({
        where:{
            id:stat
        },
        data:{
            vistedToday:{increment:1}
        }
    })
}
export async function addCustomer(){
    await prisma.stat.update({
        where:{
            id:stat
        },
        data:{
          numberOfCustomers:{increment:1}  
        }
    })
}
export async function addSeller(){
    await prisma.stat.update({
        where:{
            id:stat
        },
        data:{
          numberOfSellers:{increment:1}  
        }
    })
}
export async function resetStats(){
    await prisma.stat.update({
        where:{
            id:stat,
        },
        data:{
            listedToday:0,
            numberOfCustomers:0,
            numberOfSellers:0,
            soldPhones:0,
            vistedToday:0,
            currentListedPhone:0,
        }
    })

}
export async function checkDate(){
    const prevTime=await prisma.stat.findUnique({
        where:{
            id:stat
        },
        select:{
            date:true,
            listedToday:false,
            numberOfCustomers:false,
            numberOfSellers:false,
            soldPhones:false,
            vistedToday:false,
            currentListedPhone:false,
        }
    })

    const nowTime= new Date(now())
     if(nowTime.getFullYear()>prevTime.getFullYear() && nowTime.getMonth()> prevTime.getMonth()  && nowTime.getDay()>prevTime.getDay() ){

        resetToday()

     }
}
async function resetToday(){
    await prisma.stat.update({
        where:{
            id:stat,
        },
        data:{
            vistedToday:0,
            listedToday:0
            
        }
    })
}

