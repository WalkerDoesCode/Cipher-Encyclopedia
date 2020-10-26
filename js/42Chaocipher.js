function myChaocipherCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var l = document.getElementById("cipherKeyLeft");
    var lString = l.value;

    var r = document.getElementById("cipherKeyRight");
    var rString = r.value;

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
    text += "Key Left Wheel = " + lString + "<br><br>";
    text += "Key Right Wheel = " + rString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptChaocipher(tString, lString, rString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptChaocipher(tString, lString, rString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptChaocipher(cipher, left, right) {
    return "Plain";
}

function encryptChaocipher(plain, left, right) {
    return "Cipher";
}