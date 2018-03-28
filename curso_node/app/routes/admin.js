module.exports = function(aplicacao){

	aplicacao.get('/formulario_inclusao_noticia', function(req, resp){
		aplicacao.app.controllers.admin.formulario_inclusao_noticia(aplicacao, req, resp);
	});

	aplicacao.post('/noticias/salvar', function(req, resp){
		aplicacao.app.controllers.admin.noticias_salvar(aplicacao, req, resp);		
	});
}
