function UsuariosDAO(connection){
	this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
	var dados = {
		operacao: "inserir",
		query: usuario,
		collection: "usuarios",
		callback: function(err, result){
			if(err) throw err;
		}
	};
	this._connection(dados);

};

UsuariosDAO.prototype.buscarUsuario = function() {
	var dados = {
		operacao: "buscar",
		collection: "usuarios",
		query: "{usuario : 'vinicios'}",
		callback: function(err, result){
			if(err) throw err;
		}
	};
	this._connection(dados);

};

UsuariosDAO.prototype.autenticar = function(usuario, req, resp){

	var dados = {
		operacao: "buscar",
		collection: "usuarios",
		query: usuario,
		callback: function(err, result){
			if(err){
				throw err;	
			} else if(result[0] != undefined){
				
				req.session.autorizado = true;
				req.session.usuario = result[0].usuario;
				req.session.casa = result[0].casa;
			}

			if(req.session.autorizado){
				if(usuario.cadastroSucesso){
					resp.redirect('jogo?msg=C');
				} else {
					resp.redirect('jogo');	
				}
				
			} else{
				var erro =[{msg: 'Usuário ou senha inválidos.'}];
				console.log(usuario);
				resp.render('index', {validacao : erro, dadosForm : usuario});
			}
		}
	};
	 this._connection(dados);
};

module.exports = function(){
	return UsuariosDAO;
}
