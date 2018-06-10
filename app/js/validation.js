const Validator = require( 'validator' );

//  ## Common

function validated( input, feedback ) {

  input.classList.remove( 'error' );
  input.classList.add( 'success' );
  feedback.innerText = '';

  return true;
}

function initValidation( input ) {
  
  input.classList.contains( 'success' ) ? input.classList.remove( 'success' ) : null;
}

//  ##  Name Validation

const signup_name          = document.getElementById( 'signup_nome' );
const signup_name_feedback = document.getElementById( 'signup_nome_feedback' );

function validateName( input, feedback ) {

  const value = input.value;

  initValidation( input );

  if( Validator.isEmpty( value ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'Precisamos do seu nome';

    return false;
  }

  return validated( input, feedback );
}

try {
  signup_name.addEventListener( 'focusout', () => validateName( signup_name, signup_name_feedback ) );
} catch( err ) {}

//  ##  Email Validation

const email                 = document.getElementById( 'email' );
const email_feedback        = document.getElementById( 'email_feedback' );
const signup_email          = document.getElementById( 'signup_email' );
const signup_email_feedback = document.getElementById( 'signup_email_feedback' );

function validateEmail( input, feedback ) {

  const value = input.value;

  initValidation( input );

  if( Validator.isEmpty( value ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'Por favor insira seu email';
    
    return false;
  } else if( ! Validator.isEmail( value ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'Por favor insira um email válido';
    
    return false;
  }

  return validated( input, feedback );
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

  initValidation( input );

  if( Validator.isEmpty( value ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'Por favor insira uma senha';
    
    return false;
  }

  return validated( input, feedback );
}

try {
  password.addEventListener( 'focusout', () => validatePassword( password, password_feedback ) );
} catch( err ) {}

// Password Length

function validatePasswordLength( input, feedback ) {

  const value = input.value;

  initValidation( input );

  if( ! Validator.isLength( value, { min: 6 } ) ) {
    input.classList.add( 'error' );
    feedback.innerText = 'A senha deve conter no mínio 6 caracteres';

    return false;
  }

  return validated( input, feedback );
}

try {
  signup_password.addEventListener( 'focusout', () => validatePassword( signup_password, signup_password_feedback ) ? validatePasswordLength( signup_password, signup_password_feedback ) : true );
} catch( err ) {}

//  ##  Form Validation

function validateLogin() {
  return validateEmail( email, email_feedback ) && validatePassword( password, password_feedback );
}

function validateSignup() {
  return validateName( signup_name, signup_name_feedback ) && validateEmail( signup_email, signup_email_feedback ) && validatePassword( signup_password, signup_password_feedback ) && validatePasswordLength( signup_password, signup_password_feedback );
}

//  ##  Export

module.exports = {
  validateLogin,
  validateSignup
}