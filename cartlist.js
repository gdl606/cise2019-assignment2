//var url = new URL(window.location.href);
//var name = url.searchParams.get("name");
//var price = url.searchParams.get("price");
//document.getElementById("prodname").innerHTML = name;
//document.getElementById("prodprice").innerHTML = price;

var title = [];
var prices = [];
var floatPrices = [];
var totalPrice;

for(let i=0 ; i<sessionStorage.length; i++)// session storage temporary storage takes all elements in that storage to use in the next loop
{

    var key = sessionStorage.key(i);
    title[i] = key;
    prices[i] = sessionStorage.getItem(key);

    var oneString = prices[i];
    var smalString = oneString.slice(1, 7);
    var oneprice = parseFloat(smalString);
    floatPrices[i] = oneprice;
}


console.log(title);
console.log(prices);

// adds the title and price to the html file
for(let i=0; i<title.length; i++)
{
    const name = document.createElement("h5"); // create element will create something in the document (html file)
    name.innerHTML = title[i];
    document.body.appendChild(name);

    const price = document.createElement("h6");
    price.innerHTML = prices[i];
        price.compareDocumentPosition(name);
    console.log(i);
    document.body.appendChild(price);

    var button = document.createElement("BUTTON");
    button.innerHTML = "Remove";
    document.body.appendChild(button);
}

var sum = 0.0;

for(var i = 0; i < floatPrices.length; i++)
    {
        sum += floatPrices[i];
    }
console.log(sum);
sum = sum.toFixed(2);
var gstSum = sum*0.15;
gstSum = gstSum.toFixed(2);
var sumString = sum.toString();
var gstString = gstSum.toString();

var line3 = document.createElement("h1");
line3.innerHTML = "-------------";
document.body.appendChild(line3);

var deliveryTotal = document.createElement("h5");
deliveryTotal.innerHTML = "Delivery:"
document.body.appendChild(deliveryTotal);

// awaiting quantity to determine delivery
var deliveryTotalPrinted = document.createElement("h6");
deliveryTotalPrinted.innerHTML = "$"
document.body.appendChild(deliveryTotalPrinted);

var line1 = document.createElement("h1");
line1.innerHTML = "-------------";
document.body.appendChild(line1);

var gstTotal = document.createElement("h5");
gstTotal.innerHTML = "GST:"
document.body.appendChild(gstTotal);

var gstTotalPrinted = document.createElement("h6");
gstTotalPrinted.innerHTML = "$"+gstSum;
document.body.appendChild(gstTotalPrinted);

var line2 = document.createElement("h1");
line2.innerHTML = "-------------";
document.body.appendChild(line2);

var totalPriceTitle = document.createElement("h5");
totalPriceTitle.innerHTML = "Total Price: "
document.body.appendChild(totalPriceTitle);

var totalPricePrinted = document.createElement("h6");
totalPricePrinted.innerHTML = "$"+sumString;
document.body.appendChild(totalPricePrinted);


