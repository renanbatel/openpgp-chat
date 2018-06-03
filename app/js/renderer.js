const validation = require('./js/validation.js');
require('sweetalert');
require('./js/view/login');
const { ipcRenderer } = require('electron');

var config = {
    apiKey: "AIzaSyDwU-AV5nC6m9IlXwkjtQ12BzXkfvNUpi0",
    authDomain: "openpgp-chat.firebaseapp.com",
    databaseURL: "https://openpgp-chat.firebaseio.com",
    projectId: "openpgp-chat",
    storageBucket: "openpgp-chat.appspot.com",
    messagingSenderId: "314141157485"
};
firebase.initializeApp(config);

var btnCadastrar = document.getElementById('cadastrar');
var btnLogin = document.getElementById('login');
var btnLogout = null;
var database = firebase.database();
var usuRef = database.ref('usuario');

btnCadastrar.addEventListener('click', function (event) {
    event.preventDefault();
    if (validation.validateSignup()) {
        var email = document.getElementById('signup_email').value;
        var senha = document.getElementById('signup_senha').value;
        var nome = document.getElementById('signup_nome').value;
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(res => {
            salvaUsu(nome, email);
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
});

btnLogin.addEventListener('click', function (event) {

    event.preventDefault();

    if (validation.validateLogin()) {
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;
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
});

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});

function retornaUsuario() { //testar
    if (firebase.auth().currentUser) {
        return true;
    }
    return false;
}

function salvaUsu(nome, email) {
    this.usuRef.push({
        name: nome,
        email: email,
        contatos: any[],
        //contatos, chave pública
    });
}

function recebeMensagem(){
    //TO DO
}

function enviarMensagem(){
    //to do
}

function addContato(){
    //to do
}