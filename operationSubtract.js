
// Binary Subtraction
function subtractBinary() {
    var binaryInput1 = document.getElementById("binaryInput1").value;
    var binaryInput2 = document.getElementById("binaryInput2").value;

    // Validate input as binary numbers with optional fractional parts
    if (!/^[01]+(\.[01]+)?$/.test(binaryInput1) || !/^[01]+(\.[01]+)?$/.test(binaryInput2)) {
        alert("Please enter valid binary numbers.");
        return;
    }

    // Perform binary subtraction
    var binaryResult = performBinarySubtraction(binaryInput1, binaryInput2);

    // Display the result
    document.getElementById("binarySubtractResult").textContent = binaryResult;
}
function performBinarySubtraction(binary1, binary2) {
    // Ensure binary numbers have the same length by padding with zeros
    const maxLength = Math.max(binary1.length, binary2.length);
    binary1 = binary1.padStart(maxLength, '0');
    binary2 = binary2.padStart(maxLength, '0');

    let borrow = 0;
    let result = '';

    // Iterate through the binary digits from right to left
    for (let i = maxLength - 1; i >= 0; i--) {
        const bit1 = parseInt(binary1[i]);
        const bit2 = parseInt(binary2[i]);

        // Apply borrow from the previous column
        let tempResult = bit1 - borrow - bit2;

        if (tempResult < 0) {
            // Borrow 1 from the next column
            tempResult += 2;
            borrow = 1;
        } else {
            borrow = 0;
        }

        // Append the current digit to the result
        result = tempResult + result;
    }

    // Remove leading zeros from the result
    result = result.replace(/^0+/, '');

    // If the result is empty, it means the numbers were equal
    return result === '' ? '0' : result;
}


// Octal Subtraction
function subtractOctal() {
    var octalInput1 = document.getElementById("octalInput1").value;
    var octalInput2 = document.getElementById("octalInput2").value;

    // Validate input as octal numbers with optional fractional parts
    if (!/^[0-7]+(\.[0-7]+)?$/.test(octalInput1) || !/^[0-7]+(\.[0-7]+)?$/.test(octalInput2)) {
        alert("Please enter valid octal numbers.");
        return;
    }

    // Perform octal subtraction
    var octalResult = performOctalSubtraction(octalInput1, octalInput2);

    // Display the result
    document.getElementById("octalSubtractResult").textContent = octalResult;
}

function performOctalSubtraction(octal1, octal2) {
    // Convert octal numbers to decimal
    var decimal1 = parseInt(octal1, 8);
    var decimal2 = parseInt(octal2, 8);

    // Check if octalInput2 is greater than octalInput1
    if (decimal2 > decimal1) {
        // Swap the numbers to ensure a positive result
        var temp = decimal1;
        decimal1 = decimal2;
        decimal2 = temp;
    }

    // Calculate the decimal result
    var resultDecimal = decimal1 - decimal2;

    // Check for negative result
    if (resultDecimal < 0) {
        // Apply twos complement for negative result
        var resultBinary = (resultDecimal >>> 0).toString(2); // Convert to unsigned binary
        var twosComplement = performBinarySubtraction("0".repeat(resultBinary.length), resultBinary);
        return parseInt(twosComplement, 2).toString(8);
    } else {
        // Convert positive decimal result back to octal
        return resultDecimal.toString(8);
    }
}


// Hexadecimal Subtraction
function subtractHexadecimal() {
    var hexInput1 = document.getElementById("hexInput1").value;
    var hexInput2 = document.getElementById("hexInput2").value;

    // Validate input as hexadecimal numbers with optional fractional parts
    if (!/^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(hexInput1) || !/^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(hexInput2)) {
        alert("Please enter valid hexadecimal numbers.");
        return;
    }

    // Perform hexadecimal subtraction
    var hexResult = performHexadecimalSubtraction(hexInput1, hexInput2);

    // Display the result
    document.getElementById("hexSubtractResult").textContent = hexResult;
}

// Helper function for hexadecimal subtraction
function performHexadecimalSubtraction(hex1, hex2) {
    // Convert hexadecimal numbers to decimal
    var decimal1 = parseInt(hex1, 16);
    var decimal2 = parseInt(hex2, 16);

    // Check if hexInput2 is greater than hexInput1
    if (decimal2 > decimal1) {
        // Swap the numbers to ensure a positive result
        var temp = decimal1;
        decimal1 = decimal2;
        decimal2 = temp;
    }

    // Calculate the decimal result
    var resultDecimal = decimal1 - decimal2;

    // Check for negative result
    if (resultDecimal < 0) {
        // Apply twos complement for negative result
        var resultBinary = (resultDecimal >>> 0).toString(2); // Convert to unsigned binary
        var twosComplement = performBinarySubtraction("0".repeat(resultBinary.length), resultBinary);
        return parseInt(twosComplement, 2).toString(16);
    } else {
        // Convert positive decimal result back to hexadecimal
        return resultDecimal.toString(16);
    }
}


