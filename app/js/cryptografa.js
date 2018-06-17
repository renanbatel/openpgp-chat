const {dialog} = require('electron').remote;
let openpgp = require('openpgp');
let chavePrivada;
let chavePublica;
let cifrada;

function getChavePrivada() {
    return chavePrivada // retorna chave privada
}
function getChavePublica() {
    return chavePublica //retorna chave publica
}
function geraChave(nome, email) { // gera chave com o nome e email do usuario
    options = {
        userIds: [{ name: nome, email: email }],
        numBits: 2048, // tamanho da chave
    }
    openpgp.generateKey(options).then(function (key) {//gera a chave
        chavePrivada = key.privateKeyArmored;   //chave privada
        chavePublica = key.publicKeyArmored;    //chave publica
        return;
    });

}
function cifraMsg(publicKey, privkey, message) {
    var options = {
        data: message, // mensagem a ser cifrada
        publicKeys: openpgp.key.readArmored(publicKey).keys, //chave pra cifrar
        privateKeys: openpgp.key.readArmored(privkey).keys  //chave para assinatura
        
    }
    openpgp.encrypt(options).then(cipherText => {
        console.log(cipherText.data)
        cifrada = cipherText.data; //texto cifrado é passado 
    })
}
function descifraMsg(privtKey, message) {
    var options = {
        message: openpgp.message.readArmored(message), //mensagem cifrada a ser convertida para texto
        privateKeys: openpgp.key.readArmored(privtKey).keys[0]// chave usada para converter a mensagem
    }
    openpgp.decrypt(options).then(plaintext => {
        return plaintext.data //retorna a mensagem descrifrada
    })
}
function getCifrada() {
    return cifrada
}
function salvaChave(){ //usuario escolhe o diretorio onde deseja salvar a chave
        let path = dialog.showOpenDialog({properties:['openDirectory']});
        var fs = require('fs');
        var file = (path + '/_key.priv');//chave é salva no arquivo _key, com extensão ".priv"
        if(path == null){
            return false;
        }
        else{            
            fs.writeFile(file, chavePrivada, function (err) {
                if (err) {
                    return console.log(err);
                }
                
            })
            return true;
        }

}
function leChave(){ //usuario passa o arquivo da chave
    let path = dialog.showOpenDialog({properties:['openFile'], filters:[{name: 'priv Files', extensions:['priv']}]})
    //só é possivel selecionar um arquivo, com extensão ".priv" o tipo definido quando a chave é criada
        var fs = require('fs');
        if(path == null){
            return false;
        }
        else{            
            path = path[0];//pega o caminho do arquivo escolhido
            fs.readFile(path, function (err, data) {
                if (err) {
                    return console.log(err);
                }
                chavePrivada = data.toString(); //retorna o conteudo da chave como string para a variavel responsavel 
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