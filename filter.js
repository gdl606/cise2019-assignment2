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
            console.log(data[i][dropdown.id] + " doesn't match with " + dropdown.value);
            matching = false;
            break;
          }
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





















//function generateOptions()
//{
//    
//    var name = document.getElementById("name").value;
//
//}

//    var category = document.getElementById("Category").value;
//    var conditions = document.getElementById("Conditions").value;
//    var maintainence = document.getElementById("Maintainence").value;
//    var maxheight = document.getElementById("Max Height").value;
//    var growthrate = document.getElementById("Growth Rate").value;
//    var price = document.getElementById("Price").value;