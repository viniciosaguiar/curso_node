module.exports.index = function(aplicacao, req, resp){
	
	var connection = aplicacao.config.dbConnection();
	var noticiasModel = new aplicacao.app.models.NoticiasDAO(connection);	

	noticiasModel.getCincoUltimasNoticias(function(erro, result){
		resp.render("home/index", {noticias : result});	
	});

	

}
