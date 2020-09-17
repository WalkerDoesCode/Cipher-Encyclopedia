function myRailfenceCipher() {
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
        text += decryptRailfence(tString, kNum);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptRailfence(tString, kNum);
    }

    document.getElementById("demo").innerHTML = text;
};

function encryptRailfence(plain, k) {
    if(k<=1 || k>=plain.length) {
        return plain;
    }
    var rows = [];
    var i,j;
    for(i = 0; i<k; i++) {
        rows.push([]);
    }
    var rem, char;
    for(i = 0; i<plain.length; i++) {
        char = plain.charAt(i);
        rem = i%(2*k-2);
        if(rem==0) {
            rows[0].push(char);
        } else if(rem<=k-1) {
            rows[rem].push(char);
        } else {
            rows[2*k-2-rem].push(char);
        }
    }
    var text = "";
    for(i = 0; i<k; i++) {
        for(j=0; j<rows[i].length; j++) {
            text += rows[i][j];
        }
    }
    return text;
};

function decryptRailfence(cipher, k) {
    if(k<=1 || k>=cipher.length) {
        return cipher;
    }
    var l = cipher.length;
    var period = 2*k-2;
    var nCycles = ~~(l/period);
    var final = l%period;
    var divisions = []
    var i,tot;
    for(i = 0; i<k; i++) {
        tot = 0;
        if(i==0 || i == k-1) {
            tot = nCycles;
        } else {
            tot = 2*nCycles;
            if(period-i<final) {
                tot+=1;
            }
        }
        if(i<final) {
            tot+=1;
        }
        divisions.push(tot);
    }
    var stringDivisions = [], start = 0, v;
    for(i = 0; i<k; i++) {
        v = divisions[i]
        stringDivisions.push(cipher.substring(start, start+v));
        start += v;
    }
    var text = "", mod;
    var j = 0, n = 0;
    for(i = 0; i<l; i++) {
        if(j==0 || j == k-1) {
            text+=stringDivisions[j].charAt(n);
        } else if(j < k-1) {
            text+=stringDivisions[j].charAt(2*n);
        } else {
            text+=stringDivisions[period-j].charAt(2*n+1);
        }
        j++;
        if(j==period) {
            j = 0;
            n+=1;
        }
    }
    return text;
};