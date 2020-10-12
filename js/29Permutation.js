function myPermutationCipher() {
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
    text += "Key = " + kString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptPermutation(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptPermutation(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptPermutation(cipher, k) {
    var text = ""
    var kl = k.length;
    var i, l = cipher.length, sub;
    for(i = 0; i<l; i+=kl) {
        sub = cipher.substring(i, Math.min(i+kl, l));
        text += invertColumnarTransposition(sub, k);
    }
    return text;
}

function encryptPermutation(plain, k) {
    var text = ""
    var kl = k.length;
    var i, l = plain.length, sub;
    for(i = 0; i<l; i+=kl) {
        sub = plain.substring(i, Math.min(i+kl, l));
        text += columnarTransposition(sub, k);
    }
    return text;
}