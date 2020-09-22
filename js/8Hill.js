function makeHillMatrix() {
    var s = document.getElementById("cipherSize");
    var sString = s.value;
    var sNum = parseInt(sString,10);

    var text = "";
    var i,j;

    for(i = 1; i<=sNum; i++) {
        text += "<div id = \"hillRow" + i.toString() + "\" class = \"matrixContainer\" width = \"500px\">";
        for(j = 1; j<=sNum; j++) {
            text += "<div class = \"cell\" width = \"30px\" height = \"20px\"><input id = \"mat";
            text += i.toString();
            text += "-";
            text += j.toString();
            text += "\" type = \"text\" name = \"gKey\" value = \"1\" class = \"gCell\"></div>";
        }
        text += "</div>";
    }

    document.getElementById("hillMatrix").innerHTML = text;
}

function myHillCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var s = document.getElementById("cipherSize");
    var sString = s.value;
    var sNum = parseInt(sString,10);

    var text = "";

    
    var test1 = "mat" + (sNum).toString() + "-1";
    var test2 = "mat" + (sNum+1).toString() + "-1";

    if(!htmlHasID(test1) || htmlHasID(test2)) {
        text = "ERROR: Matrix Size not equal to Grid Size<br>Click \"Create Matrix\" to update Grid";
        document.getElementById("demo").innerHTML = text;
        return;
    }
    
    var i,j;
    var kMat = [], kRow, name, matElement, matValue, matNum;
    for(i = 1; i<=sNum; i++) {
        kRow = [];
        for(j = 1; j<=sNum; j++) {
            name = "mat" + i.toString() + "-" + j.toString();
            matElement = document.getElementById("mat" + i.toString() + "-" + j.toString());
            matValue = matElement.value;
            matNum = parseInt(matValue,10);
            kRow.push(matNum);
        }
        kMat.push(kRow);
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
    text += "Key Size = " + sString + "<br><br>";
    text += "Key Matrix = <br><br>";
    for(i = 0; i<sNum; i++) {
        text += "[" + kMat[i].toString() + "]<br>";
    }
    text += "<br>";
    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += encryptHill(tString, kMat);
    } else {
        text += "Corresponding ciphertext: ";
        text += decryptHill(tString, kMat);
    }

    document.getElementById("demo").innerHTML = text;
};

function getHillTextMatrix(plain, s) {
    plain = plain.toLowerCase();
    var p = plain.length;
    var total = 0;
    var i, modu;
    var pMat = [];
    var pRow;
    while(total<p-s) {
        pRow = [];
        for(i = total; i<total+s; i++) {
            modu = valLetter(plain, i);
            pRow.push(modu);
        }
        pMat.push(pRow);
        total += s;
    }
    
    pRow = [];
    while(total<p) {
        modu = valLetter(plain, total);
        pRow.push(modu);
        total+=1;
    }
    while(pRow.length < s) {
        pRow.push(23);
    }
    pMat.push(pRow);
    return pMat;
}

function encryptHill(plain, mat) {
    var s = mat.length;
    var pMat = getHillTextMatrix(plain, s);
    
    return "Cipher";
}

function decryptHill(cipher, mat) {
    var s = mat.length;
    var cMat = getHillTextMatrix(cipher, s);
    return "Plain";
}