//import { asarray } from "./filter.js";
//console.log(array);
var url = new URL(window.location.href);
var name = url.searchParams.get("name");
var mydata = JSON.parse(data);
for(var i=0; i<=mydata.length-1; i++)
{
  if(name == mydata[i]['name'])
  {
    document.getElementById("product name").innerHTML = mydata[i]['name'];
    document.getElementById("product price").innerHTML = "$" + mydata[i]['price'];
    document.getElementById("product measurement").innerHTML = mydata[i]['measurements'] + "m";
    document.getElementById("product description").innerHTML = mydata[i]['description'];
    var b = document.getElementById("treeimage");
    b.setAttribute("src", mydata[i]['photo'])
     var newpage = document.createElement("a");
  var refer = document.createAttribute("href");
  refer.value = "cart.html?name=" + mydata[i]['name'] + "&price=" + mydata[i]['price'];
  newpage.innerHTML = "Add to cart";
  newpage.setAttributeNode(refer);
  document.getElementById("buy").appendChild(newpage);
  }
}


var itemname = document.getElementById("product name").innerHTML;
  var itemprice = document.getElementById("product price").innerHTML;


document.getElementById("buy").addEventListener("click", function() {

  //obj[itemname] = itemprice;
  sessionStorage.setItem(itemname, itemprice);
  //console.log(sessionStorage.getItem('items'));
});



//export { cartlist };





































//fetch("/data/treeinfo.json")
//    .then(response => response.json())
//    .then(data => {
//      for (let i=0; i < data.length; i++)
//      {
//        if (data[i]['name'] == name)
//        {
//            list.push(data[i]);
//            break;
//        }
//      }
//
//      return list.tex;
//
//      })

//      .then(details => {
//      for (const item of details)
//      {
//        //console.log(item);
//      }
//})
//for (const item of details)
//      {
//        console.log(item);
//      }
