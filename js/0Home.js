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
function valLetter(lString, i) {
    var char = lString.charAt(i);
    char = char.toLowerCase();
    return char.charCodeAt() - 97;
}

// rankLetters returns a ranking of the indices from 0 to l-1 based on the alphabetical order of
// the characters in the string
function rankLetters(lString) {
    var nString = lString.toLowerCase();
    var l = nString.length;
    var indices = [];
    var i;
    for(i = 0; i<l; i++) {
        indices.push(i);
    };
    indices.sort((j,k) => valLetter(nString, j) - valLetter(nString, k));
    return indices;
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