import * as stats from "@/app/repos/stats";
import { getTransaction } from "@/app/repos/transactions";

export async function GET(request) {
  const res= await request.json()
  const reson = await getTransaction(res);
  return Response.json(reson, { status: 200 });
}
export async function POST(request) {
  const data = await request.json();

  const res= await getTransactions(data)
  
  
}
