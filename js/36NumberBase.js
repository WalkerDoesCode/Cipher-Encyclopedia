function myNumberBaseCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;
    var kNum = parseInt(kString, 10);

    var l = document.getElementById("cipherKeyLength");
    var lString = l.value;
    var lNum = parseInt(lString, 10);

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
    text += "Key Base = " + kString + "<br><br>";
    text += "Key Length = " + lString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptNumberBase(tString, kNum, lNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptNumberBase(tString, kNum, lNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptNumberBase(cipherText, key, length) {
    var text = "";
    var i, l = cipherText.length;
    var sub;
    for(i = 0; i<l; i+=length) {
        sub = cipherText.substring(i, Math.min(i+length,l));
        text += String.fromCharCode(parseInt(sub,key));
    }
    return text;
}

function encryptNumberBase(plainText, key, length) {
    var text = "";
    var i, l = plainText.length, v;
    for(i = 0; i<l; i++) {
        v = plainText.charCodeAt(i).toString(key);
        while(v.length<length) {
            v = "0"+v;
        }
        text += v;
    }
    return text;
}