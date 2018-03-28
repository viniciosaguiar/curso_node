module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastro.inicioCadastro(application, req,res);
	});

	application.post('/cadastrar', function(req, res){
		application.app.controllers.cadastro.cadastrar(application, req,res);
	});

	application.get('/buscar', function(req, res){
		application.app.controllers.cadastro.buscar(application, req,res);
	});
}
