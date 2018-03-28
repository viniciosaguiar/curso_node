module.exports.iniciaJogo = function(application, req, resp){
	if(usuarioAutorizado(req, resp)){

		var msg = '';
		if(req.query.msg != ''){
			msg = req.query.msg;
		}

		var usuario = req.session.usuario;
		var casa = req.session.casa;

		var connection = application.config.dbConnection;
		var jogoDAO = new application.app.models.JogoDAO(connection);

		jogoDAO.buscarParametrosPorUsuario(usuario, casa, resp, msg);
	}	
};

module.exports.sair = function(application, req, resp){
	req.session.destroy( function(err){
		if(err) {
			throw err;
		}
		resp.render('index', {validacao : {}, dadosForm: {}});
	});
	
}

module.exports.suditos = function(application, req, resp){
	if(usuarioAutorizado(req, resp)){
		resp.render('aldeoes');
	}
}

module.exports.pergaminhos = function(application, req, resp){
	if(usuarioAutorizado(req, resp)){
		
		/* recuperar as ações inseridas no banco de dados */
		var connection = application.config.dbConnection;
		var jogoDAO = new application.app.models.JogoDAO(connection);

		var usuario = req.session.usuario;

		jogoDAO.getAcoes(usuario, resp);
	}
}

module.exports.ordenar_acao_sudito = function(application, req, resp){
	
	if(usuarioAutorizado(req, resp)){

		var dadosForm = req.body;

		req.assert('acao', 'Ação deve ser informada').notEmpty();
		req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

		var errors = req.validationErrors();

		if(errors){
			resp.redirect('jogo?msg=E');
			return;
		}
		
		var connection = application.config.dbConnection;
		var jogoDAO = new application.app.models.JogoDAO(connection);

		dadosForm.usuario = req.session.usuario;
		dadosForm.acao_termina_em = calcularTempoAcaoTermina(dadosForm);
		jogoDAO.acao(dadosForm);

		resp.redirect('jogo?msg=S');
	}
}

module.exports.revogar_acao = function(application, req, resp){

	if(usuarioAutorizado(req, resp)){

		var connection = application.config.dbConnection;
		var jogoDAO = new application.app.models.JogoDAO(connection);

		var idAcao = req.query;
		
		jogoDAO.revogarAcao(idAcao, resp);
	}
}


function usuarioAutorizado(req, resp){
	
	var autorizado = true;

	if(!req.session.autorizado){
		autorizado = false;
		resp.render('index', {validacao : {}, dadosForm: {}});
	}

	return autorizado;
}

function calcularTempoAcaoTermina(acao){

	var date = new Date();
	var tempo = null;
	var tempoEmMs = 60 * 60000 //converter (uma) hora em milisegundos.

	switch(parseInt(acao.acao)){
		case 1:
			tempo = 1 * tempoEmMs;
			break;
		case 2:
			tempo = 2 * tempoEmMs;
			break;
		case 3:
			tempo = 5 * tempoEmMs;
			break;
		case 4:
			tempo = 5 * tempoEmMs;
			break;
	}

	return date.getTime() + tempo;
}
