function myAffineCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var multiply = document.getElementById("cipherMultiply");
    var multiplyString = multiply.value;
    var multiplyNum = parseInt(multiplyString, 10);

    if(myGCD(multiplyNum, 26)!= 1) {
        text = "ERROR: INVALID MULTIPLICATION KEY  (gcd(a,26) != 1)";
        document.getElementById("demo").innerHTML = text;
        return;
    }

    var shift = document.getElementById("cipherShift");
    var shiftString = shift.value;
    var shiftNum = parseInt(shiftString,10);

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
    text += "Multiplication Encryption Key: a = " + multiplyString + "<br><br>";
    text += "Addition Encryption Key: b = " + shiftString + "<br><br>";

    
    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptAffine(tString, multiplyNum, shiftNum);
    } else {
        text += "Corresponding ciphertext: ";
        text+= encryptAffine(tString, multiplyNum, shiftNum);
    }
    document.getElementById("demo").innerHTML = text;
};

function decryptAffine(cipherText, multiply, shift) {
    cipherText = shiftString(cipherText, -shift);
    var newMult = modInv(multiply, 26);
    return multiplyString(cipherText, newMult);
}

function encryptAffine(plainText, multiply, shift) {
    plainText = multiplyString(plainText, multiply);
    return shiftString(plainText, shift);
}