function myVigenereCipher() {
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
        text += decryptVigenere(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += decryptVigenere(tString, invertString(kString));
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptVigenere(cipherText, key) {
    var text = "";
    var j = 0;
    var shift, trueShift, total, final;
    for(var i = 0; i<cipherText.length; i++) {
        shift = key.charCodeAt(j);
        if(65<=shift && shift<=90) {
            trueShift = modGreater(shift, 65, 26);
        } else if(97<=shift && shift<=122) {
            trueShift = modGreater(shift, 97, 26);
        }
        total = cipherText.charCodeAt(i);
        if(65<=total && total<=90) {
            final = modGreater(total, 65+trueShift, 26) + 65;
        } else if(97<=total && total<=122) {
            final = modGreater(total, 97+trueShift, 26) + 97;
        } else {
            return -1;
        }
        text += String.fromCharCode(final);
        j+=1;
        j%=key.length;
    }
    return text;
}