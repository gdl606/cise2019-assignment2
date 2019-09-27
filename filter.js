const slider = document.getElementById("price");
const slabel = document.getElementById("slider_label");
var array = [];
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
      removeCard();
      for (const tree of tree_list) {
        console.log(tree);
      }
    });
});

//DYNAMIC JS

//createTreeCard();

function createTreeCard(tree_name, tree_image_src, tree_price, tree_description) { // TODO: Add an average rating parameter.
  const tree_card = document.createElement("div");
  tree_card.className = "card h-100"
  document.getElementById("tree-cards").appendChild(card);

  addTreeImage(tree_card, tree_image_src, tree_name);
  addCardBody(tree_card, tree_name, tree_price, tree_description);
  addCardFooter(tree_card);
}

// Last two parameters are from JSON.
function addTreeImage(tree_card, image_src, tree_name) {
  const anchor = document.createElement("a");
  anchor.href = "image_src";
  tree_card.appendChild(anchor);

  const image = document.createElement("img");
  image.className = "card-img-top";
  image.src = "image_src";
  image.alt = tree_name;
  anchor.appendChild(image);
}

function addCardBody(tree_card, tree_name, tree_price, tree_description) {
  const body = document.createElement("div");
  body.className = "card-body";
  tree_card.appendChild(body);

  const title = document.createElement("h4");
  title.className = "card-title";
  body.appendChild(title);

  // TODO: To add a data-toggle attribute, you need to use jQuery or PHP.
  // Preferrably using jQuery.
  // const anchor = document.createElement("a");
  // anchor.dataToggle

  // TODO: Modal function here...

  const price = document.createElement("h5");
  price.innerHTML = "$" + tree_price;
  body.appendChild(price);

  const description = document.createElement("p");
  description.className = "card-text";
  description.innerHTML = tree_description;
  body.appendChild(description);
}

function addModalDialog(title_tag, tree_name, tree_description) {
  // TODO: Add in later!
}

function addCardFooter(tree_card) {
  const footer = document.createElement("div");
  footer.className = "card-footer";
  tree_card.appendChild(footer);

  const stars = document.createElement("small");
  stars.className = "text-muted";
  // TODO: Dynamically calculate a star rating.
  // FIXME: Underneath is a static rating of 4 stars.
  stars.innerHTML = "&#9733; &#9733; &#9733; &#9733; &#9734;";
  footer.addChild(stars);
}

function calculateStarRating(average_rating) {
  // TODO: Calculate the average rating from the dataset.
}

function removeCard() {
    // Removes an element from the document
    var element = document.getElementsByClassName("card h-100");
    console.log(element);
//    for(const elem of element){
//      elem.parentNode.removeChild(elem);
//    }
    for (var i = element.length - 1; i >= 0; --i) {
      element[i].remove();
    }
}
