function mySimpleSubstitutionCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value.toLowerCase();

    var alphabet = "abcdefghijklmnopqrstuvwxyz", char;
    var text = "";
    if(kString.length!=26) {
        text = "ERROR: Encryption Alphabet does not have exactly 26 characters.";
        document.getElementById("demo").innerHTML = text;
    }
    for(i = 0; i<26; i++) {
        char = alphabet.charAt(i);
        if(!kString.includes(char)) {
            text = "ERROR: Encryption Alphabet does not include the letter \'" + char + "\'";
            document.getElementById("demo").innerHTML = text;
        }
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
    text += "Key = " + kString + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptSimpleSubstitution(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptSimpleSubstitution(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptSimpleSubstitution(cipherText, key) {
    cipherText = cipherText.toLowerCase();
    var text = "";
    key = key.toLowerCase();
    var alphabet = "abcdefghijklmnopqrstuvwxyz", char, index;
    for(var i = 0; i<cipherText.length; i++) {
        char = cipherText.charAt(i);
        index = key.indexOf(char);
        text += alphabet.charAt(index);
    }
    return text;
}

function encryptSimpleSubstitution(plainText, key) {
    plainText = plainText.toLowerCase();
    var text = "";
    key = key.toLowerCase();
    var val, i;
    for(i = 0; i<plainText.length; i++) {
        val = valLetter(plainText.charAt(i));
        text += key.charAt(val);
    }
    return text;
}