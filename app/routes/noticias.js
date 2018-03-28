//var dbConnection =  require('../../config/dbConnection');

module.exports = function(aplicacao){

	aplicacao.get('/noticias', function(req, resp){
		aplicacao.app.controllers.noticias.noticias(aplicacao, req, resp);
		
	});

	aplicacao.get('/detalhe_noticia', function(req, resp){
		aplicacao.app.controllers.noticias.detalhe_noticia(aplicacao, req, resp);
		
	});	
};

