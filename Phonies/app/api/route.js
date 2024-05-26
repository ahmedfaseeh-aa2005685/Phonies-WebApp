import PhonesRepo from "../repos/PhonesRepo";
export async function GET() {
    //const { searchParams } = new URL(request.url);
    
    //const brand = searchParams.get('brand');
    //const name = searchParams.get('name');
    //const storage = searchParams.get('storage');

    const data= await PhonesRepo.getAllPhones()
    return Response.json(data,{status:200})

    //if (brand) {
    //    const phones = await PhonesRepo.getPhonesByBrand(brand);
    //    return new Response(JSON.stringify(phones), { status: 200 });
    //} else if (name) {
    //    const phones = await PhonesRepo.getPhonesByName(name);
    //    return new Response(JSON.stringify(phones), { status: 200 });
    //} else if (storage) {
    //    const phones = await PhonesRepo.getPhonesByStorage(parseInt(storage, 10));
    //    return new Response(JSON.stringify(phones), { status: 200 });
    //} else {
    //    const phones = await PhonesRepo.getAllPhones();
    //    return new Response(JSON.stringify(phones), { status: 200 });
    //}
}



