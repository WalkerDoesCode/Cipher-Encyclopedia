function myAutokeyCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;

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
    text += "Key = " + kString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptAutokey(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptAutokey(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptAutokey(cipherText, key) {
    var trueKey = key;
    var pL = cipherText.length;
    var text = "", i, char1, char2, v1, v2, char3;
    for(i = 0; i<pL; i++) {
        char1 = cipherText.charAt(i);
        char2 = trueKey.charAt(i);
        v1 = valLetter(char1);
        v2 = valLetter(char2);
        char3 = reverseValLetter(v1-v2);
        text+=char3;
        trueKey+=char3;
    }
    return text;
}

function encryptAutokey(plainText, key) {
    var trueKey = key;
    var kL = key.length;
    var pL = plainText.length;
    if(kL<pL) {
        trueKey += plainText.substring(0,pL-kL);
    }
    var text = "", i, char1, char2, v1, v2;
    for(i = 0; i<pL; i++) {
        char1 = plainText.charAt(i);
        char2 = trueKey.charAt(i);
        v1 = valLetter(char1);
        v2 = valLetter(char2);
        text += reverseValLetter(v1+v2);
    }
    return text;
}