require("dotenv").config();
var fs = require("fs");

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    cmdString = data.split(",");
    var action = cmdString[0].trim();
    var input = cmdString[1].trim();
    console.log(input);
    console.log(data);
  });
}

doWhatItSays();
