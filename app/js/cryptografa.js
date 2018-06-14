let openpgp = require('openpgp');
let chavePrivada;
let chavePublica;
let cifrada;

function getChavePrivada() {
    return chavePrivada
}
function getChavePublica() {
    return chavePublica
}
function geraChave(nome, email) {
    options = {
        userIds: [{ name: nome, email: email }],
        numBits: 2048,
    }
    openpgp.generateKey(options).then(function (key) {
        chavePrivada = key.privateKeyArmored;
        chavePublica = key.publicKeyArmored;


        var fs = require('fs');
        var file = ('./_key');
        console.log(file);
        if (!fs.exists(file))
            fs.writeFile(file, chavePrivada, function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });


        return;
    });

}
function cifraMsg(publicKey, message) {
    var options = {
        data: message,
        publicKeys: openpgp.key.readArmored(publicKey).keys
    }
    openpgp.encrypt(options).then(cipherText => {
        console.log(cipherText.data)
        cifrada = cipherText.data;
    })
}
function descifraMsg(privtKey, message) {
    var options = {
        message: openpgp.message.readArmored(message),
        privateKeys: openpgp.key.readArmored(privtKey).keys[0]
    }
    openpgp.decrypt(options).then(plaintext => {
        return plaintext.data
    })
}
function getCifrada() {
    return cifrada
}
//  ##  Export
module.exports = {
    geraChave,
    cifraMsg,
    descifraMsg,
    getChavePrivada,
    getChavePublica,
    getCifrada
}