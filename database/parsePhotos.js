const fs = require("fs");
const csv2 = require("csv");
const readline = require("readline");

//create readline interface
const rl = readline.createInterface({
  input: fs.createReadStream("photos.csv")
});

const writeStream = fs.createWriteStream("newPhotos.csv");

rl.on("line", line => {
  let valueArray = arrayFromCSV(line);
  writeStream.write(line + "\n");
});

rl.on("close", () => {
  console.log("done");
});

function arrayFromCSV(data) {
  var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  var a = [];
  data.replace(re_value, function(m0, m1, m2, m3) {
    if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
    else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
    else if (m3 !== undefined) a.push(m3);
    return "";
  });
  // Handle special case of empty last value.
  if (/,\s*$/.test(data)) a.push("");
  return a;
}
