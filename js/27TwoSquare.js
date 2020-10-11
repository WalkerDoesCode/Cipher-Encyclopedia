function generateTwoSquareGrids() {
    var text = "";
    var i,j,k,v,char;
    alph1 = "tiusflavbncdeghkmopqrwxyz";
    alph2 = "vespaiolbcdfghkmnqrtuwxyz";
    for(i = 0; i<5; i++) {
        for(j = 0; j<10; j++) {
            if(j==5) {
                text += "&nbsp &nbsp";
            }
            v = 5*(i%5)+(j%5);
            if(j>=5) {
                char = alph2.charAt(v);
                v+=25;
            } else {
                char = alph1.charAt(v);
            }
            text += "<div class = \"cell\"><input id = \"grid" + v.toString() + "\"";
            text += " type = \"text\" name = \"gKey\" value = \"" + char + "\" class = \"gCell\"></div>";
        }
        text += "<br>";
    }
    document.getElementById("gridLabel").innerHTML = "Encryption Key: (Key Grid)";
    document.getElementById("gridContainer").innerHTML = text;
}

function myTwoSquareCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var text = "";
    var test1 = "grid1";
    if(!htmlHasID(test1)) {
        text = "ERROR: The Four Square Grid has not been generated. <br><br>Press the \"Create Four Square Grids\" Button.";
        document.getElementById("demo").innerHTML = text;
        return;
    }

    var twoSquareAlphabet = "abcdefghiklmnopqrstuvwxyz"; // Normal alphabet without letter j
    var i,j, lMat = [], rMat = [], kRow = [], v;
    var total = 0;
    for(i = 0; i<5; i++) {
        kRow = [];
        for(j = 0; j<5; j++) {
            v = document.getElementById("grid" + total.toString());
            v = v.value.toLowerCase();
            kRow.push(v);
            total+=1;
        }
        lMat.push(kRow);
    }
    for(i = 0; i<5; i++) {
        kRow = [];
        for(j = 0; j<5; j++) {
            v = document.getElementById("grid" + total.toString());
            v = v.value.toLowerCase();
            kRow.push(v);
            total+=1;
        }
        rMat.push(kRow);
    }
    
    var tempValue;
    for(i = 0; i<25; i++) {
        tempValue = twoSquareAlphabet.charAt(i);
        if(!contains2DArray(lMat, tempValue)) {
            text = "ERROR: Left Encryption Grid does not contain the letter \'" + tempValue + "\'<br>";
            text += stringify2DArray(lMat);
            document.getElementById("demo").innerHTML = text;
            return;
        }
        if(!contains2DArray(rMat, tempValue)) {
            text = "ERROR: Right Encryption Grid does not contain the letter \'" + tempValue + "\'<br>";
            text += stringify2DArray(rMat);
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

    text += "Key Left Grid = <br><br>" + stringify2DArray(lMat) + "<br><br>";
    text += "Key Right Grid = <br><br>" + stringify2DArray(rMat) + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptTwoSquare(tString, lMat, rMat);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptTwoSquare(tString, lMat, rMat);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptTwoSquare(tString, lMat, rMat) {
    return encryptTwoSquare(tString, lMat, rMat);
}

function encryptTwoSquare(tString, lMat, rMat) {
    tString = tString.toLowerCase();
    lMat = simpleString2DArray(lMat).toLowerCase();
    rMat = simpleString2DArray(rMat).toLowerCase();
    var l = tString.length;
    if(l%2==1) {
        tString+="x";
        l+=1;
    }
    var r1, c1, r2, c2, char1, char2, v1, v2;
    var text = "", i;
    for(i = 0; i<l; i+=2) {
        char1 = tString.charAt(i);
        char2 = tString.charAt(i+1);
        v1 = lMat.indexOf(char1);
        v2 = rMat.indexOf(char2);
        r1 = ~~(v1/5);
        c1 = v1%5;
        r2 = ~~(v2/5);
        c2 = v2%5;
        if(r1==r2) {
            text += char1 + char2;
        } else {
            v1 = 5*r1+c2;
            v2 = 5*r2+c1;
            text += lMat.charAt(v2);
            text += rMat.charAt(v1);
        }
    }
    return text;
}