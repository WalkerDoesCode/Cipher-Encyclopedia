function myBaconianCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherLow");
    var kL = k.value;

    var k2 = document.getElementById("cipherHigh");
    var kH = k2.value;

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
    text += "Key Low Letter = " + kL + ", Key High Letter = " + kH + "<br>";
    text += "Example: bin(\'g\') = 00110 = " + kL + kL + kH + kH + kL + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptBaconian(tString, kL, kH);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptBaconian(tString, kL, kH);
    }

    document.getElementById("demo").innerHTML = text;
};

function getBaconSequence(char, kL, kH) {
    var v = valLetter(char);
    if(9<=v && v<=20) {
        v-=1;
    } else if(v>=21) {
        v-=2;
    }
    var s = baseStringDigits(v, 5, 2);
    var text = "";
    for(i = 0; i<5; i++) {
        if(s.charAt(i) == "0") {
            text += kL;
        } else {
            text += kH;
        }
    }
    return text;
}

function reverseBaconSequence(sequence, kH) {
    var total = 0;
    var l = sequence.length;
    if(l!=5) {
        return "X";
    }
    var m = 1;
    for(i = l-1; i>=0; i-=1) {
        if(sequence.charAt(i) == kH) {
            total+=m;
        }
        m*=2;
    }
    if(9<=total && total<=19) {
        total+=1;
    } else if(total>=20) {
        total+=2;
    }
    return reverseValLetter(total);
}

function decryptBaconian(cipherText, kL, kH) {
    var l = cipherText.length;
    cipherText = cipherText.toLowerCase();
    var text = "";
    var i;
    for(i = 0; i<l; i+=5) {
        text += reverseBaconSequence(cipherText.substring(i, i+5), kH);
    }
    return text;
}

function encryptBaconian(plainText, kL, kH) {
    plainText = plainText.toLowerCase();
    var l = plainText.length;
    var text = "";
    var i;
    for(i = 0; i<l; i++) {
        text += getBaconSequence(plainText.charAt(i), kL, kH);
    }
    return text;
}