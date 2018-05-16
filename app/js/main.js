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

btnCadastrar.addEventListener('click', function(){
    var email = document.getElementById('email').value;
    var senha =  document.getElementById('senha').value;
    firebase.auth().createUserWithEmailAndPassword(email, senha).then(function(){
        alert('Usuario Criado')
    }).catch(function(error){
        if(error != null){
            console.log("erro "+error);
            return;
        }
    });
});

btnLogin.addEventListener('click', function(){
    var email = document.getElementById('email').value;
    var senha =  document.getElementById('senha').value;
    firebase.auth().signInWithEmailAndPassword(email, senha).then(function(){
        console.log('logou')
    }).catch(function(error){
        if(error != null){
            console.log('errou')
        }
    });
});