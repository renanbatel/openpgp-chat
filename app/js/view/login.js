const open_signup  = document.getElementById( 'open_signup' );
const close_signup = document.getElementById( 'close_signup' );
const login_screen = document.getElementById( 'login_screen' );


function openSignUpPanel( event ) {
  event.preventDefault();
  login_screen.classList.add( 'signup-panel-opened' );
}

function closeSignUpPanel( event ) {
  event.preventDefault();
  login_screen.classList.remove( 'signup-panel-opened' );
}

open_signup.addEventListener( 'click', openSignUpPanel );
close_signup.addEventListener( 'click', closeSignUpPanel );