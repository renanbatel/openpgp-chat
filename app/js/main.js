require('./js/view/login');

//Aqui se encontra as funções necessárias para interagir com o firebase
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
const dbRefMensagem = firebase.database().ref().child('mensagens'); //cria referencia no bd

//Cadastrar usuário
btnCadastrar.addEventListener('click', function () {
    var email = document.getElementById('signup_email').value;
    var senha = document.getElementById('signup_senha').value;
    firebase.auth().createUserWithEmailAndPassword(email, senha).then(function () {
        alert('Usuario Criado');
    }).catch(function (error) {
        if (error != null) {
            console.log("erro " + error);
            return;
        }
    });
});

//Logar com email e senha
btnLogin.addEventListener('click', function () {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    firebase.auth().signInWithEmailAndPassword(email, senha).then(function () {
        console.log('logou')
    }).catch(function (error) {
        if (error != null) {
            console.log('errou')
        }
    });
});
//verifica quando um usuário loga ou desloga
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user)
        //colocar o botão de sair
    } else {
        console.log('sem usuário logado')
        //tirar o botão sair
    }
});

function retornaUsuario(){
    if(firebase.auth().currentUser){
        return true;
    }
    return false;
}

btnLogout.addEventListener('click', e =>{
    firebase.auth().signOut();
});
