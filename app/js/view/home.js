const firebaseFunctions = require('./js/firebaseFunctions.js');
const Materialize       = require( './lib/materialize/js/bin/materialize' );
const Handlebars        = require( 'handlebars/runtime' );
const templates         = require( './js/view/templates/templates.js' );
const swal              = require( 'sweetalert' );
const validation        = require( './js/validation' );
const openpgp           = require('./js/cryptografa');
const helpers           = require('./js/helpers')

const messagesView = document.getElementById( 'messagesView' );
const currentUser = document.getElementById( 'currentUser' );
const btnLogout    = document.getElementById('logout');
const btnaddChave    = document.getElementById('addchave');
const btnSend = document.getElementById('btn-send');
const mensagem = document.getElementById('message'); 
const private_key_get = document.createElement('span');
private_key_get.className = 'private-key-modal';
private_key_get.innerText = 'Clique aqui para selecionar sua chave';

btnaddChave.addEventListener('click',(e)=>{
  e.preventDefault();
  addChavePrivada();
})
private_key_get.addEventListener('click', (e)=>{
  e.preventDefault();
  addChavePrivada();
})
function addChavePrivada(){
  validaPath = openpgp.leChave()
  setTimeout(() => {
      if(validaPath){
          firebaseFunctions.setChavePrivada(openpgp.getChavePrivada());
          swal({
            title: 'Pronto',
            text: 'Suas mensagens serão carregadas',
            icon: 'success',
            buttons: 'Ok'
        })        
      }
      else{
          swal({
              title: 'Oops',
              text: 'Passe um arquivo valido',
              icon: 'error',
              content: private_key_get
          })        
      }  
  }, 400);
}

btnLogout.addEventListener('click', (event)=>{
    event.preventDefault();
    firebaseFunctions.logOut();
})

//  ##  Message

let   control      = false;

function sendMessage() {
  const content = mensagem.value;
  firebaseFunctions.enviarMensagem(currentContact.dataset.pubKey, currentUser.dataset.pubKey, currentContact.dataset.uid, content, () => {
    mensagem.value = '';
  } );
}

btnSend.addEventListener('click', sendMessage );

mensagem.addEventListener( 'keyup' , ( event ) => {
  if( mensagem.value.length == 0 ) {
    btnSend.setAttribute( 'disabled', 'true' );
  } else {
    btnSend.removeAttribute( 'disabled' );
  }
  if( event.key == 'Control' ) {
    event.preventDefault();
    control = false;
  }
} );

mensagem.addEventListener( 'keydown', ( event ) => {
  if( ! event.repeat ) {
    if( event.key === 'Enter' ) {
      event.preventDefault();
      if( control ) {
        mensagem.value += '\n';
      } else {
        if( mensagem.value.length != 0 )
        sendMessage();
      }
    } else if( event.key == 'Control' ) {
      event.preventDefault();
      control = true;
    }
  }
} );

//  ##  Add Contact

const addContact = document.getElementById( 'addContact' );

/**
 * Adiciona o novo contato
 */

function addNewContact( email ) {
  firebaseFunctions.addContato( currentUser.dataset.uid, email, () => {
    loadContacs();
    swal( {
      icon: 'success',
      title: 'Contato adicionado',
    } );
  }, true );
}

/**
 * Carrega dados do usuario logado
 */

function loadUserData() {
  firebaseFunctions.setCurrentUserData( ( user ) => {
    currentUser.innerText      = user.name;
    currentUser.dataset.uid    = user.id;
    currentUser.dataset.pubKey = user.chavePublica;
  } );
}

/**
 * Abre o modal para adicionar o contato
 */

function openAddContact() {

  const emailBase  = document.createElement( 'div' );
  const emailInput = document.createElement( 'input' );
  const emailError = document.createElement( 'span' );

  emailBase.className    = 'input-field';
  emailInput.type        = 'email';
  emailInput.id          = 'contactEmail';
  emailInput.placeholder = 'Insira o email do contato';
  emailError.className   = 'input-feedback';
  emailError.id          = 'contactEmailFeedback';

  emailBase.appendChild( emailInput );
  emailBase.appendChild( emailError );

  emailInput.addEventListener( 'focusout', () => validation.validateAddContact( emailInput, emailError ) );

  swal( {
    title: 'Adicione um contato',
    content: emailBase,
    className: 'add-contact-modal',
    buttons: {
      cancel: { 
        text: 'Cancelar',
        closeModal: true,
        visible: true
      }, 
      confirm: {
        text: 'Adicionar',
        value: true,
        closeModal: false,
        className: 'prevent-loading',
      }
    }
  } ).then( ( value ) => {
    if( value && validation.validateAddContact( emailInput, emailError ) ) {
      document.querySelector( '.add-contact-modal .swal-button.prevent-loading' ).classList.remove( 'prevent-loading' );
      addNewContact( emailInput.value );
    }
  } );

  const modalConfirmButton = document.querySelector( '.add-contact-modal .swal-button.swal-button--confirm' );
  modalConfirmButton.setAttribute( 'disabled', 'true' );

  emailInput.addEventListener( 'keyup', () => {
    if( validation.validateAddContact( emailInput ) )
      modalConfirmButton.removeAttribute( 'disabled' );
    else
      modalConfirmButton.setAttribute( 'disabled', 'true' );
  } );
}

try {
  addContact.addEventListener( 'click', openAddContact );
} catch ( err ) {}

//  ##  Messages

/**
 * Carrega as informações do contato atual para o elemento Current User
 */

function loadMessagesView( user ) {
  currentContact.innerText   = user.name;
  currentContact.dataset.uid = user.uid;
  currentContact.dataset.pubKey = user.pubKey;
}

/**
 * Carrega o template das mensages para listar na view
 */

function loadMessagesTemplate( user ) {

  const source           = document.getElementById( 'messages' );
        source.innerHTML = '';

  firebaseFunctions.carregaMensagem( user.uid, ( message ) => {
    const template          = Handlebars.templates[ 'message' ]( message );
          source.innerHTML += template;
    messagesView.scrollTop = messagesView.scrollHeight;
  } );
}

function loadMessages( user ) {
  loadMessagesView( user );
  loadMessagesTemplate( user );
}

//  ##  Contacts

/**
 *  Função para quando o contato é clicado
 */

const mainHeader = document.getElementById( 'mainHeader' );
const mainFooter = document.getElementById( 'mainFooter' );

function changeContactView() {

  try {
    document.querySelector( '.home-sidebar_contact.active' ).classList.remove( 'active' );
  } catch( err ) {}
  
  this.classList.add( 'active' );

  mainHeader.style.display = 'block';
  mainFooter.style.display = 'flex';

  const user = {
    name: this.dataset.name,
    uid : this.dataset.uid,
    pubKey: this.dataset.pubkey
  }
  loadMessages( user );
}

/**
 * Carrega o template de contatos para listar na view
 */

function loadContacsTemplate( contacts ) {
  const source           = document.getElementById( 'contacts' );
  const template         = Handlebars.templates[ 'contact' ]( contacts );
        source.innerHTML = template;
}

/**
 * Registra um evento de click para cada contato da view
 */

function loadContacsEvents() {
  const contacts = document.querySelectorAll( '.home-sidebar_contact' );

  contacts.forEach( ( contact ) => contact.addEventListener( 'click', changeContactView ) );
}

/**
 * Chama a função de carregar contatos do Firebase
 */

function loadContacs() {
  const loader   = document.getElementById( 'loader' );
  const contacts = firebaseFunctions.getAllContatos( ( contacts ) => {
    loadContacsTemplate( contacts );
    loadContacsEvents();
    loadUserData();
    helpers.fadeOut( loader );
    if( ! firebaseFunctions.getChavePrivada() ) {
      swal({
        title: 'Adicione sua chave privada',
        text: 'A gente precisa da sua chave privada para ler as mensagens',
        icon: 'warning',
        content: private_key_get,
        buttons: {
          cancel: {
            text: 'Cancelar',
            value: null,
            visible: true
          },
          confirm: {
            visible: false
          }
        }
      });
    }
  } );
}

//  ##  Materialize Components

function buildMaterializeDropdown( params ) {

  return Materialize.Dropdown.init( params.elems, params.options );
}

function loadMaterializeComponents() {

  // Dropdown

  const dropdownElems     = document.querySelectorAll( '.dropdown-trigger' );
  const dropdownOptions   = {
    alignment   : 'right',
    coverTrigger: false
  };
  const dropdownInstances = Materialize.Dropdown.init( dropdownElems, dropdownOptions );

  const sidebarOptionsDropdown = buildMaterializeDropdown( {
    elems  : document.querySelector( '.home-sidebar_dropdown' ),
    options: {
      alignment   : 'right',
      coverTrigger: false
    }
  } );

  const contactOptionsDropdown = buildMaterializeDropdown( {
    elems  : document.querySelector( '.home-main_contact-dropdown' ),
    options: {
      alignment   : 'left',
      coverTrigger: false
    }
  } );
}

/**
 * Funções para quando a DOM é carregado
 */

document.addEventListener( 'DOMContentLoaded', () => {
  loadContacs();
  loadMaterializeComponents();
  firebaseFunctions.Adicionado( () => {
    loadContacs();
  } );
} );
