module.exports.home = function (application, req, resp) {
	if(!req.session.autorizado){
		resp.render('index', {validacao : {}, dadosForm : {}});	
	} else {

		var usuario = req.session.usuario;
		var casa = req.session.casa;

		var connection = application.config.dbConnection;
		var jogoDAO = new application.app.models.JogoDAO(connection);

		jogoDAO.buscarParametrosPorUsuario(usuario, casa, resp, '');
	} 
	
};

module.exports.autenticar = function (application, req, resp) {

	var dadosForm = req.body;

	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		resp.render('index', {validacao : erros, dadosForm : {}})
		return;
	}

	var connection = application.config.dbConnection;
	var usuariosDAO = new application.app.models.UsuariosDAO(connection);

	usuariosDAO.autenticar(dadosForm, req, resp);
}
