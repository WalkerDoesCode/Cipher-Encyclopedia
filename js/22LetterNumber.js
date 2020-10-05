function myLetterNumberCipher() {
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
        text += decryptLetterNumber(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptLetterNumber(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptLetterNumber(cipherText) {
    var text = "";
    var i, l = cipherText.length, char, v;
    for(i = 0; i<l; i+=2) {
        char = cipherText.substring(i,i+2);
        v = parseInt(char);
        text+=String.fromCharCode(v+96);
    }
    return text;
}

function encryptLetterNumber(plainText) {
    var text = "";
    var i, l = plainText.length, char, v;
    for(i = 0; i<l; i++) {
        char = plainText.charAt(i);
        v = (valLetter(char)+1).toString();
        if(v.length==1) {
            v = "0" + v;
        }
        text+=v;
    }
    return text;
}