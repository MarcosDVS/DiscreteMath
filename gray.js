// gray.js

function convertGray() {
    var grayInput = document.getElementById("grayInput").value;

    // Validar la entrada como un código Gray válido
    if (!/^[01]+$/.test(grayInput)) {
        alert("Please enter a valid Gray Code.");
        return;
    }

    // Convertir Gray Code a binario, decimal, octal, hexadecimal, IEEE 754 (32 bits) y IEEE 754 (64 bits)
    var binaryResult = grayToBinary(grayInput);
    var decimalResult = binaryToDecimal(binaryResult);
    var octalResult = decimalResult.toString(8);
    var hexResult = decimalResult.toString(16).toUpperCase();
    var ieee32Result = decimalToIEEE754_32Bits(decimalResult);
    var ieee64Result = decimalToIEEE754_64Bits(decimalResult);

    // Mostrar resultados
    document.getElementById("binaryResult").textContent = binaryResult;
    document.getElementById("decimalResult").textContent = decimalResult;
    document.getElementById("octalResult").textContent = octalResult;
    document.getElementById("hexResult").textContent = hexResult;
    document.getElementById("ieee32Result").textContent = ieee32Result;
    document.getElementById("ieee64Result").textContent = ieee64Result;
}

// Funciones de conversión adicionales (grayToBinary, binaryToDecimal, decimalToIEEE754_32Bits, decimalToIEEE754_64Bits) se mantienen según tu código anterior.
// gray.js

// Función para convertir código Gray a binario
function grayToBinary(grayCode) {
    var binaryResult = grayCode[0];

    for (var i = 1; i < grayCode.length; i++) {
        // XOR para obtener el siguiente bit en la secuencia binaria
        binaryResult += (parseInt(grayCode[i]) ^ parseInt(binaryResult[i - 1])).toString();
    }

    return binaryResult;
}

// Función para convertir binario a decimal
function binaryToDecimal(binaryNumber) {
    return parseInt(binaryNumber, 2);
}

// Función para convertir decimal a IEEE 754 (32 bits)
function decimalToIEEE754_32Bits(decimalInput) {
    var signBit = decimalInput < 0 ? 1 : 0;
    decimalInput = Math.abs(decimalInput);

    // Convertir decimal a binario
    var binaryInput = decimalInput.toString(2);

    // Encontrar la posición del punto binario
    var binaryPointIndex = binaryInput.indexOf('.');

    // Normalizar la representación binaria
    if (binaryPointIndex !== -1) {
        binaryInput = binaryInput.replace('.', '');
        binaryPointIndex -= binaryInput.indexOf('1');
        binaryInput = binaryInput.replace('1', '');
    } else {
        binaryPointIndex = binaryInput.length - 1;
    }

    // Calcular el exponente
    var exponent = binaryPointIndex + 127;

    // Asegurar que el exponente sea de 8 bits
    var exponentBits = (exponent >>> 0).toString(2).padStart(8, '0');

    // Asegurar que la mantisa sea de 23 bits
    var mantissaBits = binaryInput.slice(0, 23).padEnd(23, '0');

    // Combinar el bit de signo, los bits del exponente y los bits de la mantisa
    var ieee754Result = signBit + exponentBits + mantissaBits;

    return ieee754Result;
}

// Función para convertir decimal a IEEE 754 (64 bits)
function decimalToIEEE754_64Bits(decimalInput) {
    var signBit = decimalInput < 0 ? 1 : 0;
    decimalInput = Math.abs(decimalInput);

    // Convertir decimal a binario
    var binaryInput = decimalInput.toString(2);

    // Encontrar la posición del punto binario
    var binaryPointIndex = binaryInput.indexOf('.');

    // Normalizar la representación binaria
    if (binaryPointIndex !== -1) {
        binaryInput = binaryInput.replace('.', '');
        binaryPointIndex -= binaryInput.indexOf('1');
        binaryInput = binaryInput.replace('1', '');
    } else {
        binaryPointIndex = binaryInput.length - 1;
    }

    // Calcular el exponente
    var exponent = binaryPointIndex + 1023;

    // Asegurar que el exponente sea de 11 bits
    var exponentBits = (exponent >>> 0).toString(2).padStart(11, '0');

    // Asegurar que la mantisa sea de 52 bits
    var mantissaBits = binaryInput.slice(0, 52).padEnd(52, '0');

    // Combinar el bit de signo, los bits del exponente y los bits de la mantisa
    var ieee754Result = signBit + exponentBits + mantissaBits;

    return ieee754Result;
}
