function myAffineCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var multiply = document.getElementById("cipherMultiply");
    var multiplyString = multiply.value;
    var multiplyNum = parseInt(multiplyString, 10);

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
        if(myGCD(multiplyNum,26)!=1) {
            text = "ERROR: INVALID MULTIPLICATION KEY  (gcd(a,26) != 1)";
        } else {
            text += decryptAffine(tString, multiplyNum, shiftNum);
        };
    } else {
        text += "Corresponding ciphertext: ";
        multiplyNum = modInv(multiplyNum,26);
        if(multiplyNum>=0) {
            text+= decryptAffine(tString, multiplyNum, -shiftNum);
        } else {
            text = "ERROR: INVALID MULTIPLICATION KEY  (gcd(a,26) != 1)";
        }
    }
    


    document.getElementById("demo").innerHTML = text;
};

function decryptAffine(cipherText, multiply, shift) {
    if(myGCD(multiply,26) != 1) {
        return "26 ERROR";
    }

    var text = "";
    var character = 0;
    var newAscii = 0;
    var v = 0;
    var multDec = modInv(multiply, 26);
    for(i=0; i<cipherText.length; i++) {
        character = cipherText.charCodeAt(i);
        if(65<=character && character<=90) {
            v = modGreater(character,65+shift,26);
            v*=multDec;
            v%=26;
            newAscii = v+65;
        } else if(97<=character && character<=122) {
            v = modGreater(character,97+shift,26);
            v*=multDec;
            v%=26;
            newAscii = v+97;
        } else {
            return "6597 ERROR"
        }
        text+=String.fromCharCode(newAscii);
    }
    return text;
}