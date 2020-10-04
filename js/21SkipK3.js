function mySkipK3Cipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKeyBypass");
    var kString = k.value;
    var bNum = parseInt(kString, 10);

    var k2 = document.getElementById("cipherKeySkip");
    var k2String = k2.value;
    var sNum = parseInt(k2String, 10);

    var text = "";

    if(myGCD(sNum, tString.length) != 1) {
        text = "ERROR: Skip amount is invalid (GCD(S,L) != 1)";
        document.getElementById("demo").innerHTML = text;
        return;
    }

    var operationInputs = document.getElementsByName("cipherOperation");
    
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
    text += "Key Bypass = " + kString + "<br><br>";
    text += "Key Skip = " + k2String + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptSkipK3(tString, bNum, sNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptSkipK3(tString, bNum, sNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptSkipK3(cipherText, bypass, skip) {
    cipherText = byPassString(cipherText, bypass);
    var total = 0;
    var l = cipherText.length;
    var i = 0;
    var text = "", char;
    while(total<l) {
        char = cipherText.charAt(i);
        text+=char;
        i+=skip;
        i%=l;
        total+=1;
    }
    return text;
}

function encryptSkipK3(plainText, bypass, skip) {
    plainText = byPassString(plainText, bypass);
    var total = 0;
    var l = plainText.length;
    var i = 0;
    var text = "";
    var indices = [];
    while(total<l) {
        indices.push(i);
        i+=skip;
        i%=l;
        total+=1;
    }
    var text = "";
    for(i = 0; i<l; i++) {
        text += plainText.charAt(indices.indexOf(i));
    }
    return text;
}