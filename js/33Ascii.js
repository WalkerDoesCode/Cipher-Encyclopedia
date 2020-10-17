function myAsciiCipher() {
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
        text += decryptAscii(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptAscii(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptAscii(cipher) {
    var text = "", l = cipher.length;
    var j = 0, i;
    while(j<l) {
        i = indexCharString(cipher, " ", j);
        if(i==-1) {
            text +=String.fromCharCode(parseInt(cipher.substring(j,l)));
            break;
        }
        if(i>j) {
            text += String.fromCharCode(parseInt(cipher.substring(j,i)));
        }
        j = i+1;
    }
    return text;
}

function encryptAscii(plain) {
    var text = "";
    var i, l = plain.length;
    for(i = 0; i<l; i++) {
        text += plain.charCodeAt(i).toString();
        if(i<l-1) {
            text += " ";
        }
    }
    return text;
}