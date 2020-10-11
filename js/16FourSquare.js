function generateFourSquareGrids() {
    var text = "";
    var i,j,k,v,char;
    alph1 = "abcdefghiklmnopqrstuvwxyz";
    alph2 = "ZGPTFOIHMUWDRCNYKEQAXVSBL";
    alph3 = "MFNBDCRHSAXYOGVITUEWLQZKP";
    alph4 = "abcdefghiklmnopqrstuvwxyz";
    for(i = 0; i<10; i++) {
        for(j = 0; j<10; j++) {
            if(j==5) {
                text += "&nbsp &nbsp";
            }
            v = 5*(i%5)+(j%5);
            if(i>=5) {
                if(j>=5) {
                    char = alph4.charAt(v);
                    v+=75;
                } else {
                    char = alph3.charAt(v);
                    v+=50;
                }
            } else {
                if(j>=5) {
                    char = alph2.charAt(v);
                    v+=25;
                } else {
                    char = alph1.charAt(v);
                }
            }
            text += "<div class = \"cell\"><input id = \"grid" + v.toString() + "\"";
            text += " type = \"text\" name = \"gKey\" value = \"" + char + "\" class = \"gCell\"></div>";
        }
        text += "<br>";
        if(i==4) {
            text += "<br>";
        }
    }
    document.getElementById("gridLabel").innerHTML = "Encryption Key: (Key Grid)";
    document.getElementById("gridContainer").innerHTML = text;
}

function myFourSquareCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var text = "";
    var test1 = "grid1";
    if(!htmlHasID(test1)) {
        text = "ERROR: The Four Square Grid has not been generated. <br><br>Press the \"Create Four Square Grids\" Button.";
        document.getElementById("demo").innerHTML = text;
        return;
    }

    var fourSquareAlphabet = "abcdefghiklmnopqrstuvwxyz"; // Normal alphabet without letter j
    var i,j, tlMat = [], trMat = [], blMat = [], brMat = [], kRow = [], v;
    var total = 0;
    for(i = 0; i<5; i++) {
        kRow = [];
        for(j = 0; j<5; j++) {
            v = document.getElementById("grid" + total.toString());
            v = v.value.toLowerCase();
            kRow.push(v);
            total+=1;
        }
        tlMat.push(kRow);
    }
    for(i = 0; i<5; i++) {
        kRow = [];
        for(j = 0; j<5; j++) {
            v = document.getElementById("grid" + total.toString());
            v = v.value.toLowerCase();
            kRow.push(v);
            total+=1;
        }
        trMat.push(kRow);
    }
    for(i = 0; i<5; i++) {
        kRow = [];
        for(j = 0; j<5; j++) {
            v = document.getElementById("grid" + total.toString());
            v = v.value.toLowerCase();
            kRow.push(v);
            total+=1;
        }
        blMat.push(kRow);
    }
    for(i = 0; i<5; i++) {
        kRow = [];
        for(j = 0; j<5; j++) {
            v = document.getElementById("grid" + total.toString());
            v = v.value.toLowerCase();
            kRow.push(v);
            total+=1;
        }
        brMat.push(kRow);
    }

    
    var tempValue;
    for(i = 0; i<25; i++) {
        tempValue = fourSquareAlphabet.charAt(i);
        if(!contains2DArray(tlMat, tempValue)) {
            text = "ERROR: Top Left Encryption Grid does not contain the letter \'" + tempValue + "\'<br>";
            text += stringify2DArray(tlMat);
            document.getElementById("demo").innerHTML = text;
            return;
        }
        if(!contains2DArray(trMat, tempValue)) {
            text = "ERROR: Top Right Encryption Grid does not contain the letter \'" + tempValue + "\'<br>";
            text += stringify2DArray(trMat);
            document.getElementById("demo").innerHTML = text;
            return;
        }
        if(!contains2DArray(blMat, tempValue)) {
            text = "ERROR: Bottom Left Encryption Grid does not contain the letter \'" + tempValue + "\'<br>";
            text += stringify2DArray(blMat);
            document.getElementById("demo").innerHTML = text;
            return;
        }
        if(!contains2DArray(brMat, tempValue)) {
            text = "ERROR: Bottom Right Encryption Grid does not contain the letter \'" + tempValue + "\'<br>";
            text += stringify2DArray(brMat);
            document.getElementById("demo").innerHTML = text;
            return;
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

    text += "Key Top Left Grid = <br><br>" + stringify2DArray(tlMat) + "<br><br>";
    text += "Key Top Right Grid = <br><br>" + stringify2DArray(trMat) + "<br><br>";
    text += "Key Bottom Left Grid = <br><br>" + stringify2DArray(blMat) + "<br><br>";
    text += "Key Bottom Right Grid = <br><br>" + stringify2DArray(brMat) + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptFourSquare(tString, tlMat, trMat, blMat, brMat);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptFourSquare(tString, tlMat, trMat, blMat, brMat);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptFourSquare(tString, tlMat, trMat, blMat, brMat) {
    trMat = simpleString2DArray(trMat);
    blMat = simpleString2DArray(blMat);

    tString = tString.toLowerCase();
    tString = convertLettersInString(tString, "j", "i");
    var l = tString.length;
    if(l%2==1) {
        tString+="x";
        l+=1;
    }
    var text = "";
    var i, a, b, av, bv, ar, ac, br, bc;
    for(i = 0; i<l; i+=2) {
        a = tString.charAt(i);
        b = tString.charAt(i+1);
        av = trMat.indexOf(a);
        bv = blMat.indexOf(b);
        ar = ~~(av/5);
        br = ~~(bv/5);
        ac = av%5;
        bc = bv%5;
        text += tlMat[ar][bc];
        text += brMat[br][ac];
    }
    return text;
}

function encryptFourSquare(tString, tlMat, trMat, blMat, brMat) {
    tlMat = simpleString2DArray(tlMat);
    brMat = simpleString2DArray(brMat);

    tString = tString.toLowerCase();
    tString = convertLettersInString(tString, "j", "i");
    var l = tString.length;
    if(l%2==1) {
        tString+="x";
        l+=1;
    }
    var text = "";
    var i, a, b, av, bv, ar, ac, br, bc;
    for(i = 0; i<l; i+=2) {
        a = tString.charAt(i);
        b = tString.charAt(i+1);
        av = tlMat.indexOf(a);
        bv = brMat.indexOf(b);
        ar = ~~(av/5);
        br = ~~(bv/5);
        ac = av%5;
        bc = bv%5;
        text += trMat[ar][bc];
        text += blMat[br][ac];
    }
    return text;
}