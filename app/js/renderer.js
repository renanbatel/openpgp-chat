require('./js/view/login');
const { ipcRenderer } = require('electron');
const firebaseFunction = require('./js/firebaseFunctions.js');

var btnCadastrar = document.getElementById('cadastrar');
var btnLogin = document.getElementById('login');
var btnLogout = document.getElementById('logo-out');

btnCadastrar.addEventListener('click', function (event) {
    event.preventDefault();
    firebaseFunction.validaSignup();
});

btnLogin.addEventListener('click', function (event) {
    event.preventDefault();
    firebaseFunction.validaLogin();
});

btnLogout.addEventListener('click', e => {
    event.preventDefault()
    firebaseFunction.logOut();
});