function myAlbertiCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var l = document.getElementById("cipherKeyInner");
    var lString = l.value;

    var r = document.getElementById("cipherKeyOuter");
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
    text += "Key Inner Wheel = " + lString + "<br><br>";
    text += "Key Outer Wheel = " + rString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptAlberti(tString, lString, rString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptAlberti(tString, lString, rString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptAlberti(cipher, inner, outer) {
    return "Plain";
}

function encryptAlberti(plain, inner, outer) {
    return "Cipher";
}