const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("newPhotos.csv")
});

const writeStream = fs.createWriteStream("cleanPhotos.csv");

rl.on("line", line => {
  let lineArray = line.split(",");

  let firstLetter2 = lineArray[2].charAt(0);
  let lastLetter2 = lineArray[2].charAt(lineArray[2].length - 1);

  let firstLetter3 = lineArray[3].charAt(0);
  let lastLetter3 = lineArray[3].charAt(lineArray[3].length - 1);

  //if the 2nd index has 2 quotes
  if (firstLetter2 === '"' && lastLetter2 === '"') {
    //if 3rd index has 2 quotes
    if (firstLetter3 === '"' && lastLetter3 === '"') {
      //write to clean csv
      writeStream.write(line + "\n");
    } else {
      //3rd index is missing a quote somewhere
      //if 3rds first is OK, then add " to 3rds last and write to stream
      if (firstLetter3 === '"') {
        lastLetter3 += '"';
        writeStream.write(line + "\n");
        //else just add " to 3rds first and write to stream
      } else {
        firstLetter3 += '"';
        writeStream.write(line + "\n");
      }
    }
  }

  //if 2nd index first is missing but last is ok ''
  if (firstLetter2 !== '"' && lastLetter2 === '"') {
    //and 3rd is ok, just add " to 2nds first
    if (firstLetter3 === '"' && lastLetter3 === '"') {
      firstLetter2 += '"';
      writeStream.write(line + "\n");
    } else {
      //else 3rd indexes are NOT ok
      if (firstLetter3 === '"') {
        lastLetter3 += '"';
        firstLetter2 += '"';
        writeStream.write(line + "\n");
      } else {
        firstLetter3 += '"';
        firstLetter2 += '"';
        writeStream.write(line + "\n");
      }
    }
  }

  //if 2nd index first is OK but last is NOT
  if (firstLetter2 === '"' && lastLetter2 !== '"') {
    //and 3rd are BOTH OK, just add " 2nds last
    if (firstLetter3 === '"' && lastLetter3 === '"') {
      lastLetter2 += '"';
      writeStream.write(line + "\n");
    } else {
      //else 3rd indexes are NOT ok
      if (firstLetter3 === '"') {
        lastLetter3 += '"';
        lastLetter2 += '"';
        writeStream.write(line + "\n");
      } else {
        firstLetter3 += '"';
        lastLetter2 += '"';
        writeStream.write(line + "\n");
      }
    }
  }

  //if line index 2 is undefined, then check line index 3
  if (lineArray[2] === undefined) {
    //if index 3 has both quotes, just reassign line at 2
    if (firstLetter3 === '"' && lastLetter3 === '"') {
      lineArray[2] = "No photo available";
      writeStream.write(line + "\n");
    } else {
      //else line index 3 is missing a quote
      if (firstLetter3 === '"' && lastLetter3 !== '"') {
        lastLetter3 += '"';
        lineArray[2] = "No photo available";
        writeStream.write(line + "\n");
      } else {
        firstLetter3 += '"';
        lineArray[2] = "No photo available";
        writeStream.write(line + "\n");
      }
    }
  } else {
    if (lineArray[3] === undefined) {
      if (firstLetter2 === '"' && lastLetter2 === '"') {
        lineArray[3] = "No photo available";
        writeStream.write(line + "\n");
      } else {
        //else line index 3 is missing a quote
        if (firstLetter2 === '"' && lastLetter2 !== '"') {
          lastLetter2 += '"';
          lineArray[3] = "No photo available";
          writeStream.write(line + "\n");
        } else {
          firstLetter2 += '"';
          lineArray[3] = "No photo available";
          writeStream.write(line + "\n");
        }
      }
    }
  }

  //if both line index 2 AND 3 are undefined
  if (lineArray[2] === undefined && lineArray[3] === undefined) {
    lineArray[2] = "No photo available";
    lineArray[3] = "No photo available";
    writeStream.write(line + "\n");
    //else if its ANYTHING else ( not undefined but not missing quotes either)
  } else if (lineArray[2] !== undefined) {
    lineArray[2] = "No photo available";
  } else if (lineArray[3] !== undefined) {
    lineArray[3] = "No photo available";
  }
});

rl.on("close", () => {
  console.log("done");
});
