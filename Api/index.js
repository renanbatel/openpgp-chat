//firebase tools é pq o SDK do firebase exige q o app seja hospedado por um servidor
var firebase = require('firebase');
//Inicializar
var config = {
    apiKey: "AIzaSyDwU-AV5nC6m9IlXwkjtQ12BzXkfvNUpi0",
    authDomain: "openpgp-chat.firebaseapp.com",
    databaseURL: "https://openpgp-chat.firebaseio.com",
    projectId: "openpgp-chat",
    //storageBucket: "openpgp-chat.appspot.com",
    //messagingSenderId: "314141157485"
  };
var fire = firebase.initializeApp(config);
var auth = fire.auth();
var database = fire.database();

var login = new Logar.mainLogin.Login(auth);
var armazena = new Armazenamento.mainArmazenamento.Armazenamento(database);
