import * as stats from "@/app/repos/stats";

export async function GET() {
  const res = await stats.getStats();
  return Response.json(res, { status: 200 });
}
export async function POST(request) {
  const data = await request.json();

  try {
    if (data.method == "sold") {

      await stats.soldPhone(Number(data.quan));
    } else if (data.method == "newPhone") {
      await stats.addPhone(Number(data.quan));
    }
  
  } catch (r) {}
  return Response.json(data,{status:200})
}
export async function PUT() {
    await stats.newGuest()
    return Response("ok",{stats:200})
}
export async function DELETE() {
  return new Response();
}
