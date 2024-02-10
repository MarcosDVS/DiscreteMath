//Decimal to others
function convertToBinary() {
    var decimalInput = document.getElementById("decimalInput").value;

    if (!/^\d+$/.test(decimalInput)) {
        alert("Please enter a valid decimal number.");
        return;
    }

    var binaryResult = (+decimalInput).toString(2);

    document.getElementById("binaryResult").textContent = "Binary Result: " + binaryResult;
}

function convertToOctal() {
    var decimalInput = document.getElementById("decimalInput2").value;

    if (!/^\d+$/.test(decimalInput)) {
        alert("Please enter a valid decimal number.");
        return;
    }

    var octalResult = (+decimalInput).toString(8);

    document.getElementById("octalResult").textContent = "Octal Result: " + octalResult;
}

function convertToHexadecimal() {
    var decimalInput = document.getElementById("decimalInput3").value;

    if (!/^\d+$/.test(decimalInput)) {
        alert("Please enter a valid decimal number.");
        return;
    }

    var hexadecimalResult = (+decimalInput).toString(16).toUpperCase();

    document.getElementById("hexadecimalResult").textContent = "Hexadecimal Result: " + hexadecimalResult;
}

function convertToIEEE() {
    var decimalInput = parseFloat(document.getElementById("decimalInput4").value);

    if (isNaN(decimalInput)) {
        alert("Please enter a valid decimal number.");
        return;
    }

    var sign = decimalInput < 0 ? 1 : 0;
    decimalInput = Math.abs(decimalInput);
    
    var exponent = 127;
    var fraction = decimalInput.toString(2).split('.')[1] || '0';
    
    while (fraction.length < 23) {
        fraction += '0';
    }

    fraction = fraction.substring(0, 23);

    var ieee754 = sign + pad((exponent >>> 0).toString(2), 8) + fraction;
    
    document.getElementById("resultIEEE").textContent = "Result: " + ieee754;
}
function pad(str, length) {
    return '0'.repeat(Math.max(0, length - str.length)) + str;
}

//Binary to others
function binaryToDecimal() {
    var binaryInput = document.getElementById("binaryInput").value;

    if (!/^[01]+$/.test(binaryInput)) {
        alert("Please enter a valid binary number.");
        return;
    }

    var decimalResult = parseInt(binaryInput, 2);

    document.getElementById("decimalResult").textContent = "Decimal Result: " + decimalResult;
}

function binaryToOctal() {
    var binaryInput = document.getElementById("binaryInput2").value;

    if (!/^[01]+$/.test(binaryInput)) {
        alert("Please enter a valid binary number.");
        return;
    }

    var octalResult = parseInt(binaryInput, 2).toString(8);

    document.getElementById("octalResultFromBinary").textContent = "Octal Result: " + octalResult;
}

function binaryToHexadecimal() {
    var binaryInput = document.getElementById("binaryInput3").value;

    if (!/^[01]+$/.test(binaryInput)) {
        alert("Please enter a valid binary number.");
        return;
    }

    var hexadecimalResult = parseInt(binaryInput, 2).toString(16).toUpperCase();

    document.getElementById("hexadecimalResultFromBinary").textContent = "Hexadecimal Result: 0x" + " " + hexadecimalResult;
}

function binaryToIEEE754() {
    var binaryInput = document.getElementById("binaryInput4").value;

    if (!/^[01]+$/.test(binaryInput)) {
        alert("Please enter a valid binary number.");
        return;
    }

    // Ensure the binary number has exactly 32 bits
    while (binaryInput.length < 32) {
        binaryInput = '0' + binaryInput;
    }

    var sign = binaryInput[0];
    var exponent = parseInt(binaryInput.substring(1, 9), 2) + 127;
    var fraction = binaryInput.substring(9);

    var ieee754Result = sign + exponent.toString(2).padStart(8, '0') + fraction;

    document.getElementById("ieee754ResultFromBinary").textContent = "IEEE 754 Result: " + ieee754Result;
}

// Octal to others
function octalToDecimal() {
    var octalInput = document.getElementById("octalInput").value;

    if (!/^[0-7]+$/.test(octalInput)) {
        alert("Please enter a valid octal number.");
        return;
    }

    var decimalResult = parseInt(octalInput, 8);

    document.getElementById("decimalResultFromOctal").textContent = "Decimal Result: " + decimalResult;
}

function octalToBinary() {
    var octalInput = document.getElementById("octalInput2").value;

    if (!/^[0-7]+$/.test(octalInput)) {
        alert("Please enter a valid octal number.");
        return;
    }

    var binaryResult = parseInt(octalInput, 8).toString(2);

    document.getElementById("binaryResultFromOctal").textContent = "Binary Result: " + binaryResult;
}

function octalToHexadecimal() {
    var octalInput = document.getElementById("octalInput3").value;

    if (!/^[0-7]+$/.test(octalInput)) {
        alert("Please enter a valid octal number.");
        return;
    }

    var hexadecimalResult = parseInt(octalInput, 8).toString(16).toUpperCase();

    document.getElementById("hexadecimalResultFromOctal").textContent = "Hexadecimal Result: 0x" + " " + hexadecimalResult;
}

function octalToIEEE754() {
    var octalInput = document.getElementById("octalInput4").value;

    if (!/^[0-7]+$/.test(octalInput)) {
        alert("Please enter a valid octal number.");
        return;
    }

    // Convert octal to binary first
    var binaryResult = parseInt(octalInput, 8).toString(2);

    // Ensure the binary number has exactly 32 bits
    while (binaryResult.length < 32) {
        binaryResult = '0' + binaryResult;
    }

    var sign = binaryResult[0];
    var exponent = parseInt(binaryResult.substring(1, 9), 2) + 127;
    var fraction = binaryResult.substring(9);

    var ieee754Result = sign + exponent.toString(2).padStart(8, '0') + fraction;

    document.getElementById("ieee754ResultFromOctal").textContent = "IEEE 754 Result: " + ieee754Result;
}

// Hexadecimal to others
function hexadecimalToDecimal() {
    var hexadecimalInput = document.getElementById("hexadecimalInput").value;

    if (!/^[0-9A-Fa-f]+$/.test(hexadecimalInput)) {
        alert("Please enter a valid hexadecimal number.");
        return;
    }

    var decimalResult = parseInt(hexadecimalInput, 16);

    document.getElementById("decimalResultFromHexadecimal").textContent = "Decimal Result: " + decimalResult;
}

function hexadecimalToBinary() {
    var hexadecimalInput = document.getElementById("hexadecimalInput2").value;

    if (!/^[0-9A-Fa-f]+$/.test(hexadecimalInput)) {
        alert("Please enter a valid hexadecimal number.");
        return;
    }

    var binaryResult = parseInt(hexadecimalInput, 16).toString(2);

    document.getElementById("binaryResultFromHexadecimal").textContent = "Binary Result: " + binaryResult;
}

function hexadecimalToOctal() {
    var hexadecimalInput = document.getElementById("hexadecimalInput3").value;

    if (!/^[0-9A-Fa-f]+$/.test(hexadecimalInput)) {
        alert("Please enter a valid hexadecimal number.");
        return;
    }

    var octalResult = parseInt(hexadecimalInput, 16).toString(8);

    document.getElementById("octalResultFromHexadecimal").textContent = "Octal Result: " + octalResult;
}

function hexadecimalToIEEE754() {
    var hexadecimalInput = document.getElementById("hexadecimalInput4").value;

    if (!/^[0-9A-Fa-f]+$/.test(hexadecimalInput)) {
        alert("Please enter a valid hexadecimal number.");
        return;
    }

    // Convert hexadecimal to binary first
    var binaryResult = parseInt(hexadecimalInput, 16).toString(2);

    // Ensure the binary number has exactly 32 bits
    while (binaryResult.length < 32) {
        binaryResult = '0' + binaryResult;
    }

    var sign = binaryResult[0];
    var exponent = parseInt(binaryResult.substring(1, 9), 2) + 127;
    var fraction = binaryResult.substring(9);

    var ieee754Result = sign + exponent.toString(2).padStart(8, '0') + fraction;

    document.getElementById("ieee754ResultFromHexadecimal").textContent = "IEEE 754 Result: " + ieee754Result;
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
