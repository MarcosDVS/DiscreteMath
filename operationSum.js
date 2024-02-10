//Suma de binarios
function addBinary() {
    var binaryInput1 = document.getElementById("binaryInput1").value;
    var binaryInput2 = document.getElementById("binaryInput2").value;

    // Check if the numbers are negative
    var isNegative1 = binaryInput1.startsWith("-");
    var isNegative2 = binaryInput2.startsWith("-");

    // Remove the negative sign for processing
    binaryInput1 = binaryInput1.replace("-", "");
    binaryInput2 = binaryInput2.replace("-", "");

    // Validate input as binary numbers with optional fractional parts
    if (!/^-?[01]+(\.[01]+)?$/.test(binaryInput1) || !/^-?[01]+(\.[01]+)?$/.test(binaryInput2)) {
        alert("Please enter valid binary numbers.");
        return;
    }

    // Split binary numbers into integer and fractional parts
    var [intPart1, fracPart1 = ""] = binaryInput1.split('.');
    var [intPart2, fracPart2 = ""] = binaryInput2.split('.');

    // Handle negative binary numbers
    if (isNegative1) {
        intPart1 = negateBinary(intPart1);
    }

    if (isNegative2) {
        intPart2 = negateBinary(intPart2);
    }

    // Calculate the sum of integer parts
    var intSum = (isNegative1 ? -1 : 1) * parseInt(intPart1, 2) + (isNegative2 ? -1 : 1) * parseInt(intPart2, 2);

    // Calculate the sum of fractional parts
    var fracSum = addBinaryFractions(fracPart1, fracPart2);

    // Combine integer and fractional parts for the final result
    var binarySumResult = intSum.toString(2) + (fracSum ? "." + fracSum : "");

    // Display the result
    document.getElementById("binarySumResult").textContent = binarySumResult;
}

function negateBinary(binaryNumber) {
    // Find the one's complement of the binary number
    var onesComplement = binaryNumber.split('').map(bit => (bit === '0' ? '1' : '0')).join('');

    // Add 1 to the one's complement to get the two's complement
    var twosComplement = addBinaryFractions(onesComplement, '1');

    return twosComplement;
}

function addBinaryFractions(frac1, frac2) {
    // Pad the shorter fraction with zeros to make both fractions equal in length
    var maxLength = Math.max(frac1.length, frac2.length);
    frac1 = frac1.padEnd(maxLength, '0');
    frac2 = frac2.padEnd(maxLength, '0');

    var carry = 0;
    var result = "";

    // Iterate through the fractions from right to left, adding each bit and handling carry
    for (var i = maxLength - 1; i >= 0; i--) {
        var bit1 = parseInt(frac1[i]);
        var bit2 = parseInt(frac2[i]);

        var sum = bit1 + bit2 + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    // If there's a carry left, add it to the leftmost position
    if (carry > 0) {
        result = carry + result;
    }

    return result;
}


//Suma de octales
function addOctal() {
    var octalInput1 = document.getElementById("octalInput1").value;
    var octalInput2 = document.getElementById("octalInput2").value;

    // Check if the numbers are negative
    var isNegative1 = octalInput1.startsWith("-");
    var isNegative2 = octalInput2.startsWith("-");

    // Remove the negative sign for processing
    octalInput1 = octalInput1.replace("-", "");
    octalInput2 = octalInput2.replace("-", "");

    // Validate input as octal numbers with optional fractional parts
    if (!/^-?[0-7]+(\.[0-7]+)?$/.test(octalInput1) || !/^-?[0-7]+(\.[0-7]+)?$/.test(octalInput2)) {
        alert("Please enter valid octal numbers.");
        return;
    }

    // Split octal numbers into integer and fractional parts
    var [intPart1, fracPart1 = ""] = octalInput1.split('.');
    var [intPart2, fracPart2 = ""] = octalInput2.split('.');

    // Handle negative octal numbers
    if (isNegative1) {
        intPart1 = negateOctal(intPart1);
    }

    if (isNegative2) {
        intPart2 = negateOctal(intPart2);
    }

    // Calculate the sum of integer parts
    var intSum = (isNegative1 ? -1 : 1) * parseInt(intPart1, 8) + (isNegative2 ? -1 : 1) * parseInt(intPart2, 8);

    // Calculate the sum of fractional parts
    var fracSum = addOctalFractions(fracPart1, fracPart2);

    // Combine integer and fractional parts for the final result
    var octalSumResult = intSum.toString(8) + (fracSum ? "." + fracSum : "");

    // Display the result
    document.getElementById("octalSumResult").textContent = octalSumResult;
}

function negateOctal(octalNumber) {
    // Find the one's complement of the octal number
    var onesComplement = octalNumber.split('').map(digit => (7 - parseInt(digit)).toString()).join('');

    // Add 1 to the one's complement to get the two's complement
    var twosComplement = addOctalFractions(onesComplement, '1');

    return twosComplement;
}

function addOctalFractions(frac1, frac2) {
    // Pad the shorter fraction with zeros to make both fractions equal in length
    var maxLength = Math.max(frac1.length, frac2.length);
    frac1 = frac1.padEnd(maxLength, '0');
    frac2 = frac2.padEnd(maxLength, '0');

    var carry = 0;
    var result = "";

    // Iterate through the fractions from right to left, adding each digit and handling carry
    for (var i = maxLength - 1; i >= 0; i--) {
        var digit1 = parseInt(frac1[i], 8);
        var digit2 = parseInt(frac2[i], 8);

        var sum = digit1 + digit2 + carry;
        result = (sum % 8).toString() + result;
        carry = Math.floor(sum / 8);
    }

    // If there's a carry left, add it to the leftmost position
    if (carry > 0) {
        result = carry.toString() + result;
    }

    return result;
}


//Suma de hexadecimales
function addHexadecimal() {
    var hexInput1 = document.getElementById("hexInput1").value;
    var hexInput2 = document.getElementById("hexInput2").value;

    // Validate input as hexadecimal numbers with optional fractional parts
    if (!/^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(hexInput1) || !/^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(hexInput2)) {
        alert("Please enter valid hexadecimal numbers.");
        return;
    }

    // Split hexadecimal numbers into integer and fractional parts
    var [intPart1, fracPart1 = ""] = hexInput1.split('.');
    var [intPart2, fracPart2 = ""] = hexInput2.split('.');

    // Calculate the sum of integer parts
    var intSum = parseInt(intPart1, 16) + parseInt(intPart2, 16);

    // Calculate the sum of fractional parts
    var fracSum = addHexadecimalFractions(fracPart1, fracPart2);

    // Combine integer and fractional parts for the final result
    var hexSumResult = intSum.toString(16).toUpperCase() + (fracSum ? "." + fracSum : "");

    // Display the result
    document.getElementById("hexSumResult").textContent = hexSumResult;
}

function addHexadecimalFractions(frac1, frac2) {
    // Pad the shorter fraction with zeros to make both fractions equal in length
    var maxLength = Math.max(frac1.length, frac2.length);
    frac1 = frac1.padEnd(maxLength, '0');
    frac2 = frac2.padEnd(maxLength, '0');

    var carry = 0;
    var result = "";

    // Iterate through the fractions from right to left, adding each digit and handling carry
    for (var i = maxLength - 1; i >= 0; i--) {
        var digit1 = parseInt(frac1[i], 16);
        var digit2 = parseInt(frac2[i], 16);

        var sum = digit1 + digit2 + carry;
        result = (sum % 16).toString(16) + result;
        carry = Math.floor(sum / 16);
    }

    // If there's a carry left, add it to the leftmost position
    if (carry > 0) {
        result = carry.toString(16) + result;
    }

    return result;
}
