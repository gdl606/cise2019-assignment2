import { createTreeCard, removeCards } from "./generate-cards.js";

// Updating the price slider.
const slider = document.getElementById("price");
const slabel = document.getElementById("slider_label");
slabel.innerHTML = slider.value; // Display the default slider value
slider.oninput = function() { // Update the current slider value (each time you drag the slider handle)
  slabel.innerHTML = this.value;
}

fetch("/data/treeinfo.json")
  .then(response => response.json())
  .then(data => {
    for (let i=0; i < data.length; i++) {
      createTreeCard(data[i]["name"], data[i]["photo"], data[i]["price"], data[i]["measurements"], data[i]["description"], "tree-cards");
    }
  });

document.getElementById("filter-search").addEventListener("click", function() {
  fetch("/data/treeinfo.json")
    .then(response => response.json())
    .then(data => {
      const dropdown_list = document.getElementsByTagName("select");
    
      const matching_list = [];
      let matching = true;
      for (let i=0; i < data.length; i++) {
        matching = true;
        
        // Go through all the dropdown menus and compare their values against the JSON data.
        for (const dropdown of dropdown_list) {
          if (dropdown.value != "" && data[i][dropdown.id] != dropdown.value) {
            matching = false;
            break;
          }
        }
        
        console.log(data[i]['price']);
        console.log(slider.value);
        console.log("--------------");
        if (parseFloat(data[i]['price']) > parseFloat(slider.value)) {
          matching = false;
        }

        if (matching) {
          matching_list.push(data[i]);
        }
      }
    
      return matching_list;
    }).then(tree_list => {
      removeCards();
      for (const tree of tree_list) {
        //console.log(tree);
        createTreeCard(tree["name"], tree["photo"], tree["price"], tree["measurements"], tree["description"], "tree-cards");
      }
    });
});
