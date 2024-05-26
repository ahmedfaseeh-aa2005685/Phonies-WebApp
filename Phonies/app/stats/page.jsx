import VerticalDividers from "@/components/box";
import { getStats } from "@/app/repos/stats";
import { StepLabel,Divider,Button } from "@mui/material";
import "@/app/globals.css"
import "@/public/Styles/MyStyle.css"
export default async function Home() {
  const stats = await getStats();

  return (
    
      

      <body  >
        <h2 className=""> Statistics</h2>
        <div className="color grid grid-cols-4 grid-rows-9 ">
          <Button  className="mb-3 col-span-4 row-start-3 colored" variant="contained">Currently Listed Phones: {stats.currentListedPhone}</Button>
          <Button  className="mb-3 col-span-4 row-start-4 colored" variant="contained">Sold Phones: {stats.soldPhones}</Button>
          <Button  className="mb-3 col-span-4 row-start-5 colored" variant="contained">Number Of Sellers: {stats.numberOfSellers}</Button>
          <Button  className="mb-3 col-span-4 row-start-6 colored" variant="contained">Number Of Customers: {stats.numberOfCustomers}</Button>
          <Button  className="mb-3 col-span-4 row-start-7 colored" variant="contained">Guests Visted Today: {stats.vistedToday}</Button>
          <Button  className="mb-3 col-span-4 row-start-8 colored" variant="contained">Phones Listed Today: {stats.listedToday}</Button>
          <Button  className="mb-3 col-span-4 row-start-9 colored" variant="contained">As of: {stats.date.getFullYear()+" / "+stats.date.getMonth()+" / "+stats.date.getDay()}</Button>
          
        </div>
      </body>

  );
}
