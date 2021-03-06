function myPeriodicTableCipher() {
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
        text += decryptPeriodicTable(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptPeriodicTable(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptPeriodicTable(cipher) {
    return "Plain";
}

function encryptPeriodicTable(plain) {
    return "Cipher";
}