const fs = require("fs");

var product = [];

function formLogin(frm) {
    return new Promise((resolve, reject) => {
        product = fs.readFileSync('./json/register.json', 'utf8', (err,data) => {

            if (err) {
                console.log(err);
                return false;
            }
            else {
                console.log(product);
                return true;
            }
        });
    });
}