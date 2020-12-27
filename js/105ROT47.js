function myROT47Cipher() {
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
        text += decryptROT47(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptROT47(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptROT47(cipher) {
    return "Plain";
}

function encryptROT47(plain) {
    return "Cipher";
}