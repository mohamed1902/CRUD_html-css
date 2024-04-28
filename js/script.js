var prodectName = document.getElementById("prodectNameInput");
var prodectPrice = document.getElementById("prodectPriceInput");
var prodectCategery = document.getElementById("prodectCategeryInput");
var prodectDesc = document.getElementById("prodectDescInput");
var buttonAddProdect = document.getElementById("buAddProdect");
var alertProdectName = document.getElementById("alertProdectName");
var prodectContainer;
var mood = 'add';
var getIndex;


if (localStorage.getItem("Prodect") == null) {
    prodectContainer = [];
}
else {
    prodectContainer = JSON.parse(localStorage.getItem("Prodect"));
    addTable();
}

function checkProdectName() {
    var regex = /^[A-Z][a-z]{3,8}/;
    if (regex.test(prodectName.value) == true) {
        prodectName.classList.add("is-valid");
        prodectName.classList.remove("is-invalid");
        alertProdectName.classList.replace("d-blok" , "d-none");
        return true;
    }
    else {
        prodectName.classList.add("is-invalid");
        prodectName.classList.remove("is-valid");
        alertProdectName.classList.replace("d-none" , "d-blok");
        return false;
    }
}
prodectName.addEventListener("keyup", checkProdectName);

function addProdect() {
    if(checkProdectName() == true)
    {
        var prodect =
    {
        name: prodectName.value,
        price: prodectPrice.value,
        categery: prodectCategery.value,
        desc: prodectDesc.value,
    }
    if (mood == 'add') {
        prodectContainer.push(prodect);
        localStorage.setItem("Prodect", JSON.stringify(prodectContainer));
    }
    else {
        prodectContainer[getIndex] = prodect;
        localStorage.setItem("Prodect", JSON.stringify(prodectContainer));
        buttonAddProdect.innerHTML = 'AddProdect';
    }
    addTable();
    clearVar();
    console.log(prodectContainer);
    }
    
}

function clearVar() {
    prodectName.value = '';
    prodectPrice.value = '';
    prodectCategery.value = '';
    prodectDesc.value = '';
}

function addTable() {
    Storagtion = ``;
    for (var i = 0; i < prodectContainer.length; i++) {
        Storagtion += `<tr>
        <td>`+ (i + 1) + `</td>
        <td>`+ prodectContainer[i].name + `</td>
        <td>`+ prodectContainer[i].price + `</td>
        <td>`+ prodectContainer[i].categery + `</td>
        <td>`+ prodectContainer[i].desc + `</td>
        <td><button onclick="updateProdect(`+ i + `)" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProdect(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("addRow").innerHTML = Storagtion;
}

function deleteProdect(prodectIndex) {
    prodectContainer.splice(prodectIndex, 1);
    localStorage.setItem("Prodect", JSON.stringify(prodectContainer));
    addTable();
}

function searchProdect(searchTerm) {
    var cartona = ``;

    for (var i = 0; i < prodectContainer.length; i++) {
        if (prodectContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true
            || prodectContainer[i].categery.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            cartona += `<tr>
            <td>`+ (i + 1) + `</td>
            <td>`+ prodectContainer[i].name + `</td>
            <td>`+ prodectContainer[i].price + `</td>
            <td>`+ prodectContainer[i].categery + `</td>
            <td>`+ prodectContainer[i].desc + `</td>
            <td><button class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProdect(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
            </tr>`
        }
        else {
            console.log("m4 mogod");
        }
    }
    document.getElementById("addRow").innerHTML = cartona;
}

function updateProdect(prodectIndex) {
    prodectName.value = prodectContainer[prodectIndex].name;
    prodectPrice.value = prodectContainer[prodectIndex].price;
    prodectCategery.value = prodectContainer[prodectIndex].categery;
    prodectDesc.value = prodectContainer[prodectIndex].desc;
    buttonAddProdect.innerHTML = 'Update';
    mood = 'update';
    getIndex = prodectIndex;
}