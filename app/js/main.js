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

var btnLogar = document.getElementById('login');

btnLogar.addEventListener('click', function(){
    var email = document.getElementById('email').value;
    var senha =  document.getElementById('senha').value;

    firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function(error){
        if(error != null){
            console.log("erro "+error);
            return;
        }else{
            console.log('tudo certo')
        }
    });
});