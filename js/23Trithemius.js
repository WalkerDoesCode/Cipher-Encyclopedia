function myTrithemiusCipher() {
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
        text += decryptTrithemius(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptTrithemius(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptTrithemius(cipherText) {
    cipherText = cipherText.toLowerCase();
    var i, l = cipherText.length;
    var text = "", char;
    for(i = 0; i<l; i++) {
        char = cipherText.charAt(i);
        text+=shiftString(char,0-i);
    }
    return text;
}

function encryptTrithemius(plainText) {
    plainText = plainText.toLowerCase();
    var i, l = plainText.length;
    var text = "", char;
    for(i = 0; i<l; i++) {
        char = plainText.charAt(i);
        text+=shiftString(char,i);
    }
    return text;
}