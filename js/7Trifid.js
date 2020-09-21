function myTrifidCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherPeriod");
    var kString = k.value;
    var kPeriod = parseInt(kString, 10);

    var i, g, kGrid = "";
    var gLetters = [];
    var trifidAlphabet = "abcdefghijklmnopqrstuvwxyz+";

    for(i = 1; i<=27; i++) {
        g = document.getElementById("grid" + i.toString()).value;
        g = g.toLowerCase();
        gLetters.push(g);
        kGrid += g;
    }

    var text = "", poss = true;

    for(i = 0; i<27; i++) {
        g = trifidAlphabet.charAt(i);
        if(!gLetters.includes(g)) {
            text += "ERROR: Grid is missing the letter " + g + "<br>";
            poss = false;
        }
    }
    if(!poss) {
        document.getElementById("demo").innerHTML = text;
        return;
    }

    var operationInputs = document.getElementsByName("cipherOperation");

    var temp;
    var cipherOperation = "0";

    for(i = 0; i<operationInputs.length; i++) {
        temp = operationInputs[i];
        if(temp.type == "radio" && temp.checked) {
            cipherOperation = temp.value;
        };
    };

    if(cipherOperation == "1") {
        text += "Decrypt ciphertext: ";
    } else {
        text += "Encrypt plaintext: ";
    };

    text += tString + "<br><br>";
    text += "Key = " + kString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptTrifid(tString, kGrid, kPeriod);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptTrifid(tString, kGrid, kPeriod);
    }

    document.getElementById("demo").innerHTML = text;
    return;
};

function trifidCoords(grid, c) {
    var i = grid.indexOf(c);
    var x = ~~(i/9);
    var y = ~~((i-9*x)/3);
    var z = i%3;
    return [x,y,z];
}

function getTrifidChar(grid, coords) {
    var x = coords[0], y = coords[1], z = coords[2];
    return grid.charAt(9*x+3*y+z);
}

function encryptTrifid(plain, grid, period) {
    var columns = [];
    var pLength = plain.length;
    var i, j;
    for(i=0; i<pLength; i++) {
        columns.push(trifidCoords(grid, plain.charAt(i)));
    }
    var total = 0, end = pLength - period;
    var allCoords = [];
    while(total<=end) {
        for(i = 0; i<3; i++) {
            for(j = total; j<total+period; j++) {
                allCoords.push(columns[j][i]);
            }
        }
        total+=period;
    }
    for(i = 0; i<3; i++) {
        for(j = total; j<pLength; j++) {
            allCoords.push(columns[j][i]);
        }
    }
    var text = "", charList;
    for(i = 0; i<allCoords.length; i+=3) {
        charList = allCoords.slice(i,i+3);
        text += getTrifidChar(grid, charList);
    }
    return text;
}

function decryptTrifid(plain, grid, period) {
    var pLength = plain.length;
    var allCoords = [];
    var i,j,k;
    for(i = 0; i<pLength; i++) {
        allCoords.push(trifidCoords(grid, plain.charAt(i)));
    }
    var total = 0, end = pLength - period;
    var text = "", groupCols, theRows, rowTotal, charCoords;
    while(total<end) {
        groupCols = getTrifidGroup(allCoords, total, total+period);
        text += decryptTrifidGroup(groupCols, grid);
        total+=period;
    }
    groupCols = getTrifidGroup(allCoords, total, pLength);
    text+=decryptTrifidGroup(groupCols,grid);
    return text;
}

function getTrifidGroup(allCoords, start, end) {
    var i,j;
    var groupCols = [];
    for(i = start; i<end; i++) {
        for(j = 0; j<3; j++) {
            groupCols.push(allCoords[i][j]);
        }
    }
    return groupCols;
}

function decryptTrifidGroup(groupCols, grid) {
    var theRows = [];
    var rowTotal = 0;
    var period = groupCols.length/3;
    while(rowTotal<groupCols.length) {
        theRows.push(groupCols.slice(rowTotal, rowTotal+period));
        rowTotal+=period;
    }
    var text = "";
    for(i = 0; i<period; i++) {
        charCoords = [];
        for(j = 0; j<3; j++) {
            charCoords.push(theRows[j][i]);
        }
        text += getTrifidChar(grid, charCoords);
    }
    return text;
}