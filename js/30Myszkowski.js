function myMyszkowskiCipher() {
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
        text += decryptMyszkowski(tString, kString);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptMyszkowski(tString, kString);
    }

    document.getElementById("demo").innerHTML = text;
};

function exactTranspositionNumbers(k) {
    k = k.toLowerCase();
    var orders = [];
    var i, l = k.length;
    for(i=0; i<l; i++) {
        orders.push(parseInt(k.charCodeAt(i)));
    }
    var copy = orders.slice();
    copy = copy.sort((a,b) => a-b);
    var newOrders = [0], j = 0;
    for(i = 1; i<l; i++) {
        if(copy[i]>copy[i-1]) {
            j+=1;
        }
        newOrders.push(j);
    }
    return multiListSortIndicesInverse(newOrders, orders);
}

function getMyszkowskiColumnsFromGroup(group, numCols) {
    var l = group.length;
    var i = 0, columns = [];
    var j, text;
    while(i<numCols) {
        j = i;
        text = "";
        while(j<l) {
            text += group.charAt(j);
            j+=numCols;
        }
        columns.push(text);
        i+=1;
    }
    return columns;
}

function decryptMyszkowski(cipher, k) {
    var indices = exactTranspositionNumbers(k);
    var effectiveIndices = rankLetters(k);
    var l = cipher.length;
    var kl = k.length;
    var small = ~~(l/kl);
    var numLarge = l%kl;
    var numLargeGroup, groupSize;
    var copy = indices.slice().sort();
    var i = 0,j = 0,k = 0;
    var groups = [];
    var groupLengths = [];
    while(i<kl) {
        total = 1;
        while(i<kl-1 && copy[i]==copy[i+1]) {
            i+=1;
            total+=1;
        }
        if(j<numLarge) {
            numLargeGroup = Math.min(numLarge-j,total);
        } else {
            numLargeGroup = 0;
        }
        groupSize = small*total+numLargeGroup;
        groups.push(cipher.substring(k, k+groupSize));
        groupLengths.push(total);
        k+=groupSize;
        j+=total;
        i+=1;
    }
    if(k<l) {
        return "ERROR SOMETHING MESSED UP";
    }
    var columns = [], c;
    for(i = 0; i<groups.length; i++) {
        c = getMyszkowskiColumnsFromGroup(groups[i], groupLengths[i]);
        c.forEach((x) => {
            columns.push(x);
        });
    }
    return columns.toString();
}

function encryptMyszkowski(plain, k) {
    var indices = exactTranspositionNumbers(k);
    var kl = k.length;
    var l = plain.length;
    var columns = [];
    var i;
    for(i = 0; i<kl; i++) {
        columns.push([]);
    }
    var j = 0,k;
    for(i = 0; i<l; i++) {
        columns[j].push(plain.charAt(i));
        j+=1;
        j%=kl;
    }
    columns = multiListSortIndicesForward(columns, indices);
    indices = indices.sort();
    return stringify2DArray(columns);
    var group = [], text = "", smallText;
    for(i = 0; i<kl; i++) {
        smallText = "";
        var group = [columns[i]];
        while(i<kl && indices[i]==indices[i+1]) {
            i+=1;
            group.push(columns[i]);
        }
        for(j = 0; j<group[0].length; j++) {
            for(k = 0; k<group.length; k++) {
                if(j<group[k].length) {
                    smallText+=group[k][j];
                }
            }
        }
        text+=smallText;
    }
    return text;
}