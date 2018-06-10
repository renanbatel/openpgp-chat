function Counter( config ) {
  this._attemps  = 0;
  this._timeLeft = 0;
  this._interval = null;
  this._waiting  = true;

  this._throw = () => {
      
      if( this._timeLeft == 0 ) {
          this._timeLeft = config.timeout;
          this._countdown();
          this._interval = setInterval( this._countdown, 1000 );
      }

      this._waiting = false;
      return this._waiting;
  };

  this._countdown = () => {
      this._timeLeft == 0 ? this._clear() : config.elem.innerText = config.message.replace( '{result}', this._timeLeft-- );
  };

  this._clear = () => {
      clearInterval( this._interval );
      this._waiting         = true;
      this._timeLeft        = 0;
      this._attemps         = 0;
      config.elem.innerText = '';
  }

  this.isWaiting = () => {
    return this._waiting;
  }

  this.count = () => {
    return ++this._attemps == config.max ? this._throw() : null;
  };
}

module.exports = {
  Counter
}