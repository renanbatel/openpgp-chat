const Validator = require( 'validator' );

//  ##  Email Validation

const email                 = document.getElementById( 'email' );
const email_feedback        = document.getElementById( 'email_feedback' );
const signup_email          = document.getElementById( 'signup_email' );
const signup_email_feedback = document.getElementById( 'signup_email_feedback' );

function validateEmail( input, feedback ) {

  const value = input.value;

  if( Validator.isEmpty( value ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'Por favor insira seu email';
    
    return false;
  } else if( ! Validator.isEmail( value ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'Por favor insira um email válido';
    
    return false;
  }

  input.classList.remove( 'error' );
  input.classList.add( 'success' );
  feedback.innerText = '';

  return true;
}

try {
  email.addEventListener( 'focusout', () => validateEmail( email, email_feedback ) );
} catch( err ) {}
try {
  signup_email.addEventListener( 'focusout', () => validateEmail( signup_email, signup_email_feedback ) );
} catch( err ) {}

//  ##  Password Validation

const password                 = document.getElementById( 'senha' );
const password_feedback        = document.getElementById( 'senha_feedback' );
const signup_password          = document.getElementById( 'signup_senha' );
const signup_password_feedback = document.getElementById( 'signup_senha_feedback' );

function validatePassword( input, feedback ) {

  const value = input.value;

  if( Validator.isEmpty( value ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'Por favor insira uma senha';
    
    return false;
  }

  input.classList.remove( 'error' );
  input.classList.add( 'success' );
  feedback.innerText = '';

  return true;
}

try {
  password.addEventListener( 'focusout', () => validatePassword( password, password_feedback ) );
} catch( err ) {}
try {
  signup_password.addEventListener( 'focusout', () => validatePassword( signup_password, signup_password_feedback ) );
} catch( err ) {}

//  ##  Form Validation

function validateLogin() {
  return validateEmail( email, email_feedback ) && validatePassword( password, password_feedback );
}

function validateSignup() {
  return validateEmail( signup_email, signup_email_feedback ) && validatePassword( signup_password, signup_password_feedback );
}

//  ##  Export

module.exports = {
  validateLogin,
  validateSignup
}