function convertToDecimal() {
    var ieeeInput = document.getElementById("ieeeInput").value;

    // Completar con ceros a la izquierda si el número tiene menos de 32 bits
    while (ieeeInput.length < 32) {
        ieeeInput = '0' + ieeeInput;
    }
    
    if (!/^[01]{32}$/.test(ieeeInput)) {
        alert("Please enter a valid 32-bit binary number.");
        return;
    }

    var sign = parseInt(ieeeInput[0]);
    var exponent = parseInt(ieeeInput.substring(1, 9), 2) - 127;
    var fraction = 1 + parseInt(ieeeInput.substring(9), 2) / Math.pow(2, 23);

    var result = Math.pow(-1, sign) * fraction * Math.pow(2, exponent);

    document.getElementById("result").textContent = "Result: " + result;
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

function convertToBinary() {
    var decimalInput = document.getElementById("decimalInput").value;

    if (!/^\d+$/.test(decimalInput)) {
        alert("Please enter a valid decimal number.");
        return;
    }

    var binaryResult = (+decimalInput).toString(2);

    document.getElementById("binaryResult").textContent = "Binary Result: " + binaryResult;
}

function binaryToDecimal() {
    var binaryInput = document.getElementById("binaryInput").value;

    if (!/^[01]+$/.test(binaryInput)) {
        alert("Please enter a valid binary number.");
        return;
    }

    var decimalResult = parseInt(binaryInput, 2);

    document.getElementById("decimalResult").textContent = "Decimal Result: " + decimalResult;
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

function convertToOctal() {
    var decimalInput = document.getElementById("decimalInput2").value;

    if (!/^\d+$/.test(decimalInput)) {
        alert("Please enter a valid decimal number.");
        return;
    }

    var octalResult = (+decimalInput).toString(8);

    document.getElementById("octalResult").textContent = "Octal Result: " + octalResult;
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
