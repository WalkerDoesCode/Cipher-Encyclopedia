function myCardanGrilleCipher() {
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
    text += "Encryption Key: " + kString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptCardanGrille(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptCardanGrille(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptCardanGrille(cipher, key) {
    return "Plain";
}

function encryptCardanGrille(plain, key) {
    return "Cipher";
}