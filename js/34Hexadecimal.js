function myHexadecimalCipher() {
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
        text += decryptHexadecimal(tString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptHexadecimal(tString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptHexadecimal(cipher) {
    var i, l = cipher.length;
    if(l>=4 && cipher.substring(0,4)!="0xF1") {
        return "ERROR: Invalid Hexadecimal Input";
    }
    if(l>=4) {
        cipher = cipher.substring(4,l);
        l-=4;
    }
    var text = "", sub;
    for(i = 0; i<l; i+=2) {
        sub = cipher.substring(i, i+2);
        text += String.fromCharCode(parseInt(sub,16));
    }
    return text;
}

function encryptHexadecimal(plain) {
    var text = "0xF1";
    var i, l = plain.length;
    for(i = 0; i<l; i++) {
        text += plain.charCodeAt(i).toString(16);
    }
    return text;
}