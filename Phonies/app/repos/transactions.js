import prisma from "./prisma";

export async function addTrnsaction(datad){

    await prisma.transaction.create({
        data:datad
    })
}
export async function getTransaction(idd){
    return await prisma.transaction.findUnique({
        where:{
            id:dd
        }
    })
}
export async function getTransaction(idd){
    return await prisma.transaction.findMany({
        where:{
            id:dd
        }
    })

}