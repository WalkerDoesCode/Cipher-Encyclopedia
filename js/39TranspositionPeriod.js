function myTranspositionPeriodCipher() {
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
    text += "Key Permutation Word = " + kString + "<br><br>"

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptTranspositionPeriod(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptTranspositionPeriod(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};


function decryptTranspositionPeriod(cipher, p) {
    var order = invertRankLetters(p);
    var pl = p.length;
    while(cipher.length%pl!=0) {
        cipher+="x";
    }
    var l = cipher.length;
    var text = "", sub, i;
    for(i = 0; i<l; i+=pl) {
        sub = cipher.substring(i, i+pl);
        text += rearrangeBasedOnRank(sub, order);
    }
    return text;
}

function encryptTranspositionPeriod(plain, p) {
    var order = rankLetters(p);
    var pl = p.length;
    while(plain.length%pl!=0) {
        plain+="x";
    }
    var l = plain.length;
    var text = "", sub, i;
    for(i = 0; i<l; i+=pl) {
        sub = plain.substring(i, i+pl);
        text += rearrangeBasedOnRank(sub, order);
    }
    return text;
}