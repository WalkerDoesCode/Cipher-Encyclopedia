function myBinaryCipher() {
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
        text += decryptBinary(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptBinary(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptBinary(cipher) {
    var i, l = cipher.length;
    var text = "", sub;
    for(i = 0; i<l; i+=8) {
        sub = cipher.substring(i, i+8);
        text += String.fromCharCode(parseInt(sub,2));
    }
    return text;
}

function encryptBinary(plain) {
    var text = "";
    var i, l = plain.length, v;
    for(i = 0; i<l; i++) {
        v = plain.charCodeAt(i).toString(2);
        while(v.length<8) {
            v = "0"+v;
        }
        text += v;
    }
    return text;
}