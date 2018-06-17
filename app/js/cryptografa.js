const {dialog} = require('electron').remote;
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
function salvaChave(){
        let path = dialog.showOpenDialog({properties:['openDirectory']});
        var fs = require('fs');
        var file = (path + '/_key.priv');
        if(path == null){
            console.log('false');
            return false;
        }
        else{            
            fs.writeFile(file, chavePrivada, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('true');
                
            })
            return true;
        }

}
function leChave(){
    let path = dialog.showOpenDialog({properties:['openFile'], filters:[{name: 'priv Files', extensions:['priv']}]})

        var fs = require('fs');
        if(path == null){
            console.log('false');
            return false;
        }
        else{            
            path = path[0];
            fs.readFile(path, function (err, data) {
                if (err) {
                    return console.log(err);
                }
                chavePrivada = data.toString();
                console.log(chavePrivada);
                
            })
            return true;
        }
}
//  ##  Export
module.exports = {
    geraChave,
    cifraMsg,
    descifraMsg,
    getChavePrivada,
    getChavePublica,
    getCifrada,
    salvaChave,
    leChave
}