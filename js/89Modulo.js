function myModuloCipher() {
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
        text += decryptModulo(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptModulo(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptModulo(cipher) {
    return "Plain";
}

function encryptModulo(plain) {
    return "Cipher";
}