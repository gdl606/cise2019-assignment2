var url = new URL(window.location.href);
var name = url.searchParams.get("name");
var price = url.searchParams.get("price");
document.getElementById("prodname").innerHTML = name;
document.getElementById("prodprice").innerHTML = price;
