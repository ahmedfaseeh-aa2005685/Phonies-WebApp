import PhonesRepo from "@/app/repos/PhonesRepo";

export async function GET() {
    //const { searchParams } = new URL(request.url);
    
    //const brand = searchParams.get('brand');
    //const name = searchParams.get('name');
    //const storage = searchParams.get('storage');



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

export async function POST(request) {
    const phoneData = await request.json(); 
    const phone = await PhonesRepo.addPhone(phoneData);
    if (!phone) {
        return new Response(JSON.stringify({ error: "Failed to add phone" }), { status: 400 });
    }
    return new Response(JSON.stringify(phone), { status: 201 });
}

export async function PUT(request) {
    

    const updates = await request.json(); 
    const updatedPhone = await PhonesRepo.updatePhone(updates.id, updates.data);
    if (!updatedPhone) {
        return new Response(JSON.stringify({ error: "Phone not found or update data invalid" }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedPhone), { status: 200 });
    
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const success = await PhonesRepo.deletePhone(id);
    if (!success) {
        return new Response(JSON.stringify({ error: "Phone not found or couldn't be deleted" }), { status: 404 });
    }
    return new Response(null, { status: 204 });
}
