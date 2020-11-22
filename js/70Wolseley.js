function myWolseleyCipher() {
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
        text += decryptWolseley(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptWolseley(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptWolseley(cipher) {
    return "Plain";
}

function encryptWolseley(plain) {
    return "Cipher";
}