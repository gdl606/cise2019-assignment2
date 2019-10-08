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
const name = document.createElement("h5");
name.innerHTML = title[i];
document.body.appendChild(name);

  const price = document.createElement("h5");
price.innerHTML = prices[i];
  console.log(i);
document.body.appendChild(price);

}

