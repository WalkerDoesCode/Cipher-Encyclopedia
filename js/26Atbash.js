function myAtbashCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var operationInputs = document.getElementsByName("cipherOperation");
    var temp;
    var cipherOperation = "0";

    var i, text = "";

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
        text += decryptAtbash(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptAtbash(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptAtbash(cipherText) {
    return substituteAlphabets(cipherText, getAlphabet(), "zyxwvutsrqponmlkjihgfedcba");
}

function encryptAtbash(plainText) {
    return substituteAlphabets(plainText, "zyxwvutsrqponmlkjihgfedcba");
}