
import UsersRepo from '@/app/repos/UsersRepo'
export async function GET(request) {

    const allUsers= await UsersRepo.getAllUsers()
    return Response.json(allUsers,{status:200})


    



    //const { searchParams } = new URL(request.url);
    //const username = searchParams.get('username');
    //const userType = searchParams.get('type'); // 'seller', 'customer', 'admin'
//
    //if (username && userType) {
    //    const user = await UsersRepo.getUserByUsernameAndType(username, userType);
    //    return new Response(JSON.stringify(user), { status: 200 });
    //} else {
    //    const users = await UsersRepo.getAllUsers();
    //    return new Response(JSON.stringify(users), { status: 200 });
    //}
}

export async function POST(request) {
    const userData = await request.json();
    const userType = userData.type; // This must be included in the body
    const user = await UsersRepo.addUser(userData, userType);
    if (!user) {
        return new Response(JSON.stringify({ error: "Failed to add user" }), { status: 400 });
    }
    return new Response(JSON.stringify(user), { status: 201 });
}

export async function PUT(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updates = await request.json();
    const userType = updates.type; // Expecting type to be part of the update payload
    const updatedUser = await UsersRepo.updateUser(id, updates, userType);
    if (!updatedUser) {
        return new Response(JSON.stringify({ error: "User not found or update data invalid" }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedUser), { status: 200 });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userType = searchParams.get('type'); // Assuming type is passed as a query parameter
    const success = await UsersRepo.deleteUser(id, userType);
    if (!success) {
        return new Response(JSON.stringify({ error: "User not found or couldn't be deleted" }), { status: 404 });
    }
    return new Response(null, { status: 204 });
}