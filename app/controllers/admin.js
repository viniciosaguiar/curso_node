module.exports.formulario_inclusao_noticia = function(app, req, resp){
	resp.render("admin/form_add_noticia", {validacao :{}, noticia : {}});
}

module.exports.noticias_salvar = function(aplicacao, req, resp){

	var noticia = req.body;

	var erros = validaCampos(req);

	if(erros){

		resp.render("admin/form_add_noticia", {validacao : erros, noticia : noticia});
		return;	
	}
	
	var connection = aplicacao.config.dbConnection();
	var noticiasModel = new aplicacao.app.models.NoticiasDAO(connection);

	noticiasModel.salvarNoticia(noticia, function(erro, result){
		resp.redirect('/noticias');
	});
}

function validaCampos(req){

	req.assert('titulo', 'O título da notícia é obrigatório.').notEmpty();
	req.assert('resumo', 'O resumo da noticía é obrigatório.').notEmpty();
	req.assert('resumo', 'O resumo da noticía deve conter entre 10 e 100 caracteres.').len(10,100);
	req.assert('autor', 'O autor da noticía é obrigatório.').notEmpty();
	req.assert('data_noticia', 'A data da noticía é obrigatório.').notEmpty();
	req.assert('noticia', 'A notícia é obrigatório.').notEmpty();

	return req.validationErrors();
}
