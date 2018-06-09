require('firebase');
const validation = require('./js/validation.js');
require('sweetalert');
require('./js/view/login');
const { ipcRenderer } = require('electron');
const firebaseFunction = require('./js/firebaseFunctions.js');

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