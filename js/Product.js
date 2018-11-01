window.onload = loadProduct;

document.write('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>');

function loadProduct() {
    
    $.getJSON("./json/product.json", function(json) {
        console.log(json); // this will show the info it in firebug console

        console.log(json[0].Name);
        var productTable = document.querySelector("#ProductDisplay");
        
        productTable.innerHTML = "";

        var row = document.createElement("tr");
        var counter = 0;
    for (var cnt = 0; cnt < json.length; cnt++) {

        if (counter == 2) {
            counter = 0;
            row = document.createElement("tr");
        }
        row.appendChild(createProduct(json[cnt].Name, json[cnt].Image, 300, 260, "Image", json[cnt].Price));
        productTable.appendChild(row);
        counter++;
    }
    });


}

function createTDElement (str) {
    //Creating a new td element.
    var cell = document.createElement("td");
    //Creating a node, containing our string.
    var list = document.createTextNode(str);
    //Appending the node into the td element.
    cell.appendChild(list);
    //Returning the element we created.
    return cell;

    loadUser();
}

function createProduct (str, url, height, width, alt, price) {
    var line_break = document.createElement("br");

    //Creating a new td element.
    var cell = document.createElement("td");
    //Creating a node, containing our string.
    var list = document.createTextNode(str);
    //Appending the node into the td element.
    
    cell.appendChild(line_break);

    cell.appendChild(list);

	var img = document.createElement("IMG");
	img.setAttribute("src", url);
	img.setAttribute("height", height);
	img.setAttribute("width", width);
	img.setAttribute("alt", alt);
    cell.appendChild(img);

    cell.appendChild(line_break);

    list = document.createTextNode("$" + price);
    cell.appendChild(list);

    //Returning the element we created.
    return cell;
}

function loadUser() {

    loginForm = document.getElementById("Login");

    $.getJSON("./json/register.json", function(json) {
        for (let cnt = 0; cnt < json.length; cnt++) {
            if (json(cnt).Login == true) {
                loginForm.style.visibility = "hidden";
                break;
            }
        }
        
    });
}