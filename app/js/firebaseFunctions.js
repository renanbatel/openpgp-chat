require('sweetalert');
var firebase = require('firebase')
var openpgp = require('/Users/Mateus/Desktop/openpgp-chat/app/js/cryptografa')


function validaSignup() {

    var email = document.getElementById('signup_email');
    var senha = document.getElementById('signup_senha');
    var nome = document.getElementById('signup_nome');

    if (validation.validateSignup()) {

    const signup_form = document.getElementById( 'signup_form' );

    signup_form.classList.add( 'loading' );

    firebase.auth().createUserWithEmailAndPassword(email.value, senha.value).then(res => {
        openpgp.geraChave(nome.value,email.value);
        setTimeout(() => {
            let priv = openpgp.getChavePrivada();
            let public = openpgp.getChavePublica();
            salvaUsu(nome.value, email.value, res.uid, priv, public);
            addContato(res.uid);
            nome.value  = '';
            email.value = '';
            senha.value = '';
        }, 3000);
        // addContato(res.user.uid);
        const login_screen          = document.getElementById('login_screen');
        const login_panel           = document.getElementById( 'login_panel' );
        const panel_wrapper         = document.getElementById( 'panel_wrapper' );
        const private_key           = document.createElement('span');
              private_key.className = 'private-key-modal';
              private_key.innerText = '{{chave privada}}';

        signup_form.classList.remove( 'loading' );

        
        nome.classList.remove( 'success' );
        email.classList.remove( 'success' );
        senha.classList.remove( 'success' );

        swal( {
            title: 'Usuário criado com sucesso!',
            text: 'Utilize sua chave privada para começar a usar:',
            icon: 'success',
            buttons: 'Começar',
            content: private_key
        })
            .then((value) => {
                setTimeout(() => {
                    login_screen.classList.remove('signup-panel-opened');
                    panel_wrapper.style.height = `${ login_panel.offsetHeight }px`;
                }, 200);
            });
    }).catch(function (error) {
        if (error != null) {
            console.log("erro " + error);
            return;
        }
    });
}}

function validaLogin() {

    var email = document.getElementById('email');
    var senha = document.getElementById('senha');

    const login_error           = document.getElementById( 'login_error' );
          login_error.innerText = '';

    if ( validation.validateLogin() ) {

        const login_form = document.getElementById('login_form');

        login_form.classList.add('loading');

        firebase.auth().signInWithEmailAndPassword(email.value, senha.value).then(function () {
            ipcRenderer.send('abrir-home');
        }).catch(function (error) {
            if (error != null) {
                login_form.classList.remove('loading');
                login_error.innerText = 'Email ou senha invalídos';
                email.classList.remove( 'success' );
                senha.classList.remove( 'success' );
                email.classList.add( 'error' );
                senha.classList.add( 'error' );
            }
        });
    }
}
function salvaUsu(nome, email, uid, priv, public) {
    var usuRef = this.database.ref('usuarios/' + uid + '/informacoes');
    usuRef.push({
        name: nome,
        email: email,
        id: uid,
        chavePublica:public,
        chavePrivada:priv
    });
}


function logOut() {
    firebase.auth().signOut();
}
function addContato(uid) {

    var email = "romero@gmail.com"; //aqui será o email pra add o contato
    getAllUsuarios(uid, (usuarios) => {

        var info = usuarios.map(r => r.informacoes);
        var usuRef = this.database.ref('usuarios/' + uid + '/contatos');

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

function enviarMensagem(ChavePUDestinatario) {
    //CRIFRAR MENSAGEM, PERGUNTA: CIFRAR AQUI O NO ADDLISTENER ???
    var user = firebase.auth().currentUser;
    if (user) {
        var mens = 'ea man, e o parmera ein? kkkk';
        var mensagem = this.database.ref('mensagens/');
        mensagem.push({ uidEmitente: user.uid, uidDestinatario: ChavePUDestinatario, mensagem: mens });
    }else{
        console.log('USUARIO NÃO LOGADO')
    }
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