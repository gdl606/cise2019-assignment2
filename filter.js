const slider = document.getElementById("price");
const slabel = document.getElementById("slider_label");

slabel.innerHTML = slider.value; // Display the default slider value
slider.oninput = function() { // Update the current slider value (each time you drag the slider handle)
  slabel.innerHTML = this.value;
}

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
        
        if (data[i][slider.id] > slider.value) {
          matching = false;
        }

        if (matching) {
          matching_list.push(data[i]);
        }
      }
    
      return matching_list;
    }).then(tree_list => {
      for (const tree of tree_list) {
        console.log(tree);
      }
    });
});
