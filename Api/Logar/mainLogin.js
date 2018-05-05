function Login(auth){
    this._auth = auth;
}

Login.prototype.Logar = function(){
  var loginGoogle = new firebase.auth.GoogleAuthProvider();
  this._auth.signInWithPopup(loginGoogle);
  // .then(function(result){
  //   //Da o Token de Acesso do Google, podendo acessar a API
  //   var token = result.credential.acessToken;
  //   //Informações do usuário logado
  //   var user = result.user;
  // }).catch(function(error){
  //   //tratar dos erros
  //   console.log("NEYMAR "+error)
  // });
}
Login.prototype.Sair = function(){
  this._auth.signOut();
}
Login.prototype.IdentificarUsu = function(){
  this._auth.onAuthStateChanged(function(user){
    if(user){
      console.log(user)
      var usuLogado = user;
    }else{
      console.log('ninguem logado')
    }
    //return usuLogado;
  });
}
Login.prototype.Excluir = function(){
  var user = this._auth.currentUser;
  user.delete();
}

module.exports = function(){
    return Login;
};
