function myCaesarCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;
    var kNum = parseInt(kString, 10);

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
        text += decryptCaesar(tString, kNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptCaesar(tString, kNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptCaesar(cipherText, key) {
    return shiftString(cipherText, -key);
}

function encryptCaesar(cipherText, key) {
    return shiftString(cipherText, key);
}