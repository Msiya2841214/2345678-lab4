const SearchBtn = document.getElementById("search-btn");
const spinner = document.getElementById("loading-spinner");
const DisplayCoutry= document.getElementById("country-info");
const errorMessage = document.getElementById("error-message");


const borderSec = document.getElementById("bordering-countries");
async function searchCountry(countryName){
    // const Input_name = document.getElementById("country-input").value.trim();
    // countryName = Input_name;
    try{ 
        spinner.classList.add("hidden");
        errorMessage.classList.add("hidden");
        borderSec.innerHTML="";
        DisplayCoutry.innerHTML="";
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            if(!response.ok){
                throw new Error("Country not found")
            }
            const data = await response.json();
            const country = data[0];

            DisplayCoutry.innerHTML=`
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital[0]}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <img src="${country.flags.svg}" alt="${country.name.common} flag">
           `;
           console.log(data);
           
          if(country.borders && country.borders.length >0){
            const code = country.borders.join(",");
           
            const respoborder = await fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`);
            const borderData = await respoborder.json();

            for(let i=0;i<borderData.length;i++){
                const sec = document.createElement("section");
                let border=borderData[i];
                sec.innerHTML=`
                <p>${border.name.common}</p>
                <img src="${border.flags.svg}" width="80">
              
                `
                borderSec.appendChild(sec);
            }
          }
          
        }
    catch(error){
       errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
    finally{
       spinner.style.display ="none";
       spinner.classList.remove("hidden");
    }
}

SearchBtn.addEventListener("click",async function(){
    const Input_name = document.getElementById("country-input").value.trim();
    countryName = Input_name;
    searchCountry(countryName);

})

