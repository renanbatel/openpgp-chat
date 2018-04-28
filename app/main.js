'use strict'

require( 'electron-reload' )( __dirname );

const electron    = require( 'electron' );
const path        = require( 'path' );
const url         = require( 'url' );
var openpgp       = require( 'openpgp' ); 

const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;


app.on( 'ready', () => {

  mainWindow = new BrowserWindow( {
    width:  960,
    height: 540
  } );

  mainWindow.loadURL( url.format( {
    pathname: path.join( __dirname, 'index.html' ),
    protocol: 'file',
    slashes:  true
  } ) );

} );
