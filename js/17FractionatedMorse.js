function myFractionatedMorseCipher() {
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
    var akString = keyWithAlphabet(kString, "abcdefghijklmnopqrstuvwxyz");
    text += "Key = " + kString + " (" + akString + ")<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptFractionatedMorse(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptFractionatedMorse(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function getFractionatedMorseIndex(morse) {
    var l = morse.length;
    var i, char;
    var total = 0;
    for(i = 0; i<l; i++) {
        char = morse.charAt(i);
        if(char == "-") {
            total+=Math.pow(3,l-1-i);
        } else if (char == "x") {
            total+=2*Math.pow(3,l-1-i);
        }
    }
    return total;
}

function getFractionatedMorseTripleFromIndex(i) {
    var morseChars = [".", "-", "x"];
    var text = "";
    var a = ~~(i/9);
    var b = ~~((i%9)/3);
    var c = i%3;
    text += morseChars[a] + morseChars[b] + morseChars[c];
    return text;
}

function decryptFractionatedMorse(cipherText, key) {
    cipherText = cipherText.toLowerCase();
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    key = keyWithAlphabet(key, alphabet).toLowerCase();
    var morse = "";
    var i, l = cipherText.length, ind;
    for(i = 0; i<l; i++) {
        ind = key.indexOf(cipherText.charAt(i));
        morse += getFractionatedMorseTripleFromIndex(ind);
    }
    return decryptMorseCode(morse);
}

function encryptFractionatedMorse(plainText, key) {
    plainText = plainText.toLowerCase();
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    key = keyWithAlphabet(key, alphabet).toLowerCase();
    var morse = getMorseCode(plainText);
    var l = morse.length, i;
    var text = "", v;
    for(i = 0; i<=l-3; i+=3) {
        v = morse.substring(i, i+3);
        text += key.charAt(getFractionatedMorseIndex(v));
    }
    return text;
}