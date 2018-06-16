const firebaseFunction = require('./js/firebaseFunctions.js');
const Materialize      = require( './lib/materialize/js/bin/materialize' );
const Handlebars       = require( 'handlebars/runtime' );
const templates        = require( './js/view/templates/templates.js' );

const btnLogout    = document.getElementById('logout');
const btnSend = document.getElementById('btn-send');
const mensagem = document.getElementById('message'); 


btnSend.addEventListener('click', (event)=>{
    event.preventDefault();
    let msg = mensagem.value;
    console.log(msg);
    firebaseFunction.enviarMensagem("ryY1g0TauBSSEIUMI4T0uEC8tQF3",msg);
} );
btnLogout.addEventListener('click', (event)=>{
    event.preventDefault();
    firebaseFunction.logOut();
})

//  ##  Messages

function loadMessagesTemplate( user ) {
  let messages = new Array();

  if( user.uid ) {
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
  loadMessagesTemplate( user );
}

//  ##  Contacts

function changeContactView() {

  try {
    document.querySelector( '.home-sidebar_contact.active' ).classList.remove( 'active' );
  } catch( err ) {}
  
  this.classList.add( 'active' );

  const user = {
    uid: this.dataset.uid
  }

  loadMessages( user );
}

function loadContacsTemplate() {
  const contacts = [
    {
      name: 'Contato',
      date: 'Data',
      message: 'Tri-tip pancetta ham hock jowl capicola meatball...',
      uid: 'uid'
    }, {
      name: 'Contato',
      date: 'Data',
      message: 'Tri-tip pancetta ham hock jowl capicola meatball...'
    }, {
      name: 'Contato',
      date: 'Data',
      message: 'Tri-tip pancetta ham hock jowl capicola meatball...'
    }
  ];
  const source           = document.getElementById( 'contacts' );
  const template         = Handlebars.templates[ 'contact' ]( contacts );
        source.innerHTML = template;
}

function loadContacsEvents() {
  const contacts = document.querySelectorAll( '.home-sidebar_contact' );

  contacts.forEach( ( contact ) => contact.addEventListener( 'click', changeContactView ) );
}

function loadContacs() {
  loadContacsTemplate();
  loadContacsEvents();
}

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

document.addEventListener( 'DOMContentLoaded', () => {
  loadContacs();
  loadMaterializeComponents();
} );
