//Decimal to others
function convertDecimal() {
    var decimalInput = document.getElementById("decimalInput").value;

    // Validate input as a decimal number
    if (!/^-?\d*\.?\d+$/.test(decimalInput)) {
        alert("Please enter a valid decimal number.");
        return;
    }

    // Split the decimal number into integer and fractional parts
    var [integerPart, fractionalPart] = decimalInput.split('.');

    // Convert integer part to binary, octal, hexadecimal
    var binaryInteger = parseInt(integerPart).toString(2);
    var octalInteger = parseInt(integerPart).toString(8);
    var hexInteger = parseInt(integerPart).toString(16).toUpperCase();

    // Display integer results
    document.getElementById("binaryResult").textContent = binaryInteger;
    document.getElementById("octalResult").textContent = octalInteger;
    document.getElementById("hexResult").textContent = hexInteger;

    // Convert decimal fractional part to IEEE 754 (32 bits) and (64 bits)
    var ieee32Result = decimalToIEEE754_32Bits(integerPart, fractionalPart);
    var ieee64Result = decimalToIEEE754_64Bits(integerPart, fractionalPart);

    // Display fractional and IEEE results
    document.getElementById("ieee32Result").textContent = ieee32Result;
    document.getElementById("ieee64Result").textContent = ieee64Result;
}

function decimalToIEEE754_32Bits(integerPart, fractionalPart) {
    // Convert integer part to binary
    var binaryInteger = parseInt(integerPart).toString(2);

    // Convert fractional part to binary
    var binaryFractional = convertFractionalToBinary(fractionalPart, 32);

    // Combine integer and fractional parts
    var ieee754Result = binaryInteger + binaryFractional;

    return ieee754Result;
}

function decimalToIEEE754_64Bits(integerPart, fractionalPart) {
    // Convert integer part to binary
    var binaryInteger = parseInt(integerPart).toString(2);

    // Convert fractional part to binary
    var binaryFractional = convertFractionalToBinary(fractionalPart, 64);

    // Combine integer and fractional parts
    var ieee754Result = binaryInteger + binaryFractional;

    return ieee754Result;
}

function convertFractionalToBinary(fractionalPart, bits) {
    // Convert fractional part to binary
    var binaryFractional = '';
    var fractional = parseFloat('0.' + fractionalPart);

    for (var i = 0; i < bits; i++) {
        fractional *= 2;
        binaryFractional += Math.floor(fractional);
        fractional %= 1;
    }

    return binaryFractional;
}


//Binary to others
function convertBinary() {
    var binaryInput = document.getElementById("binaryInputBinary").value;

    // Validate input as a binary number with optional fractional part
    if (!/^[01]+(\.[01]+)?$/.test(binaryInput)) {
        alert("Please enter a valid binary number.");
        return;
    }

    // Split binary into integer and fractional parts
    var [integerPart, fractionalPart = ""] = binaryInput.split('.');

    // Convert integer part to decimal
    var decimalInteger = parseInt(integerPart, 2);

    // Convert fractional part to decimal
    var decimalFractional = convertFractionalToDecimal(fractionalPart);

    // Combine integer and fractional parts
    var decimalResult = decimalInteger + decimalFractional;

    // Convert decimal to octal, hexadecimal, IEEE 754 (32 bits), and IEEE 754 (64 bits)
    var octalResult = decimalResult.toString(8);
    var hexResult = decimalResult.toString(16).toUpperCase();
    var ieee32Result = binaryToIEEE754_32Bits(decimalResult);
    var ieee64Result = binaryToIEEE754_64Bits(decimalResult);

    // Display results
    document.getElementById("decimalResultFromBinary").textContent = decimalResult;
    document.getElementById("octalResultFromBinary").textContent = octalResult;
    document.getElementById("hexResultFromBinary").textContent = hexResult;
    document.getElementById("ieee32ResultFromBinary").textContent = ieee32Result;
    document.getElementById("ieee64ResultFromBinary").textContent = ieee64Result;
}

function convertFractionalToDecimal(fractionalPart) {
    // Convert binary fractional part to decimal
    var decimalFractional = 0;

    for (var i = 0; i < fractionalPart.length; i++) {
        decimalFractional += parseInt(fractionalPart[i]) * Math.pow(2, -(i + 1));
    }

    return decimalFractional;
}

function binaryToIEEE754_32Bits(decimalInput) {
    // Handle special cases: positive/negative zero and denormalized numbers
    if (decimalInput === 0) {
        return '00000000000000000000000000000000';
    }

    var signBit = decimalInput < 0 ? 1 : 0;
    decimalInput = Math.abs(decimalInput);

    // Convert decimal to binary
    var binaryInput = decimalInput.toString(2);

    // Find the position of the binary point
    var binaryPointIndex = binaryInput.indexOf('.');

    // Normalize the binary representation
    if (binaryPointIndex !== -1) {
        binaryInput = binaryInput.replace('.', '');
        binaryPointIndex -= binaryInput.indexOf('1');
        binaryInput = binaryInput.replace('1', '');
    } else {
        binaryPointIndex = binaryInput.length - 1;
    }

    // Calculate the exponent
    var exponent = binaryPointIndex + 127;

    // Ensure the exponent is 8 bits long
    var exponentBits = (exponent >>> 0).toString(2).padStart(8, '0');

    // Ensure the mantissa is 23 bits long
    var mantissaBits = binaryInput.slice(0, 23).padEnd(23, '0');

    // Combine the sign bit, exponent bits, and mantissa bits
    var ieee754Result = signBit + exponentBits + mantissaBits;

    return ieee754Result;
}

function binaryToIEEE754_64Bits(decimalInput) {
    // Handle special cases: positive/negative zero and denormalized numbers
    if (decimalInput === 0) {
        return '0000000000000000000000000000000000000000000000000000000000000000';
    }

    var signBit = decimalInput < 0 ? 1 : 0;
    decimalInput = Math.abs(decimalInput);

    // Convert decimal to binary
    var binaryInput = decimalInput.toString(2);

    // Find the position of the binary point
    var binaryPointIndex = binaryInput.indexOf('.');

    // Normalize the binary representation
    if (binaryPointIndex !== -1) {
        binaryInput = binaryInput.replace('.', '');
        binaryPointIndex -= binaryInput.indexOf('1');
        binaryInput = binaryInput.replace('1', '');
    } else {
        binaryPointIndex = binaryInput.length - 1;
    }

    // Calculate the exponent
    var exponent = binaryPointIndex + 1023;

    // Ensure the exponent is 11 bits long
    var exponentBits = (exponent >>> 0).toString(2).padStart(11, '0');

    // Ensure the mantissa is 52 bits long
    var mantissaBits = binaryInput.slice(0, 52).padEnd(52, '0');

    // Combine the sign bit, exponent bits, and mantissa bits
    var ieee754Result = signBit + exponentBits + mantissaBits;

    return ieee754Result;
}


// Octal to others
// The binaryToIEEE754_32Bits and binaryToIEEE754_64Bits functions remain the same as in the previous example
// Make sure to include them in your script.js file.
function convertOctal() {
    var octalInput = document.getElementById("octalInput").value;

    // Validate input as an octal number with optional fractional part
    if (!/^[0-7]+(\.[0-7]+)?$/.test(octalInput)) {
        alert("Please enter a valid octal number.");
        return;
    }

    // Split octal into integer and fractional parts
    var [integerPart, fractionalPart = ""] = octalInput.split('.');

    // Convert integer part to decimal
    var decimalInteger = parseInt(integerPart, 8);

    // Convert fractional part to decimal
    var decimalFractional = octalFractionalToDecimal(fractionalPart, 8);

    // Combine integer and fractional parts
    var decimalResult = decimalInteger + decimalFractional;

    // Convert decimal to binary, hexadecimal, IEEE 754 (32 bits), and IEEE 754 (64 bits)
    var binaryResult = decimalResult.toString(2);
    var hexResult = decimalResult.toString(16).toUpperCase();
    var ieee32Result = binaryToIEEE754_32Bits(decimalResult);
    var ieee64Result = binaryToIEEE754_64Bits(decimalResult);

    // Display results
    document.getElementById("decimalResultFromOctal").textContent = decimalResult;
    document.getElementById("binaryResultFromOctal").textContent = binaryResult;
    document.getElementById("hexResultFromOctal").textContent = hexResult;
    document.getElementById("ieee32ResultFromOctal").textContent = ieee32Result;
    document.getElementById("ieee64ResultFromOctal").textContent = ieee64Result;
}

function octalFractionalToDecimal(fractionalPart, base) {
    // Convert fractional part to decimal
    var decimalFractional = 0;

    for (var i = 0; i < fractionalPart.length; i++) {
        decimalFractional += parseInt(fractionalPart[i], base) * Math.pow(base, -(i + 1));
    }

    return decimalFractional;
}

// Hexadecimal to others
// The convertFractionalToDecimal, binaryToIEEE754_32Bits, and binaryToIEEE754_64Bits functions remain the same as in the previous examples.
// Make sure to include them in your script.js file.
function convertHexadecimal() {
    var hexInput = document.getElementById("hexInput").value;

    // Validate input as a hexadecimal number with optional fractional part
    if (!/^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(hexInput)) {
        alert("Please enter a valid hexadecimal number.");
        return;
    }

    // Split hexadecimal into integer and fractional parts
    var [integerPart, fractionalPart = ""] = hexInput.split('.');

    // Convert integer part to decimal
    var decimalInteger = parseInt(integerPart, 16);

    // Convert fractional part to decimal
    var decimalFractional = convertFractionalToDecimal(fractionalPart, 16);

    // Combine integer and fractional parts
    var decimalResult = decimalInteger + decimalFractional;

    // Convert decimal to binary, octal, IEEE 754 (32 bits), and IEEE 754 (64 bits)
    var binaryResult = decimalResult.toString(2);
    var octalResult = decimalResult.toString(8);
    var ieee32Result = binaryToIEEE754_32Bits(decimalResult);
    var ieee64Result = binaryToIEEE754_64Bits(decimalResult);

    // Display results
    document.getElementById("decimalResultFromHex").textContent = decimalResult;
    document.getElementById("binaryResultFromHex").textContent = binaryResult;
    document.getElementById("octalResultFromHex").textContent = octalResult;
    document.getElementById("ieee32ResultFromHex").textContent = ieee32Result;
    document.getElementById("ieee64ResultFromHex").textContent = ieee64Result;
}

//IEEE 754 (32 bits) to others
function convertIEEE754() {
    var ieeeInput = document.getElementById("ieeeInput8").value;

    // Asegúrate de que la entrada sea un número binario válido de 32 bits
    if (!/^[01]{32}$/.test(ieeeInput)) {
        alert("Por favor, ingresa un número binario IEEE 754 (32 bits) válido.");
        return;
    }

    // Convierte IEEE 754 a decimal
    var decimalResult = ieee754ToDecimal(ieeeInput);

    // Convierte decimal a binario
    var binaryResult = decimalResult.toString(2);

    // Convierte decimal a octal
    var octalResult = decimalResult.toString(8);

    // Convierte decimal a hexadecimal
    var hexResult = decimalResult.toString(16).toUpperCase();

    // Muestra los resultados
    document.getElementById("decimalResultFromIEEE").textContent = decimalResult;
    document.getElementById("binaryResultFromIEEE").textContent = binaryResult;
    document.getElementById("octalResultFromIEEE").textContent = octalResult;
    document.getElementById("hexResultFromIEEE").textContent = hexResult;
}

function ieee754ToDecimal(ieeeInput) {
    var sign = parseInt(ieeeInput[0]);
    var exponent = parseInt(ieeeInput.substring(1, 9), 2) - 127;
    var fraction = 1 + parseInt(ieeeInput.substring(9), 2) / Math.pow(2, 23);

    return Math.pow(-1, sign) * fraction * Math.pow(2, exponent);
}

//IEEE 754 (64 bits) to others
function convertIEEE754() {
    var ieeeInput = document.getElementById("ieeeInput64").value;

    // Asegúrate de que la entrada sea un número binario válido de 64 bits
    if (!/^[01]{64}$/.test(ieeeInput)) {
        alert("Por favor, ingresa un número binario IEEE 754 (64 bits) válido.");
        return;
    }

    // Convierte IEEE 754 a decimal
    var decimalResult = ieee754ToDecimal64(ieeeInput);

    // Convierte decimal a binario
    var binaryResult = decimalResult.toString(2);

    // Convierte decimal a octal
    var octalResult = decimalResult.toString(8);

    // Convierte decimal a hexadecimal
    var hexResult = decimalResult.toString(16).toUpperCase();

    // Convierte IEEE 754 (64 bits) a IEEE 754 (32 bits)
    var ieee32Result = ieee754To32Bits(ieeeInput);

    // Muestra los resultados
    document.getElementById("decimalResult64").textContent = decimalResult;
    document.getElementById("binaryResult64").textContent = binaryResult;
    document.getElementById("octalResult64").textContent = octalResult;
    document.getElementById("hexResult64").textContent = hexResult;
    document.getElementById("ieee32Result").textContent = ieee32Result;
}

function ieee754ToDecimal64(ieeeInput) {
    var sign = parseInt(ieeeInput[0]);
    var exponent = parseInt(ieeeInput.substring(1, 12), 2) - 1023;
    var fraction = 1 + parseInt(ieeeInput.substring(12), 2) / Math.pow(2, 52);

    return Math.pow(-1, sign) * fraction * Math.pow(2, exponent);
}

function ieee754To32Bits(ieeeInput64) {
    // Extrae los primeros 32 bits de la entrada de 64 bits
    var ieee32Bits = ieeeInput64.substring(0, 32);

    return ieee32Bits;
}
