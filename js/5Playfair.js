function myPlayfairCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;

    var operationInputs = document.getElementsByName("cipherOperation");
    var text = "";
    var temp, i;
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
    var akString = keyWithAlphabet(kString, "abcdefghiklmnopqrstuvwxyz");
    text += "Key = " + kString + " (" + akString + ")<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptPlayfair(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptPlayfair(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function encryptPlayfair(plain, k) {
    var newP = makePlayfairReducedPlaintext(plain);
    var grid = makePlayfairGrid(k);
    var text = "";
    for(var i = 0; i<newP.length; i+=2) {
        text+=encryptPlayfairPair(newP.charAt(i),newP.charAt(i+1),grid);
    }
    return text;
}

function decryptPlayfair(cipher, k) {
    var grid = makePlayfairGrid(k);
    var text = "";
    for(var i = 0; i<cipher.length; i+=2) {
        text+=decryptPlayfairPair(cipher.charAt(i),cipher.charAt(i+1),grid);
    }
    return text;
}

function encryptPlayfairPair(a,b,grid) {
    var ai = grid.indexOf(a);
    var bi = grid.indexOf(b);
    var ar, br;
    var ac = ai%5;
    var bc = bi%5;
    if(ac==bc) {
        ai = (ai+5)%25;
        bi = (bi+5)%25;
        return grid.charAt(ai) + grid.charAt(bi);
    }
    for(var i = 0; i<5; i++) {
        if(inRange(ai, 5*i, 5*i+4)) {
            ar = i;
        }
        if(inRange(bi, 5*i, 5*i+4)) {
            br = i;
        }
    }
    if(ar==br) {
        ai = (ai-ai%5)+(ai+1)%5;
        bi = (bi-bi%5)+(bi+1)%5;
        return grid.charAt(ai) + grid.charAt(bi);
    }
    ai = ar*5+bc;
    bi = br*5+ac;
    return grid.charAt(ai) + grid.charAt(bi);
}

function decryptPlayfairPair(a,b,grid) {
    var ai = grid.indexOf(a);
    var bi = grid.indexOf(b);
    var ar, br;
    var ac = ai%5;
    var bc = bi%5;
    if(ac==bc) {
        ai = (ai-5)%25;
        bi = (bi-5)%25;
        return grid.charAt(ai) + grid.charAt(bi);
    }
    for(var i = 0; i<5; i++) {
        if(inRange(ai, 5*i, 5*i+4)) {
            ar = i;
        }
        if(inRange(bi, 5*i, 5*i+4)) {
            br = i;
        }
    }
    if(ar==br) {
        ai = (ai-ai%5)+modGreater(ai,1,5);
        bi = (bi-bi%5)+modGreater(bi,1,5);
        return grid.charAt(ai) + grid.charAt(bi);
    }
    ai = ar*5+bc;
    bi = br*5+ac;
    return grid.charAt(ai) + grid.charAt(bi);
}

function makePlayfairReducedPlaintext(plain) {
    var lowerPlain = plain.toLowerCase();
    for(i = 0; i<lowerPlain.length; i+=2) {
        if(lowerPlain.charAt(i)==lowerPlain.charAt(i+1)) {
            if(lowerPlain.charAt(i) != "x") {
                lowerPlain = stringInsert(lowerPlain, i+1, "x");
            } else {
                lowerPlain = stringInsert(lowerPlain, i+1, "z");
            }
        }
    }
    var l = lowerPlain.length;
    if(l%2==1) {
        if(lowerPlain.charAt(l-1) != "x") {
            lowerPlain+="x";
        } else {
            lowerPlain+="z";
        }
        l+=1;
    }
    return lowerPlain;
}

function makePlayfairGrid(key) {
    return keyWithAlphabet(key, "abcdefghiklmnopqrstuvwxyz");
}
