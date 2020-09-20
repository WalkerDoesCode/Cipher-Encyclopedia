function myCTCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;

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
        text += decryptCT(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptCT(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function decryptCT(cipher, k) {
    var ranking = rankLetters(k);
    var cLength = cipher.length;
    var kLength = k.length;
    var complete = cLength%kLength;
    var shortLength = ~~(cLength/kLength);
    var newColumns = [];
    var total = 0, cur, i = 0, j, curCol;
    while(total<cLength) {
        if(ranking.indexOf(i)+1<=complete) {
            cur = shortLength + 1;
        } else {
            cur = shortLength;
        }
        curCol = [];
        for(j = 0; j<cur; j++) {
            curCol.push(cipher.charAt(total+j));
        }
        newColumns.push(curCol);
        total += cur;
    }
    var oldColumns = [];
    for(i = 0; i<kLength; i++) {
        oldColumns.push(newColumns[ranking.indexOf(i)]);
    }
    var text = "";
    for(i = 0; i<shortLength; i++) {
        for(j = 0; j<kLength; j++) {
            text += oldColumns[j][i];
        }
    }
    for(j = 0; j<kLength; j++) {
        if(oldColumns[j].length>shortLength) {
            text += oldColumns[j][shortLength];
        } else {
            break;
        }
    }
    return text;
}

function encryptCT(plain, k) {
    var kLength = k.length;
    var pLength = plain.length;
    var columns = [], i, j = 0;
    for(i = 0; i<kLength; i++) {
        columns.push([]);
    }
    for(i = 0; i<pLength; i++) {
        columns[j].push(plain.charAt(i));
        j+=1;
        j%=kLength;
    }
    var ranking = rankLetters(k);
    var text = "";
    for(i = 0; i<kLength; i++) {
        text += columns[ranking[i]].join("");
    }
    return text;
}