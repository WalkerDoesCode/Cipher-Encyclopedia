function myStraddleCheckerboardCipher() {
    var t = document.getElementById("cipherText");
    var tString = t.value;

    var k = document.getElementById("cipherKey");
    var kString = k.value;

    var n1 = document.getElementById("cipherDigit1");
    var n1String = n1.value;
    var kNum1 = parseInt(n1String);

    var n2 = document.getElementById("cipherDigit2");
    var n2String = n2.value;
    var kNum2 = parseInt(n2String);

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

    kString = kString.toLowerCase();
    kString = keyWithAlphabet(kString, getAlphabet());

    text += tString + "<br><br>";
    text += "Key Alphabet = " + kString + "<br><br>";
    text += "Key Digit 1 = " + n1String + "<br><br>";
    text += "Key Digit 2 = " + n2String + "<br><br>";

    if(cipherOperation == "1") {
        text += "Corresponding plaintext: ";
        text += decryptStraddleCheckerboard(tString, kString, kNum1, kNum2);
    } else {
        text += "Corresponding ciphertext: ";
        text += encryptStraddleCheckerboard(tString, kString, kNum1, kNum2);
    }

    document.getElementById("demo").innerHTML = text;
};

function assembleCheckerboard(keyAlphabet, num1, num2) {
    var checkerboard = [];
    var i, j;
    var total = 0, row;
    for(i = 0; i<3; i++) {
        row = [];
        if(i == 1) {
            for(j = 0; j<10; j++) {
                row.push(keyAlphabet.charAt(total));
                total+=1;
            }
        } else if(i == 2) {
            for(j = 0; j<8; j++) {
                row.push(keyAlphabet.charAt(total));
                total+=1;
            }
            row.push("-");
            row.push("-");
        } else {
            for(j = 0; j<10; j++) {
                if(j!=num1 && j!=num2) {
                    row.push(keyAlphabet.charAt(total));
                    total+=1;
                } else {
                    row.push("-");
                }
            }
        }
        checkerboard.push(row);
    }
    return checkerboard;
}

function decryptStraddleCheckerboard(cipherText, keyAlphabet, num1, num2) {
    var checkerboard = assembleCheckerboard(keyAlphabet, num1, num2);
    var i = 0, l = cipherText.length;
    var text = "", char, char2;
    while(i<l) {
        char = parseInt(cipherText.charAt(i));
        if(char==num1) {
            char2 = parseInt(cipherText.charAt(i+1));
            text += checkerboard[1][char2];
            i+=2;
        } else if(char==num2) {
            char2 = parseInt(cipherText.charAt(i+1));
            text += checkerboard[2][char2];
            i+=2;
        } else {
            text += checkerboard[0][char];
            i+=1;
        }
    }
    return text;
}

function encryptStraddleCheckerboard(plainText, keyAlphabet, num1, num2) {
    plainText = plainText.toLowerCase();
    var checkerboard = assembleCheckerboard(keyAlphabet, num1, num2);
    var row1 = checkerboard[0], row2 = checkerboard[1], row3 = checkerboard[2];
    var text = "";
    var i, l = plainText.length, char;
    num1 = num1.toString();
    num2 = num2.toString();
    for(i = 0; i<l; i++) {
        char = plainText.charAt(i);
        if(row1.includes(char)) {
            text += row1.indexOf(char).toString();
        } else if(row2.includes(char)) {
            text += num1 + row2.indexOf(char).toString();
        } else if(row3.includes(char)) {
            text += num2 + row3.indexOf(char).toString();
        } else {
            text += num1 + num2;
        }
    }
    return text;
}