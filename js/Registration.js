//var fs = require("fs");
//var path = require("path");

var LowerCase = "abcdefghijklmnopqrstuvwxyz";
var UpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numeric = "0123456789";
var maxLength = 30;


function formVal(frm) {
    //Set the Message span tag to be empty
    document.getElementById("errorMessage").innerHTML = " ";

    //Set the default Colour to non-error
    changeLabel(document.getElementById("lblEmail"), false);
    changeLabel(document.getElementById("lblUsername"), false);
    changeLabel(document.getElementById("lblPassword"), false);
    changeLabel(document.getElementById("lblRePassword"), false);

    changeLabel(document.getElementById("lblFirstName"), false);
    changeLabel(document.getElementById("lblLastName"), false);
    changeLabel(document.getElementById("lblPhoneNum"), false);

    changeLabel(document.getElementById("lblUnit"), false);
    changeLabel(document.getElementById("lblStreetNum"), false);
    changeLabel(document.getElementById("lblStreet"), false);
    changeLabel(document.getElementById("lblCity"), false);
    changeLabel(document.getElementById("lblProv"), false);
    changeLabel(document.getElementById("lblPostal"), false);

    //Form Verification
    //Account
    var checkEmail = emailVal(frm);
    var checkUserName = UserNameVal(frm);
    var checkPassword = PasswordVal(frm);
    var reCheckPassword = rePasswordVal(frm);
    //Personal
    var checkFirstName = firstNameVal(frm);
    var checkLastName = lastNameVal(frm);
    var checkPhoneNumber = phoneNumberVal(frm);
    //Shipping
    var checkUnit = unitVal(frm);
    var checkStreetNum = streetNumVal(frm);
    var checkStreet = streetVal(frm);
    var checkCity = cityVal(frm);
    var checkProv = provVal(frm);
    var checkPostal = postalVal(frm);


    if(checkFirstName && checkLastName && checkPhoneNumber
    && checkEmail && checkUserName && checkPassword && reCheckPassword
    && checkUnit && checkStreet && checkCity && checkProv && checkPostal) 
    {
        return true;
    }

    else {
        return false;
    }

}

//Account Info
function emailVal(frm) {

    if (frm.txtEmail.value.trim().length == 0) {
        message("***Please Enter a Email Address***");
        changeLabel(document.getElementById("lblEmail"), true);
        return false;
 
    }
    else {
        return true;
    }
}

function UserNameVal(frm) {

    if (frm.txtUsername.value.trim().length == 0) {
        message("***Please Enter a Username***");
        changeLabel(document.getElementById("lblUsername"), true);
        return false;
    }
    else if (!characterVal(frm.txtUsername.value)) {
        message("***Username must start with a character***");
        changeLabel(document.getElementById("lblUsername"), true);
        return false;
    }
    else if (frm.txtUsername.value.length < 6) {
        message("***Username must be either 8 characters or longer***");
        changeLabel(document.getElementById("lblUsername"), true);
        return false;
    }
    else {
        return true;
    }
}

function PasswordVal(frm) {

    if (frm.txtPassword.value.length == 0) {
        message("***Please Enter a Password***");
        changeLabel(document.getElementById("lblPassword"), true);
        return false;
    }
    else if (frm.txtPassword.value.length < 8) {
        message("***Password must be either 8 characters or longer***");
        changeLabel(document.getElementById("lblPassword"), true);
        return false;
    }
    else if (!UpperCaseVal(frm.txtPassword.value)) {
        message("***Password must at least contain one UpperCase character***");
        changeLabel(document.getElementById("lblPassword"), true);
    }
    else if (!characterVal(frm.txtPassword.value)) {
        message("***Password must start with a character***");
        changeLabel(document.getElementById("lblPassword"), true);
        return false;
    }
    else if (!digitVal(frm.txtPassword.value)) {
        message("***Password must at least contain one number***");
        changeLabel(document.getElementById("lblPassword"), true);
        return false;
    }
    else {
        return true;
    }

}

function rePasswordVal(frm) {

    if (!(frm.txtRePassword.value == frm.txtPassword.value)) {
        message("***Password's don't Match***");
        changeLabel(document.getElementById("lblRePassword"), true);
        return false;
    }
    else {
        return true;
    }
}

//Personal Info
function firstNameVal(frm) {
    
    if (frm.txtFirstName.value.trim().length == 0) {
        message("***Please Enter a First Name***");
        changeLabel(document.getElementById("lblFirstName"), true);
        return false;

    }
    else {
        return true;
    }

}

function lastNameVal(frm) {
    
    if (frm.txtLastName.value.trim().length == 0) {
        message("***Please Enter a Last Name***");
        changeLabel(document.getElementById("lblLastName"), true);
        return false;
    }

    else {
        return true;
    }

}

function phoneNumberVal(frm) {
    var result = false;

    if (frm.telPhoneNum.value.trim().length == 0) {
        message("***Please Enter a Phone Number***");
        changeLabel(document.getElementById("lblPhoneNum"), true);
        result = false;
    }
    else {
        result = true;
    }

    return result;
}

//Shipping Address 
function unitVal(frm) {

    var result = false;

    if (frm.numUnit.value.trim().length == 0) {
        message("***Please Enter a Unit Number***");
        changeLabel(document.getElementById("lblUnit"), true);
        result = false;
    }
    else if (!digitVal(frm.numUnit.value)) {
        message("***Unit can not contain any letters*** ");
        changeLabel(document.getElementById("lblUnit"), true);
        result = false;
    }
    else if (frm.numStreetNum.value.trim() == 0) {
        message("***Unit can not be 0***");
        changeLabel(document.getElementById("lblUnit"), true);
        result = false;
    }
    else {
        result = true;
    }

    return result;
}

function streetNumVal(frm) {

    var result = false;

    if (frm.numStreetNum.value.trim().length == 0) {
        message("***Please Enter a Street Number***");
        changeLabel(document.getElementById("lblStreetNum"), true);
        result = false;
    }
    else if (!digitVal(frm.numStreetNum.value)) {
        message("***Street Number can not contain any letters*** ");
        changeLabel(document.getElementById("lblStreetNum"), true);
        result = false;
    }
    else if (frm.numStreetNum.value.trim() == 0) {
        message("***Street Number can not be 0***");
        changeLabel(document.getElementById("lblStreetNum"), true);
        result = false;
    }
    else {
        result = true;
    }

    return result;
}

function streetVal(frm) {

    var result = false;

    if (frm.txtStreet.value.trim().length == 0) {
        message("***Please Enter a Street Name***");
        changeLabel(document.getElementById("lblStreet"), true);
        result = false;
    }
    else if (digitVal(frm.txtStreet.value)) {
        message("***Street Name can not contain any digits***");
        changeLabel(document.getElementById("lblStreet"), true);
        result = false;
    }
    else {
        result = true;
    }

    return result;
}

function cityVal(frm) {

    var result = false;

    if (frm.txtCity.value.trim().length == 0) {
        message("***Please Enter a City***");
        changeLabel(document.getElementById("lblCity"), true);
        result = false;
    }
    else if (digitVal(frm.txtCity.value)) {
        message("***City can not contain any digits***");
        changeLabel(document.getElementById("lblCity"), true);
        result = false;
    }
    else {
        result = true;
    }

    return result;
}

function provVal(frm) {

    var result = false;

    if (frm.txtProv.value.trim().length == 0) {
        message("***Please Enter a Province***");
        changeLabel(document.getElementById("lblProv"), true);
        result = false;
    }
    else {
        result = true;
    }

    return result;
}

function postalVal(frm) {

    var result = false;

    if (frm.txtPostal.value.trim().length == 0) {
        message("***Please Enter a Postal Code***");
        changeLabel(document.getElementById("lblPostal"), true);
        result = false;
    }
    else {
        result = true;
    }

    return result;
}

//Error Message
function message(Message) {
    var myMessage = document.getElementById("errorMessage");
    var newMessage = document.createElement('span');

    newMessage.innerHTML = Message + '<br>';
    myMessage.appendChild(newMessage);
}

//Changes the Label
function changeLabel(label, error) {

    //If there is an error change the label to the ErrorMessage CSS property
    if (error) {
        label.classList.add("ErrorMessage");

    }
    //Else, remove the CSS applied to the label
    else {
        label.classList.remove("ErrorMessage");
    }

}

//1-Character Val 
function characterVal(input) {
    var result = false;
    

    for (var cnt = 0; cnt < maxLength; cnt++) {
        if (input.substr(0, 1) == LowerCase.substr(cnt, 1) || input.substr(0, 1) == UpperCase.substr(cnt, 1)) {
            result = true;
        }
    }
   
    return result;
}

//UpperCase Val
function UpperCaseVal(input) {
    var result = false;

    for (var cnt = 0; cnt < maxLength; cnt++) {
        for (var i = 0; i < maxLength; i++) {
            if (input.substr(cnt, 1) == UpperCase.substr(i, 1)) {
                result = true;
            }
        }
    }

    return result;
}

//Digit Validation 
function digitVal(input) {
    var result = false;
    var digiCount = 0;

    for (var cnt = 0; cnt < input.length; cnt++) {
        for (var i = 0; i < maxLength; i++) {
            if (input.substr(cnt, 1) == numeric.substr(i, 1)) {
                digiCount += 1;
            }
        }
    }

    if (digiCount > 0) {
        result = true;   
    }
    if (digiCount == 0) {
        result = false;
    }

    return result;
}