const SearchBtn = document.getElementById("search-btn");
const spinner = document.getElementById("loading-spinner");
const DisplayCoutry= document.getElementById("country-info");


SearchBtn.addEventListener("click",async function(){
    spinner.style.display ="block";
    const Input_name = document.getElementById("country-input").value.trim();
    countryName = Input_name;
    try{ const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
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
          const respoborder = await fetch("https://restcountries.com/v3.1/alpha/{code}")
        }
    catch(error){
        DisplayCoutry.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
})

