export async function getCountries (){
async function getCountries() {
    const response = await fetch('https://restcountries.com/v2/all');
    const countries = await response.json();
    return countries;
  }

const countries=await getCountries()
return countries;
}

