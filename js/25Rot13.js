function myRot13Cipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

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

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptRot13(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptRot13(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptRot13(cipherText) {
    return shiftString(cipherText,13);
}

function encryptRot13(plainText) {
    return shiftString(plainText,13);
}