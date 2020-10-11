function myScytaleCipher() {
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
        text += decryptScytale(tString, kNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptScytale(tString, kNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptScytale(cipherText, key) {
    var l = cipherText.length;
    var small = ~~(l/key);
    var large = small+1;
    var numLarge = l%key;
    var i, j;
    var columns = [];
    for(i = 0; i<numLarge; i++) {
        j = i*large;
        columns.push(cipherText.substring(j, j+large));
    }
    for(i = numLarge; i<key; i++) {
        j = numLarge + i*small;
        columns.push(cipherText.substring(j,j+small));
    }
    var text = "";
    for(i = 0; i<small; i++) {
        for(j = 0; j<key; j++) {
            text += columns[j].charAt(i)
        }
    }
    for(i = 0; i<numLarge; i++) {
        text += columns[i].charAt(small);
    }
    return text;
}

function encryptScytale(plainText, key) {
    var text = "";
    var l = plainText.length;
    var i, j;
    for(i = 0; i<key; i++) {
        j = i;
        while(j<l) {
            text += plainText.charAt(j);
            j+=key;
        }
    }
    return text;
}