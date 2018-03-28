module.exports = function(aplicacao){

	aplicacao.get('/', function(req, resp){
		aplicacao.app.controllers.home.index(aplicacao, req, resp);
	});
}

