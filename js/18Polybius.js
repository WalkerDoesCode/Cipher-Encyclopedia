function myPolybiusCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKeyColumns");
    var kString = k.value;

    var bifidAlphabet = "abcdefghiklmnopqrstuvwxyz"; // Normal alphabet without letter j
    var i,j, kMat = [], kRow, tempElement, tempValue;
    for(i = 0; i < 5; i++) {
        kRow = [];
        for(j = 1; j<=5; j++) {
            tempElement = document.getElementById("grid" + (5*i+j).toString());
            tempValue = (tempElement.value).toLowerCase();
            kRow.push(tempValue);
        }
        kMat.push(kRow);
    }
    for(i = 0; i<25; i++) {
        tempValue = bifidAlphabet.charAt(i);
        if(!contains2DArray(kMat, tempValue)) {
            text = "ERROR: Encryption Grid does not contain the letter \'" + tempValue + "\'<br>";
            text += stringify2DArray(kMat);
            document.getElementById("demo").innerHTML = text;
            return;
        }
    }

    var operationInputs = document.getElementsByName("cipherOperation");
    var text = "";
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
    text += "Key Columns = " + kString + "<br><br>";
    text += "Key Grid = " + stringify2DArray(kMat) + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptPolybius(tString, kString, kMat);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptPolybius(tString, kString, kMat);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptPolybius(cipherText, col, grid) {
    cipherText = cipherText.toUpperCase();
    col = col.toUpperCase();
    grid = simpleString2DArray(grid);
    var text = "", i, l = cipherText.length, v = 0, char;
    for(i = 0; i<l; i+=2) {
        char = cipherText.charAt(i);
        v=5*col.indexOf(char);
        char = cipherText.charAt(i+1);
        v+= col.indexOf(char);
        text += grid[v];
    }
    return text;
}

function encryptPolybius(plainText, col, grid) {
    plainText = plainText.toLowerCase();
    grid = simpleString2DArray(grid);
    plainText = convertLettersInString(plainText, "j", "i");
    var i, l = plainText.length, text = "", char, v;
    for(i = 0; i<l; i++) {
        char = plainText.charAt(i);
        v = grid.indexOf(char);
        text += col[~~(v/5)];
        text += col[v%5];
    }
    return text;
}