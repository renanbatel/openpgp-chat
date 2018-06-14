const firebaseFunction = require('./js/firebaseFunctions.js');


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

// var template = $("#contatos-template").html();
// var compiledTemplate = Handlebars.compile(template);
// var fbase = require('./js/firebaseFunctions');
// var usuario = {
//     "nome" : "gerso",
//     "chavePrivada": '123456',
//     "contatos":[{
//                 "nome":"maria",
//                 "chavePrivada": 'abc123'
//             },{
//                 "nome":"seu zé",
//                 "chavePrivada":'456abc'
//             },{
//                 "nome" : "samara",
//                 "chavePrivada": "chobate"
//             }]
// }
//     console.log('logou certo');
//     $('#contatos-list').html(compiledTemplate(usuario));

const Materialize = require( './lib/materialize/js/bin/materialize' );

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
  loadMaterializeComponents();
} );
