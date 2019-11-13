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

// for (let i = 0; i < storage.length; i++) {
//   let row = storage[i];

//   //if row has correct amt of cols &&
//   if (row.length === 4) {
//     writeStream.write(row);
//   } else {
//     //else it write to bad row & handle rows later
//     writeStream2.write(row)
//   }
// }

// const csvStream = csv2.parse();

// let currentRow = "";

// csvStream
//   .on("data", function (data) {
//     console.log("regular data", data);
//     currentRow = data;

//     let firstLetter = data[2].charAt(0);
//     console.log("firstLetter", firstLetter);
//     let lastLetter = data[2].charAt(data[2].length - 1)
//     console.log("lastLetter", lastLetter);

//     //if the beginning or ending " is missing,
//     //write to badphotos csv
//     if (firstLetter !== '\"' || lastLetter !== '\"') {
//       let modifiedData = JSON.stringify(data);
//       writeStream2.write(modifiedData + "\n");
//     } else {
//       //else, write to newPhotos
//       let modifiedData = JSON.stringify(data);
//       writeStream.write(modifiedData + "\n");
//     }

//   })
//   .on("end", function () {
//     console.log("done");
//   })
//   .on("error", function (error) {
//     console.log("current here", currentRow);
//   });

// readStream.pipe(csvStream);

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
