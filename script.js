const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint).then(res=> res.json()).then(data=> cities.push(...data))


function findeMatch(wordToMatch, cities){
  return cities.filter(place=>{
    const regex = new RegExp(wordToMatch, "gi");    
    return place.city.match(regex) || place.state.match(regex);
  })
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayMatches(){
   const matchArray = findeMatch(this.value, cities);
   const result =   matchArray.map(res=>{
    const regex = new RegExp(this.value, 'gi');
    const cityName = res.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = res.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(res.population)}</span>
      </li>
    `;
    }).join("");
    suggestions.innerHTML = result;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);