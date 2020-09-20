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