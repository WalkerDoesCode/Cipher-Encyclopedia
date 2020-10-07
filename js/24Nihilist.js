function myNihilistCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;

    var nihilistAlphabet = "abcdefghiklmnopqrstuvwxyz"; // Normal alphabet without letter j
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
        tempValue = nihilistAlphabet.charAt(i);
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
    text += "Key Word = " + kString + "<br><br>";

    text += "Key Grid = <br><br>" + stringify2DArray(kMat) + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptNihilist(tString, kString, kMat);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptNihilist(tString, kString, kMat);
    }

    document.getElementById("demo").innerHTML = text;
};

function getNihilistValues(char, kMat) {
    var v = indexOf2DArray(kMat, char);
    return parseInt((v[0]+1).toString() + (v[1]+1).toString());
}

function decryptNihilist(tString, kString, kMat) {
    tString = tString.toLowerCase();
    kString = kString.toLowerCase();
    var l = tString.length, k = kString.length;
    var text = "";
    var i, j = 0, char, v, r, c, sub;
    for(i = 0; i<l; i+=2) {
        char = kString.charAt(j);
        sub = tString.substring(i, i+2);
        v = parseInt(sub);
        v -= getNihilistValues(char, kMat);
        v = v.toString()
        while(v.length <= 1) {
            v = "0" + v;
        }
        r = parseInt(v.charAt(0))-1;
        c = parseInt(v.charAt(1))-1;
        text += kMat[r][c];
        j+=1;
        j%=k;
    }
    return text;
}


function encryptNihilist(tString, kString, kMat) {
    tString = tString.toLowerCase();
    tString = convertLettersInString(tString, "j", "i");
    kString = kString.toLowerCase();
    var text = "", l = tString.length, k = kString.length;
    var i, j = 0, charT, charK, v;
    for(i = 0; i<l; i++) {
        charT = tString.charAt(i);
        charK = kString.charAt(j);
        v = getNihilistValues(charT, kMat) + getNihilistValues(charK, kMat);
        text += v.toString();
        j+=1;
        j%=k;
    }
    return text;
}