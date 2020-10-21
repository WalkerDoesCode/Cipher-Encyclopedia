function myTransposeCipher() {
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
        text += decryptTranspose(tString, kNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptTranspose(tString, kNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptTranspose(cipherText, key) {
    var i, l = cipherText.length, j = 0;
    var small = ~~(l/key);
    var numLarge = l%key;
    var cols = [];
    for(i = 0; i<key; i++) {
        if(i<numLarge) {
            cols.push(cipherText.substring(j,j+small+1));
            j+=small+1;
        } else {
            cols.push(cipherText.substring(j,j+small));
            j+=small;
        }
    }
    var text = "";
    for(i = 0; i<small+1; i++) {
        for(j = 0; j<key; j++) {
            if(cols[j].length>i) {
                text += cols[j].charAt(i);
            }
        }
    }
    return text;
}

function encryptTranspose(plainText, key) {
    var i, l = plainText.length, j;
    var text = "";
    for(i = 0; i<key; i++) {
        j = i;
        while(j<l) {
            text += plainText.charAt(j);
            j+=key;
        }
    }
    return text;
}