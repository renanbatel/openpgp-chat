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



function validaSignup(){

    var email = document.getElementById('signup_email').value;
    var senha = document.getElementById('signup_senha').value;
    var nome = document.getElementById('signup_nome').value;

    if (validation.validateSignup()) {

    firebase.auth().createUserWithEmailAndPassword(email, senha).then(res => {
        salvaUsu(nome, email, res.uid);
        addContato(res.uid);
        // addContato(res.user.uid);
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
}}

function validaLogin(){

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
    usuRef.push({
        name: nome,
        email: email,
        id: uid,
        //chave pública
    });
}

function logOut(){
    firebase.auth().signOut();
}
function addContato(uid) {

    var email = "romero@gmail.com"; //aqui será o email pra add o contato
    getAllUsuarios(uid, (usuarios) => {

        var info = usuarios.map(r => r.informacoes);
        var usuRef = this.database.ref('usuarios/' + uid + '/contatos');

        info.forEach(i => {
            var obj = i[Object.keys(i)[0]];
            if (obj.email == email){
                usuRef.push({
                    nome: 'ze', uid: '1111', chavePublica: '1234'
                });
            }
            else
                console.log('CONTATO NÃO EXISTE FILHA DA PUTA');
        });
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

function retornaUsuarioLogado() { //testar

    if (firebase.auth().currentUser) {
        return true;
    }
    return false;
}
function recebeMensagem() {
    //TO DO
}

function enviarMensagem() {
    //to do
}
// Exports
module.exports = {
    retornaUsuarioLogado,
    validaSignup,
    getAllUsuarios,
    addContato,
    logOut,
    salvaUsu,
    validaLogin,
    validaSignup
}