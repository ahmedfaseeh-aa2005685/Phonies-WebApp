import { starter } from "@/app/repos/getter";
import { getStats } from "@/app/repos/stats";
import { redirect } from "next/navigation";


export default async function Home() {
  
  await starter();

  redirect("/Websites/main.html")
  

  
}
