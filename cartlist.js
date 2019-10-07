//var url = new URL(window.location.href);
//var name = url.searchParams.get("name");
//var price = url.searchParams.get("price");
//document.getElementById("prodname").innerHTML = name;
//document.getElementById("prodprice").innerHTML = price;

var title = [];
var prices = [];
for(let i=0 ; i<sessionStorage.length; i++)
{
  var key = sessionStorage.key(i);
  title[i] = key;
  prices[i] = sessionStorage.getItem(key);
}

console.log(title);
console.log(prices);


for(let i=0; i<title.length; i++){
const name = document.createElement("h4");
name.innerHTML = title[i];
document.body.appendChild(name);
for(let j=0; j<prices.length; j++)
{
  const price = document.createElement("h4");
price.innerHTML = prices[j];
document.body.appendChild(price);
  break;
}
}

