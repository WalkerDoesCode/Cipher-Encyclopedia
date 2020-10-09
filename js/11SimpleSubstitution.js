function mySimpleSubstitutionCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value.toLowerCase();

    var alphabet = "abcdefghijklmnopqrstuvwxyz", char;
    var text = "";
    if(kString.length>26) {
        text = "ERROR: Encryption Alphabet has more than 26 characters.";
        document.getElementById("demo").innerHTML = text;
    }

    kString = keyWithAlphabet(kString, getAlphabet());

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
    key = key.toLowerCase();
    return substituteAlphabets(cipherText, getAlphabet(), key);
}

function encryptSimpleSubstitution(plainText, key) {
    plainText = plainText.toLowerCase();
    key = key.toLowerCase();
    return substituteAlphabets(plainText, key);
}