function myADFGVXCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKeyWord");
    var kString = k.value;

    var c = document.getElementById("cipherKeyColumns");
    var cString = c.value;
    if(cString.length!=6) {
        text = "ERROR: Column Letter Length must be 6.";
        document.getElementById("demo").innerHTML = text;
        return;
    }

    var adfgvxAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789"; // Normal alphabet with digits 0-9
    var i,j, kMat = [], kRow, tempElement, tempValue;
    for(i = 0; i < 6; i++) {
        kRow = [];
        for(j = 1; j<=6; j++) {
            tempElement = document.getElementById("grid" + (6*i+j).toString());
            tempValue = (tempElement.value).toLowerCase();
            kRow.push(tempValue);
        }
        kMat.push(kRow);
    }
    for(i = 0; i<36; i++) {
        tempValue = adfgvxAlphabet.charAt(i);
        if(!contains2DArray(kMat, tempValue)) {
            text = "ERROR: Encryption Grid does not contain the letter / digit \'" + tempValue + "\'<br>";
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
    text += "Key Word = " + kString + "<br><br>";

    text += "Key Columns = " + cString + "<br><br>";

    text += "Key Grid = <br><br>" + stringify2DArray(kMat) + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptADFGVX(tString, kMat, cString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptADFGVX(tString, kMat, cString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function getADFGVXPair(char, mat, cols) {
    var i = mat.indexOf(char);
    var row = i/6;
    var col = i%6;
    return cols.charAt(row) + cols.charAt(col);
}

function getReverseADFGVXChar(mat, cols, rowL, colL) {
    row = cols.indexOf(rowL);
    col = cols.indexOf(colL);
    var i = 6*row+col;
    return mat.charAt(i);
}

function decryptADFGVX(cipher, mat, cols, key) {
    cipher = cipher.toUpperCase();
    cols = cols.toUpperCase();
    var newCipher = invertColumnarTransposition(cipher, key);
    var newMat = simpleString2DArray(mat);
    var l = newCipher.length, i, text = "";
    for(i = 0; i<l; i+=2) {
        text += getReverseADFGVXChar(newMat, cols, newCipher.charAt(i), newCipher.charAt(i+1));
    }
    return text;
}

function encryptADFGVX(plain, mat, cols, key) {
    plain = plain.toLowerCase();
    var newMat = simpleString2DArray(mat);
    var l = plain.length, i, text = "";
    for(i = 0; i<l; i++) {
        text += getADFGVXPair(plain.charAt(i), newMat, cols);
    }
    return columnarTransposition(text, key);
}