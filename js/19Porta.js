function myPortaCipher() {
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
        text += decryptPorta(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptPorta(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function encryptPorta(plainText, key) {
    var tableau = ["nopqrstuvwxyzabcdefghijklm", "opqrstuvwxyznmabcdefghijkl", "pqrstuvwxyznolmabcdefghijk", "qrstuvwxyznopklmabcdefghij", "rstuvwxyznopqjklmabcdefghi", "stuvwxyznopqrijklmabcdefgh", "tuvwxyznopqrshijklmabcdefg", "uvwxyznopqrstghijklmabcdef", "vwxyznopqrstufghijklmabcde", "wxyznopqrstuvefghijklmabcd", "xyznopqrstuvwdefghijklmabc", "yznopqrstuvwxcdefghijklmab", "znopqrstuvwxybcdefghijklma"];
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var i, l = plainText.length, char, v, keyChar;
    plainText = plainText.toLowerCase();
    var j = 0, jl = key.length, text = "";
    for(i = 0; i<l; i++) {
        keyChar = key.charAt(j);
        v = ~~(valLetter(keyChar)/2);
        char = plainText.charAt(i);
        text += alphabet.charAt(tableau[v].indexOf(char));
        j+=1;
        j%=jl;
    }
    return text;
}

function decryptPorta(cipherText, key) {
    return encryptPorta(cipherText, key);
}