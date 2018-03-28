module.exports.noticias = function(aplicacao, req, resp){

	var connection = aplicacao.config.dbConnection();
	var noticiasModel = new aplicacao.app.models.NoticiasDAO(connection);

	noticiasModel.getNoticias(function(error, result){
		resp.render("noticias/noticias", {noticias : result});
	});
}

module.exports.detalhe_noticia = function(aplicacao, req, resp){

	var connection = aplicacao.config.dbConnection();
	var noticiasModel = new aplicacao.app.models.NoticiasDAO(connection);

	var id_noticia = req.query;

	noticiasModel.getDetalheNoticia(id_noticia, function(erro, result){
		resp.render("noticias/detalhe_noticia", {noticia : result});
	});
} 
