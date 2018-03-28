var ObjectId = require('mongodb').ObjectId;

function JogoDAO(connection) {
	this._connection = connection;
}

JogoDAO.prototype.inserirParametros = function(usuario) {
	
	var strQuery = {
		usuario: usuario,
		moeda : 15,
		suditos : 10,
		temor: Math.floor(Math.random() * 1000),
		sabedoria: Math.floor(Math.random() * 1000),
		comercio: Math.floor(Math.random() * 1000),
		magia: Math.floor(Math.random() * 1000)
	};

	var dados = {
		operacao: "inserir",
		query: strQuery,
		collection: "jogo",
		callback: function(err, result){
			if(err) throw err;
		}
	};
	this._connection(dados);

};

JogoDAO.prototype.buscarParametrosPorUsuario = function(usuario, casa, resp, msg) {
	var strQuery = {usuario : usuario};

	var dados = {
		operacao: "buscar",
		collection: "jogo",
		query: strQuery,
		callback: function(err, result){
			if(err) throw err;
			
			resp.render('jogo', {img_casa : casa, jogo : result[0], msg : msg	});	
		}
	};
	this._connection(dados);
};

JogoDAO.prototype.acao = function(acao) {

	addAcao(acao, this._connection);
	atualizaMoedas(acao, this._connection);	
};

function addAcao(acao, connection){

	var dados = {
		operacao: "inserir",
		query: acao,
		collection: "acao",
		callback: function(err, result){
			if(err) throw err;
		}
	};
	connection(dados);

}

function atualizaMoedas(acao, connection) {
	
	var moedas =  calcularMoedasRestantes(acao);

	var strQuery = {usuario : acao.usuario};
	var newValues = {$inc : {moeda : moedas}};

	var dados = {
		operacao: "atualizar",
		query: strQuery,
		newValue: newValues,
		collection: "jogo",
		callback: function(err, result){
			if(err) throw err;
		}
	};
	connection(dados);
};

function calcularMoedasRestantes(acao){
	var moedas = null;

	switch(parseInt(acao.acao)){
		case 1:
			moedas = -2 * acao.quantidade;
			break;
		case 2:
			moedas = -3 * acao.quantidade;
			break;
		case 3:
			moedas = -1 * acao.quantidade;
			break;
		case 4:
			moedas = -1 * acao.quantidade;
			break;
	}
	return moedas;
}

JogoDAO.prototype.revogarAcao = function(idAcao, resp) {

	var query = {_id : ObjectId(idAcao._id)};
	
	var dados = {
		operacao: "deletar",
		collection: "acao",
		query: query,
		callback: function(err, result){
			if(err) throw err;
			resp.redirect('jogo?msg=D');
		}
	};
	this._connection(dados);
	
};

JogoDAO.prototype.getAcoes = function(usuario, resp) {
	
	var date = new Date();
	var momento_atual = date.getTime();

	var strQuery = {usuario : usuario, acao_termina_em : {$gt : momento_atual}};

	var dados = {
		operacao: "buscar",
		collection: "acao",
		query: strQuery,
		callback: function(err, result){
			if(err) throw err;

			resp.render('pergaminhos', {acoes : result});
		}
	};
	this._connection(dados);
};

module.exports = function(){
	return JogoDAO;
}
