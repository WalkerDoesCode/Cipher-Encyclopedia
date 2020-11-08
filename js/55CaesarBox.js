function myCaesarBoxCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;
    var kNum = parseInt(kString);

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
        text += decryptCaesarBox(tString, kNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptCaesarBox(tString, kNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptCaesarBox(cipher, key) {
    return "Plain";
}

function encryptCaesarBox(plain, key) {
    return "Cipher";
}