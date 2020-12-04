function myBase36Cipher() {
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
        text += decryptBase36(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptBase36(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptBase36(cipher) {
    return "Plain";
}

function encryptBase36(plain) {
    return "Cipher";
}