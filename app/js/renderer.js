require('firebase');
const validation = require('./js/validation.js');
require('sweetalert');
require('./js/view/login');
const { ipcRenderer } = require('electron');
const firebaseFunction = require('./js/firebaseFunctions.js');
var config = {
    apiKey: "AIzaSyDwU-AV5nC6m9IlXwkjtQ12BzXkfvNUpi0",
    authDomain: "openpgp-chat.firebaseapp.com",
    databaseURL: "https://openpgp-chat.firebaseio.com",
    projectId: "openpgp-chat",
    storageBucket: "openpgp-chat.appspot.com",
    messagingSenderId: "314141157485"
};
firebase.initializeApp(config);
var database = firebase.database();

var btnCadastrar = document.getElementById('cadastrar');
var btnLogin = document.getElementById('login');
var btnLogout = document.getElementById('logo-out');

btnCadastrar.addEventListener('click', function (event) {
    event.preventDefault();
    firebaseFunction.validaSignup();
});

btnLogin.addEventListener('click', function (event) {
    event.preventDefault()
    firebaseFunction.validaLogin();
});

btnLogout.addEventListener('click', e => {
    event.preventDefault()
    firebaseFunction.logOut();
});