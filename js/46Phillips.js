function myPhillipsCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var phillipsAlphabet = "abcdefghiklmnopqrstuvwxyz"; // Normal alphabet without letter j
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
        tempValue = phillipsAlphabet.charAt(i);
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
    text += "Key Grid = <br><br>" + stringify2DArray(kMat) + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptPhillips(tString, kMat);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptPhillips(tString, kMat);
    }

    document.getElementById("demo").innerHTML = text;
};

function encryptPhillips(plain, kMat) {
    return "Cipher";
}

function decryptPhillips(cipher, kMat) {
    return "Plain";
}