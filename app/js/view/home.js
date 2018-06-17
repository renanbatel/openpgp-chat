const firebaseFunctions = require('./js/firebaseFunctions.js');
const Materialize       = require( './lib/materialize/js/bin/materialize' );
const Handlebars        = require( 'handlebars/runtime' );
const templates         = require( './js/view/templates/templates.js' );
const swal              = require( 'sweetalert' );
const validation        = require( './js/validation' );
const helpers           = require( './js/helpers' );

const btnLogout    = document.getElementById('logout');
const btnSend = document.getElementById('btn-send');
const mensagem = document.getElementById('message'); 

btnSend.addEventListener('click', (event)=>{
    event.preventDefault();
    let msg = mensagem.value;
    console.log(msg);
    // firebaseFunctions.enviarMensagem("ryY1g0TauBSSEIUMI4T0uEC8tQF3",msg);
} );
btnLogout.addEventListener('click', (event)=>{
    event.preventDefault();
    firebaseFunctions.logOut();
})

//  ##  Add Contact

const addContact = document.getElementById( 'addContact' );

/**
 * Adiciona o novo contato
 */

function addNewContact( email ) {
  
  //  Faz os paranauê

  swal.close();
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

  emailInput.addEventListener( 'keydown', () => {
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
  const currentContact = document.getElementById( 'currentContact' );

  currentContact.innerText   = user.name;
  currentContact.dataset.uid = user.uid;
}

/**
 * Carrega o template das mensages para listar na view
 */

function loadMessagesTemplate( user ) {
  let messages = new Array();

  if( user ) {
    messages = [
      {
        message: 'Eae man, suave?',
        date: '12:00',
      }, {
        message: 'Suave man, e ae?',
        date: '12:02',
        from: 'contact'
      }, {
        message: 'Spicy jalapeno bacon ipsum dolor amet bresaola fatback picanha meatloaf. Venison ham turducken, pork biltong brisket beef ribs',
        date: '12:05',
      }, {
        message: 'Tri-tip pancetta ham hock jowl capicola meatball. Kielbasa swine pig, pastrami pork loin ball tip shoulder pork chop',
        date: '12:08',
        from: 'contact'
      }
    ];
  }

  const source           = document.getElementById( 'messages' );
  const template         = Handlebars.templates[ 'message' ]( messages );
        source.innerHTML = template;
}

function loadMessages( user ) {
  loadMessagesView( user );
  loadMessagesTemplate( user );
}

//  ##  Contacts

/**
 *  Função para quando o contato é clicado
 */

function changeContactView() {

  try {
    document.querySelector( '.home-sidebar_contact.active' ).classList.remove( 'active' );
  } catch( err ) {}
  
  this.classList.add( 'active' );

  const user = {
    name: this.dataset.name,
    uid : this.dataset.uid
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
    helpers.fadeOut( loader );
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
} );
