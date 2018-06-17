class Counter {

  constructor( config ) {
    this._max      = config.max;
    this._timeout  = config.timeout;
    this._message  = config.message;
    this._elem     = config.elem;
    this._attemps  = 0;
    this._timeLeft = 0;
    this._interval = null;
    this._waiting  = true;
  }

  _throw() {
      
    if( this._timeLeft == 0 ) {
      this._timeLeft = this._timeout;
      this._countdown();
      this._interval = setInterval( () => this._countdown(), 1000 );
    }

    this._waiting = false;
    return this._waiting;
  }

  _countdown() {
    this._timeLeft == 0 ? this._clear() : this._elem.innerText = this._message.replace( '{result}', this._timeLeft-- );
  }

  _clear() {
    clearInterval( this._interval );
    this._waiting               = true;
    this._timeLeft              = 0;
    this._attemps               = 0;
    this._elem.innerText = '';
  }

  isWaiting() {
    return this._waiting;
  }

  count() {
    ++this._attemps == this._max ? this._throw() : null;
  }
}

function fadeOut( elem ) {
    elem.style.opacity == '' ? elem.style.opacity = '1' : elem.style.opacity = parseFloat( elem.style.opacity ) - 0.1;
    parseFloat( elem.style.opacity ) > 0 ? setTimeout( () => fadeOut( elem ), 16 ) : elem.style.display = 'none';
}

module.exports = {
  Counter,
  fadeOut
}