function myCaesarCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;
    var kNum = parseInt(kString, 10);

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
        text += decryptCaesar(tString, kNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += decryptCaesar(tString, -kNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptCaesar(cipherText, key) {
    var text = "";
    var character = 0;
    var newAscii = 0;
    var v;
    for(i = 0; i<cipherText.length; i++) {
        character = cipherText.charCodeAt(i);
        if(65<=character && character<=90) {
            v = modGreater(character,65+key,26);
            newAscii = v + 65;
        } else if(97<=character && character<=122) {
            v = modGreater(character,97+key,26);
            newAscii = v + 97;
        } else {
            return "6597 ERROR";
        }
        text += String.fromCharCode(newAscii);
    }
    return text;
}