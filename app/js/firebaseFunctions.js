require('sweetalert');
var firebase = require('firebase')
var config = {
    apiKey: "AIzaSyDwU-AV5nC6m9IlXwkjtQ12BzXkfvNUpi0",
    authDomain: "openpgp-chat.firebaseapp.com",
    databaseURL: "https://openpgp-chat.firebaseio.com",
    projectId: "openpgp-chat",
    storageBucket: "openpgp-chat.appspot.com",
    messagingSenderId: "314141157485"
};

function validaSignup() {

    var email = document.getElementById('signup_email').value;
    var senha = document.getElementById('signup_senha').value;
    var nome = document.getElementById('signup_nome').value;

    if (validation.validateSignup()) {

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(res => {
            salvaUsu(nome, email, res.uid);
            //addContato(res.uid);
            enviarMensagem('mOvrqtnzNtabum2dJnXKmx7XhxV2');
            carregaMensagem();
            const login_screen = document.getElementById('login_screen');
            const private_key = document.createElement('span');
            private_key.className = 'private-key-modal';
            private_key.innerText = '{{chave privada}}';

            swal({
                title: 'Usuário criado com sucesso!',
                text: 'Utilize sua chave privada para começar a usar:',
                icon: 'success',
                buttons: 'Começar',
                content: private_key
            })
                .then((value) => {
                    setTimeout(() => {
                        login_screen.classList.remove('signup-panel-opened');
                    }, 200);
                });
        }).catch(function (error) {
            if (error != null) {
                console.log("erro " + error);
                return;
            }
        });
    }
}

function validaLogin() {

    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    if (validation.validateLogin()) {

        const login_form = document.getElementById('login_form');

        login_form.classList.add('loading');

        firebase.auth().signInWithEmailAndPassword(email, senha).then(function () {
            ipcRenderer.send('abrir-home');
        }).catch(function (error) {
            login_form.classList.remove('loading');
            if (error != null) {
                console.log('errou')
            }
        });
    }
}
function salvaUsu(nome, email, uid) {
    var usuRef = this.database.ref('usuarios/' + uid + '/informacoes');
    if (usuRef) {
        usuRef.push({
            name: nome,
            email: email,
            id: uid,
            //chave pública
        });
    } else {
        console.log('ERRO ao referenciar usuario/informacao no bd salva usuario')
    }
}

function logOut() {
    firebase.auth().signOut();
}
function addContato(uid) {

    var email = "romero@gmail.com"; //aqui será o email pra add o contato
    getAllUsuarios(uid, (usuarios) => {

        var info = usuarios.map(r => r.informacoes);
        var usuRef = this.database.ref('usuarios/' + uid + '/contatos');
        if (usuRef) {
            info.forEach(i => {
                var obj = i[Object.keys(i)[0]];
                if (obj.email == email) {
                    usuRef.push({
                        nome: 'ze', uid: '1111', chavePublica: '1234'
                    });
                }
                else
                    console.log('CONTATO NÃO EXISTE FILHA DA PUTA');
            });
        } else {
            console.log('ERRO ao referenciar usuario/informacao no bd add contato')
        }
    });
}

function getAllUsuarios(uid, callback) {
    var usuarios = this.database.ref('usuarios');
    var usuInfo = [];
    usuarios.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            usuInfo.push(childSnapshot.val());
        });
        callback(usuInfo);
    });
}

function carregaMensagem() {
    var user = firebase.auth().currentUser;
    var mensagem = this.database.ref('mensagens/');
    mensagem.off();
    //verificar os usuários da conversa para assim filtrar
    //aqui será quando abrir a conversar
    var setMensagem = function (data) {
        console.log(data.val())
    }

    if (user) {
        mensagem.on('child_added', setMensagem);
        mensagem.on('child_changed', setMensagem);
    }
}

function recebeMensagem() {
    //TO DO
}

function enviarMensagem(ChavePUDestinatario) {
    var user = firebase.auth().currentUser;
    if (user) {
        var mens = '7';
        var mensagem = this.database.ref('mensagens/');
        mensagem.push({ uidEmitente: user.uid, uidDestinatario: ChavePUDestinatario, mensagem: mens });
    } else {
        console.log('USUARIO NÃO LOGADO')
    }
}
// Exports
module.exports = {
    validaSignup,
    getAllUsuarios,
    addContato,
    logOut,
    salvaUsu,
    validaLogin,
    validaSignup,
    carregaMensagem
}