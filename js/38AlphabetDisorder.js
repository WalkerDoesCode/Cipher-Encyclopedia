function myAlphabetDisorderCipher() {
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
        text += decryptAlphabetDisorder(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptAlphabetDisorder(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function encryptAlphabetDisorder(plain, increasing = true) {
    var segments = [];
    var l = plain.length, i, segment = "";
    for(i = 0; i<l; i++) {
        if(i == 0 || (increasing && valLetter(plain, i) > valLetter(plain, i-1)) || (!increasing && valLetter(plain, i) < valLetter(plain, i-1))) {
            segment += plain.charAt(i);
        } else {
            segments.push(segment);
            segment = plain.charAt(i);
        }
    }
    segments.push(segment);
    var text = "";
    for(i = 0; i<segments.length; i++) {
        text += reverseString(segments[i]);
    }
    return text;
}

function decryptAlphabetDisorder(cipher) {
    return encryptAlphabetDisorder(cipher, false);
}