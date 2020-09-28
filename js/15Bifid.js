function myBifidCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var period = document.getElementById("cipherKeyPeriod");
    var periodV = period.value;
    var kPeriod = parseInt(periodV);

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
    text += "Key Period = " + kPeriod + "<br><br>";

    text += "Key Grid = <br><br>" + stringify2DArray(kMat) + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptBifid(tString, kMat, kPeriod);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptBifid(tString, kMat, kPeriod);
    }

    document.getElementById("demo").innerHTML = text;
};

function getCoordsFromBifidText(trueMat, bText) {
    var rows = "";
    var cols = "", i;
    var l = bText.length;
    for(i = 0; i<l; i++) {
        v = trueMat.indexOf(bText.charAt(i));
        rows += (~~(v/5)).toString();
        cols += (v%5).toString();
    }
    return [rows, cols];
}

function getBifidCharFromCoords(trueMat, rc) {
    var i = 5*parseInt(rc.charAt(0)) + parseInt(rc.charAt(1));
    return trueMat.charAt(i);
}

function convertBifidNumbersToString(trueMat, bNumbers) {
    var text = "";
    var l = bNumbers.length, i;
    for(i = 0; i<l; i+=2) {
        text += getBifidCharFromCoords(trueMat, bNumbers.substring(i, i+2));
    }
    return text;
}

function getNumbersFromBifidCipherText(trueMat, bCipher) {
    var numbers = "";
    var l = bCipher.length,i,v;
    for(i = 0; i<l; i++) {
        v = trueMat.indexOf(bCipher.charAt(i));
        numbers += (~~(v/5)).toString();
        numbers += ((v%5)).toString();
    }
    return numbers;
}

function decryptBifid(cipherText, kMat, p) {
    var trueMat = simpleString2DArray(kMat);
    var i, numberCipher = getNumbersFromBifidCipherText(trueMat, cipherText);
    var l = numberCipher.length, j;
    var numbers = "";
    i = 0;
    while(i<=l-2*p) {
        for(j = 0; j<p; j++) {
            numbers += numberCipher.charAt(i+j) + numberCipher.charAt(i+j+p);
        }
        i+=(2*p);
    }
    p = (l-i)/2;
    for(j = 0; j<p; j++) {
        numbers+=numberCipher.charAt(i+j) + numberCipher.charAt(i+j+p);
    }
    return convertBifidNumbersToString(trueMat,numbers);
}

function encryptBifid(plainText, kMat, p) {
    plainText = plainText.toLowerCase();
    plainText = convertLettersInString(plainText, "j", "i");
    var i, v, l = plainText.length;
    var trueMat = simpleString2DArray(kMat);
    
    var a = getCoordsFromBifidText(trueMat, plainText);
    
    var rows = a[0];
    var cols = a[1];

    var numbers = "";
    i = 0;
    
    while(i<=l-p) {
        numbers += rows.substring(i, i+5) + cols.substring(i, i+5);
        i+=p;
    }
    numbers += rows.substring(i, l) + cols.substring(i, l);
    return convertBifidNumbersToString(trueMat, numbers);
}