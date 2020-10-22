// modGreater finds the positive modulus v = (value-lowerBound)%mod
// The return value v satisfies 0<=v<mod
function modGreater(value, lowerBound, mod) {
    var v = (value-lowerBound)%mod;
    while(v<0) {
        v+=mod;
    }
    while(v>=mod) {
        v-=mod;
    }
    return v;
}

// myGCD(a,b) returns the positive greatest common divisor of two integers a and b
function myGCD(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if(Math.min(a,b) == 0){
        return Math.max(a,b);
    }
    if(a>b) {
        return myGCD(b,a%b);
    }
    return myGCD(a,b%a);
}

// modPower finds the remainder when base^expo is divided by mod
// The return value v satisfies 0<=v<mod
function modPower(base, expo, mod) {
    var e = 1;
    var p = base;
    var powers = [];
    while(e<=expo) {
        p%=mod;
        powers.push(p);
        e*=2;
        p*=p;
    }
    var bin = expo.toString(2);
    var t = 1;
    for(i = 0; i<bin.length; i++) {
        if(bin[bin.length-i-1] == "1") {
            t*=powers[i];
            t%=mod;
        };
    };
    return t;
}

// factorize finds the prime factorization of an integer
// The return value [p,e] is a 2D arrayy
// The first element is the prime factors
// The second element is the corresponding exponents.
function factorize(n) {
    var i = 2;
    primes = [];
    expos = [];
    var e;
    while(i<=Math.sqrt(n)) {
        if(n%i==0) {
            primes.push(i);
            e = 0;
            while(n%i==0) {
                n/=i;
                e+=1;
            }
            expos.push(e);
        }
        i+=1;
    }
    if(n>1) {
        primes.push(n);
        expos.push(1);
    }
    return [primes,expos];
}

// totient computes Euler's Totient Function for an integer
function totient(n) {
    p = factorize(n)[0];
    p.forEach((x) => {
        n*=(x-1);
        n/=x;
    });
    return n;
}

// modInv computes the modular inverse of a residue a with respect to a modulus mod.
function modInv(a, mod) {
    a = modGreater(a,0,mod);
    if(myGCD(a,mod)!= 1) {
        return -1;
    }
    t = totient(mod);
    return modPower(a, t-1, mod);
}

// invertString returns the inverse of the English text in a string (maintaining case sensitivity)
// This is made specifically for the vigenere cipher where a = 0, b = 1, c = 2, ... z = -1, y = -2, etc.
// For example, invertString("kEz") = "qWb"
function invertString(myString) {
    var text = "";
    for(var i = 0; i<myString.length; i++) {
        character = myString.charCodeAt(i);
        if(65<=character && character<=90) {
            if(character!=65) {
                text += String.fromCharCode(156-character);
            } else {
                text+= String.fromCharCode(65);
            }
        } else if(97<=character && character<=122) {
            if(character!=97) {
                text += String.fromCharCode(220-character);
            } else {
                text+= String.fromCharCode(97);
            }
        } else {
            return -1;
        }
    }
    return text;
}

// stringInsert inserts string v at index i in myString.
// For example, stringInsert("apple", 2, " bob ") returns "ap bob ple"
function stringInsert(myString, i, v) {
    return myString.substring(0,i) + v + myString.substring(i);
}

// inRange returns true only if a value falls within a closed range(low,high)
function inRange(value, low,high) {
    return !(value<low || value>high);
}

// inRangeList checks a list and returns true only if all values in the list fall
// within a closed range [low,high].
function inRangeList(list,low,high) {
    for(var i = 0; i<list.length; i++) {
        if(list[i]<low || list[i]>high) {
            return false;
        }
    }
    return true;
}

// valLetters returns the Vigenere order of each character in a string in a list
// i.e. a = 0, b = 1, ... z = 25 (Not case sensitive)
function valLetters(lString) {
    var nString = lString.toLowerCase();
    var lValues = [], char;
    for(var i = 0; i<nString.length; i++) {
        char = nString.charAt(i);
        lValues.push(char.charCodeAt() - 97);
    };
    return lValues;
}

// valLetter returns the Vigenere order of a given character in a string
// i.e. a = 0, b = 1, ... z = 25 (Not case sensitive)
function valLetter(lString, i = 0, alphabet = "abcdefghijklmnopqrstuvwxyz") {
    alphabet = alphabet.toLowerCase();
    var char = lString.charAt(i);
    char = char.toLowerCase();
    return alphabet.indexOf(char);
}

// rankLetters returns a ranking of the indices from 0 to l-1 based on the alphabetical order of
// the characters in the string (rankLetters("apple") = [0,4,3,1,2])
function rankLetters(nString) {
    var l = nString.length;
    var indices = [];
    var i;
    for(i = 0; i<l; i++) {
        indices.push(i);
    };
    indices.sort((j,k) => 100*(valLetter(nString, j) - valLetter(nString, k))+(j-k));
    return indices;
}

// listNIntegers(n) returns an array with the first n natural numbers.
function listNIntegers(n) {
    var indices = [];
    for(i = 0; i<n; i++) {
        indices.push(i);
    }
    return indices;
}

// invertRankLetters returns a ranking of the position of the alphabetical order of the characters in the string
// based on their corresponding positions in the string (rankLetters("apple") = [0,3,4,2,1]) 
function invertRankLetters(lString) {
    var l = lString.length;
    var indices = listNIntegers(l);
    var rank = rankLetters(lString);
    indices.sort((j,k) => rank.indexOf(j) - rank.indexOf(k));
    var final = [];
    for(i = 0; i<l; i++) {
        final.push(indices.indexOf(i));
    }
    return final;
}

// transpose2D Array swaps the rows and columns of a 2D array to return the transpose of the array.
function transpose2DArray(mat) {
    var newMat = [];
    var rows = mat.length;
    var cols = mat[0].length;
    var r,c,newRow;
    for(c = 0; c < cols; c++) {
        newRow = [];
        for(r = 0; r<rows; r++) {
            newRow.push(mat[r][c]);
        }
        newMat.push(newRow);
    }
    return newMat;
}

// htmlHasID(elementID) returns true if an HTML element with ID "elementID" exists and false otherwise
function htmlHasID(elementID) {
    var element = document.getElementById(elementID);
    return (element!=null);
}

// multiplyMatrices(a,b) returns the matrix product of two 2D arrays a and b as a 2D Array.
function multiplyMatrices(a, b) {
    r1 = a.length;
    c1 = a[0].length;
    r2 = b.length;
    c2 = b[0].length;
    if(c1!=r2) {
        return [];
    }
    var i,j,k;
    var endMat = [], endRow, total;
    for(i = 0; i<r1; i++) {
        endRow = [];
        for(j = 0; j<c2; j++) {
            total = 0;
            for(k = 0; k<c1; k++) {
                total+= a[i][k] * b[k][j];
            }
            endRow.push(total);
        }
        endMat.push(endRow);
    }
    return endMat;
}

// mod2DArray(a, mod) returns the 2D array that results from taking the mod of every element in a with modulus mod.
function mod2DArray(a, mod) {
    var ar = a.length;
    var end = [];
    var i = 0, row;
    for(i = 0; i<ar; i++) {
        row = a[i].map((x) => (modGreater(x, 0, mod)));
        end.push(row);
    }
    return end;
}

// stringify2DArray(a) returns each row of the 2D array a on its own line.
function stringify2DArray(a) {
    var text = "[";
    for(var i = 0; i<a.length; i++) {
        text += "[" + a[i].toString() + "]"
        if(i<a.length-1) {
            text += "<br>";
        }
    }
    text+="]";
    return text;
}

// invertMatrix(a) returns the inverse of a square 2D matrix a
function invertMatrix(a) {
    var r = a.length;
    var c = a[0].length;
    if(r!=c) {
        return []; // Not a square matrix.
    }
    var i,j,k;
    // Make Identity Matrix I_r and Copy of Matrix a
    var identityR = [], idRow;
    var copyA = [], copRow;
    for(i = 0; i<r; i++) {
        idRow = [];
        copRow = [];
        for(j = 0; j<c; j++) {
            if(i==j) {
                idRow.push(1);
            } else {
                idRow.push(0);
            }
            copRow.push(a[i][j]);
        }
        identityR.push(idRow);
        copyA.push(copRow);
    }
    
    var diagElement, temp;
    for(i = 0; i<r; i++) {
        diagElement = copyA[i][i];

        // If diagElement == 0, switch ith row with lower row.
        if(diagElement==0) {
            for(j = i+1; j<r; j++) {
                if(copyA[j][i] != 0) {
                    for(k = 0; k<c; k++) {
                        // Swap rows i and j in copyA
                        temp = copyA[i][k];
                        copyA[i][k] = copyA[j][k];
                        copyA[j][k] = temp;
                        // Perform same row operations on identity matrix
                        temp = identityR[i][k];
                        identityR[i][k] = identityR[j][k];
                        identityR[j][k] = temp;
                    }
                    break;
                }
            }
            diagElement = copyA[i][i]
            if(diagElement==0) {
                return []; // Matrix is not invertible
            }
        }

        
        // Scale ith row down by factor of diagElement to make the diagonal element 1
        // Perform same row operation on identity matrix
        for(j = 0; j<c; j++) {
            copyA[i][j] = copyA[i][j]/parseFloat(diagElement);
            identityR[i][j] = identityR[i][j]/parseFloat(diagElement);
        }
        
        for(j = 0; j<r; j++) {
            // Subtract row i from all other rows to clear the ith column
            if(j==i) {
                continue;
            }

            temp = copyA[j][i];

            // Subtract temp*(ith row) from jth row
            // Perform same row operation on the identity matrix.
            for(k = 0; k<r; k++) {
                copyA[j][k] -= temp*copyA[i][k];
                identityR[j][k] -= temp*identityR[i][k];
            }
        }
    }
    return identityR;
}

// complementSubMatrix(a,i,j) returns the complementary sub-matrix of 2D matrix a relative
// to the cell at indices i,j. I use this to recursively compute the determinant.
function complementSubMatrix(a, i, j) {
    var r = a.length;
    var c = a[0].length;
    var p,q, newRow, newMat = [];
    for(p = 0; p<r; p++) {
        if(p==i) {
            continue;
        }
        newRow = [];
        for(q = 0; q<c; q++) {
            if(q==j) {
                continue;
            }
            newRow.push(a[p][q]);
        }
        newMat.push(newRow);
    }
    return newMat;
}

// determinantMatrix(a) recursively calculates the determinant of matrix a.
function determinantMatrix(a) {
    var r = a.length;
    var c = a[0].length;
    if(r!=c) {
        return 0;
    }
    if(r==1) {
        return a[0][0];
    }
    if(r==2) {
        return a[0][0]*a[1][1] - a[0][1]*a[1][0];
    }
    var total = 0, i, value;
    for(i = 0; i<c; i++) {
        value = a[0][i]*determinantMatrix(complementSubMatrix(a, 0, i));
        if(i%2==0) {
            total+=value;
        } else {
            total-=value;
        }
    }
    return total;
}

// roundMatrix(a) returns the matrix formed by rounding all elements of a to the nearest integer.
function roundMatrix(a) {
    var copyA = [];
    var r = a.length, c = a[0].length;
    var i,j, copRow;
    for(i = 0; i<r; i++) {
        copRow = [];
        for(j = 0; j<c; j++) {
            copRow.push(Math.round(a[i][j]));
        }
        copyA.push(copRow);
    }
    return copyA;
}

// scalarMultiplyMatrix(mat, s) returns the matrix formed by multiplying all elements of mat by s
function scalarMultiplyMatrix(mat, s) {
    var r = mat.length;
    var c = mat[0].length;
    var newMat = [];
    var newRow,i,j;
    for(i = 0; i<r; i++) {
        newRow = [];
        for(j = 0; j<c; j++) {
            newRow.push(mat[i][j]*s);
        }
        newMat.push(newRow);
    }
    return newMat;
}

// contains2DArray(mat,v) returns true if v is in the 2D Array mat and false otherwise.
function contains2DArray(mat, v) {
    var r = mat.length;
    var c = mat[0].length;
    var i,j;
    for(i = 0; i<r; i++) {
        for(j = 0; j<c; j++) {
            if(mat[i][j] == v) {
                return true;
            }
        }
    }
    return false;
}

// shiftString(string, shift) shifts all characters in string forward by shift places in the alphabet.
// Keeps original case and does not change non alphabetical characters.
function shiftString(string, shift) {
    var text = "";
    var character = 0;
    var newAscii = 0;
    var v;
    for(i = 0; i<string.length; i++) {
        character = string.charCodeAt(i);
        if(65<=character && character<=90) {
            v = modGreater(character,65-shift,26);
            newAscii = v + 65;
        } else if(97<=character && character<=122) {
            v = modGreater(character,97-shift,26);
            newAscii = v + 97;
        } else {
            newAscii = character;
        }
        text += String.fromCharCode(newAscii);
    }
    return text;
}

// multiplyString(string, mult) multiplies the alphabetic indices of all alphabetic characters in string
// by mult and returns the corresponding letters in a new string. 
function multiplyString(string, mult) {
    if(myGCD(mult,26)!=1) {
        return string;
    }
    mult = modGreater(mult,0,26);
    var text = "";
    var character, newAscii, v, i;
    for(i = 0; i< string.length; i++) {
        character = string.charCodeAt(i);
        if(65<=character && character<=90) {
            v = modGreater(character, 65, 26);
            newAscii = modGreater((v*mult),0,26) + 65;
        } else if(97<=character && character<=122) {
            v = modGreater(character, 97, 26);
            newAscii = modGreater((v*mult),0,26) + 97;
        } else {
            newAscii = character;
        }
        text+=String.fromCharCode(newAscii);
    }
    return text;
}

// simpleString2DArray(mat) concatenates all objects in the 2D array mat as a single string.
function simpleString2DArray(mat) {
    var text = "";
    var i,j;
    for(i = 0;i<mat.length;i++) {
        for(j = 0; j<mat[i].length; j++) {
            text += mat[i][j].toString();
        }
    }
    return text;
}

// columnarTransposition(plain, k) performs a columnar transposition on the letters of plain based on the letters of k.
// See the CT Cipher
function columnarTransposition(plain, k) {
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

// invertColumnarTransposition(cipher, k) performs a reverse columnar transposition on the letters of cipher based on the letters of k.
// See the CT Cipher
function invertColumnarTransposition(cipher, k) {
    var invRanking = invertRankLetters(k);
    var cLength = cipher.length;
    var kLength = k.length;
    var complete = cLength%kLength;
    var shortLength = ~~(cLength/kLength);
    var newColumns = [];
    var total = 0, cur, i = 0, j, curCol;
    while(total<cLength) {
        if(invRanking.indexOf(i)+1<=complete) {
            cur = shortLength + 1;
        } else {
            cur = shortLength;
        }
        i+=1;
        curCol = [];
        for(j = 0; j<cur; j++) {
            curCol.push(cipher.charAt(total+j));
        }
        newColumns.push(curCol);
        total += cur;
    }
    var oldColumns = [];
    for(i = 0; i<kLength; i++) {
        oldColumns.push(newColumns[invRanking[i]]);
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

// baseStringDigits(num, numDigits, base) returns the least significant "numDigits" number of digits of the
// string of the value of num in base "base". For example, baseStringDigits(9,5,2) = "01001", baseStringDigits(14,3,2) = "110"
function baseStringDigits(num, numDigits, base=2) {
    var s = num.toString(base);
    var l = s.length;
    if(l>numDigits) {
        return s.substring(l-numDigits, l);
    } else {
        while(l<numDigits) {
            s = "0" + s;
            l+=1;
        }
    }
    return s;
}

// reverseValLetter(n) returns the letter in the alphabet associated with the vigenere order n.
function reverseValLetter(n) {
    n = modGreater(n,0,26);
    return String.fromCharCode(97+n);
}

// convertLettersInString(myString, oldC, newC) returns myString with all instances of oldC replaced with newC.
function convertLettersInString(myString, oldC, newC) {
    var text = "";
    var i, l = myString.length, char;
    for(i = 0; i<l; i++) {
        char = myString.charAt(i);
        if(char==oldC) {
            text += newC;
        } else {
            text += char;
        }
    }
    return text;
}

// getMorseCode(myString) returns the Morse Code equivalent of myString.
function getMorseCode(myString) {
    myString = myString.toLowerCase();
    var l = myString.length;
    var i, text = "", char, v;
    var alphabet = "abcdefghijklmnopqrstuvwxyz.,:\"\'!?@-;()=1234567890 ";
    var morseAlphabet = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--..",".-.-.-","--..--","---...",".-..-.",".----.","-.-.--","..--..",".--.-.","-....-","-.-.-.","-.--.","-.--.-","-...-",".----","..---","...--","....-",".....","-....","--...","---..","----.","-----",""];
    for(i = 0; i<l; i++) {
        char = myString.charAt(i);
        v = alphabet.indexOf(char);
        if(v<0) {
            text+="-..-";
        } else {
            text+=morseAlphabet[v];
        }
        text+="x";
    }
    return text;
}

// decryptMorseCode(myString) returns the English text equivalent of the morse code myString.
function decryptMorseCode(myString) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz.,:\"\'!?@-;()=1234567890 ";
    var morseAlphabet = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--..",".-.-.-","--..--","---...",".-..-.",".----.","-.-.--","..--..",".--.-.","-....-","-.-.-.","-.--.","-.--.-","-...-",".----","..---","...--","....-",".....","-....","--...","---..","----.","-----",""];
    myString = myString.toLowerCase();
    var i, v, sub, text = "";
    while(myString.length>0) {
        v = myString.indexOf("x");
        if(v==-1) {
            text += alphabet.charAt(morseAlphabet.indexOf(myString));
            return text;
        }
        sub = myString.substring(0,v);
        text += alphabet.charAt(morseAlphabet.indexOf(sub));
        myString = myString.substring(v+1, myString.length);
    }
    return text;
}

// Returns a rearrangement of alphabet that begins with the corresponding (non-repeating)
// letters in key.
function keyWithAlphabet(key, alphabet) {
    key = key.toLowerCase();
    alphabet = alphabet.toLowerCase();
    var grid = "";
    var character, i;
    for(i = 0; i<key.length; i++) {
        character = key.charAt(i);
        character = character.toLowerCase();
        if(!(grid.includes(character)) && alphabet.includes(character)) {
            grid += character;
        }
    }
    var reducedAlphabet = "";
    for(i = 0; i<alphabet.length; i++) {
        character = alphabet.charAt(i);
        if(!(grid.includes(character))) {
            reducedAlphabet+=character;
        }
    }
    return grid+reducedAlphabet;
}

// Returns the alphabet in lowercase.
function getAlphabet() {
    return "abcdefghijklmnopqrstuvwxyz";
}

// Converts the letters in a string to a 2D array with dimensions r x c. Fills in all empty spaces with dash "-"
function make2DArrayFromString(tString, r, c) {
    var grid = [];
    var total = 0, l = tString.length;
    var i,j,row;
    for(i = 0; i<r; i++) {
        row = [];
        for(j = 0; j<c; j++) {
            if(total<l) {
                row.push(tString.charAt(total));
            } else {
                row.push("-");
            }
            total+=1;
        }
        grid.push(row);
    }
    return grid;
}

// Appends the first b letters of tString to the end of the remaining letters.
// Example: byPassString("apple", 2) = "pleap"
function byPassString(tString, b) {
    var l = tString.length;
    b = modGreater(b, 0, l);
    var text = tString.substring(b, l);
    text += tString.substring(0, b);
    return text;
}

// Returns the row and column number of an element in a 2D Array.
function indexOf2DArray(mat, v) {
    var r = mat.length, c = mat[0].length;
    var i,j;
    for(i = 0; i<r; i++) {
        for(j = 0; j<c; j++) {
            if(mat[i][j] == v) {
                return [i,j];
            }
        }
    }
    return [-1,-1];
}

// substituteAlphabets(text,newA,oldA) replaces instances of letters from oldA in text with the corresponding letters in newA
function substituteAlphabets(plain, newA, oldA = getAlphabet()) {
    plain = plain.toLowerCase();
    oldA = oldA.toLowerCase();
    newA = newA.toLowerCase();
    var text = "";
    var l = plain.length;
    var val, i;
    for(i = 0; i<l; i++) {
        val = valLetter(plain, i, oldA);
        text += newA.charAt(val);
    }
    return text;
}

// multiListSortIndicesForward(list, order) sorts the values in list based on the corresponding values in order. (Used in Myszkowski)
// For example, multiListSortIndicesForward(['a','b','c','d','e'], [2, 0, 1, 1, 2]) returns ['b', 'c', 'd', 'a', 'e'].
function multiListSortIndicesForward(list, order) {
    var l = list.length;
    if(l!=order.length) {
        return list;
    }
    var i;
    var indices = [];
    for(i = 0; i<l; i++) {
        indices.push(i);
    }
    indices.sort((a,b) => order[a]-order[b]);
    var final = [];
    for(i = 0; i<l; i++) {
        final.push(list[indices[i]]);
    }
    return final;
}

// multiListSortIndicesInverse(list, order) sorts the values in list based on the corresponding values in order. (Used in Myszkowski)
// For example, multiListSortIndicesInverse(['b','c','d','a','e'], [2, 0, 1, 1, 2]) returns ['a','b','c','d','e'].
function multiListSortIndicesInverse(list, order) {
    var l = list.length;
    if(l!=order.length) {
        return list;
    }
    var i;
    var indices = [];
    for(i = 0; i<l; i++) {
        indices.push(i);
    }
    indices.sort((a,b) => order[a]-order[b]);
    var final = [];
    for(i = 0; i<l; i++) {
        final.push(list[indices.indexOf(i)]);
    }
    return final;
}

// numValueInArray(v, array, end) returns the number of elements with value v in array before the index end
function numValueInArray(v, array, end = array.length) {
    var i = 0;
    var total = 0;
    while(i<end) {
        if(array[i]==v) {
            total+=1;
        }
        i+=1;
    }
    return total;
}

// numRangeInArray(l, r, array, end) returns the number of elements in the range [l,r) in array before the index end
function numRangeInArray(l, r, array, end = array.length) {
    var i = 0;
    var total = 0;
    while(i<end) {
        if(l<=array[i] && array[i]<r) {
            total+=1;
        }
        i+=1;
    }
    return total;
}

// indexCharString(str, char, start) returns the first index at or after start in string with the letter char
function indexCharString(str, char, start = 0) {
    var i, l = str.length;
    for(i = start; i<l; i++) {
        if(str.charAt(i) == char) {
            return i;
        }
    }
    return -1;
}

// reverseString(string) reverses the characters in a string and returns the result.
function reverseString(string) {
    var text = "";
    var l = string.length, i;
    for(i = l-1; i>=0; i--) {
        text += string.charAt(i);
    }
    return text;
}

// rearrangeBasedOnRank(string, rank) rearranges the characters in rank based on the ranking in rank.
function rearrangeBasedOnRank(string, rank) {
    var text = "";
    if(string.length!=rank.length) {
        return string;
    }
    var l = rank.length, i;
    for(i = 0; i<l; i++) {
        text += string.charAt(rank[i]);
    }
    return text;
}