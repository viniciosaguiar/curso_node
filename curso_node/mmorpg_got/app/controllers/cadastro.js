module.exports.inicioCadastro = function(application, req, resp){
	resp.render('cadastro', {validacao : {}, dadosForm : {}});
}

module.exports.cadastrar = function(application, req, resp){

	var dadosForm = req.body;

	var erros = validarCampos(req, dadosForm);

	if(erros){
		resp.render('cadastro',{validacao : erros, dadosForm: dadosForm});
		return;
	}

	var connection = application.config.dbConnection;

	var usuariosDAO = new application.app.models.UsuariosDAO(connection);
	var jogoDAO = new application.app.models.JogoDAO(connection);

	usuariosDAO.inserirUsuario(dadosForm);
	jogoDAO.inserirParametros(dadosForm.usuario);
	dadosForm.cadastroSucesso = true;

	usuariosDAO.autenticar(dadosForm, req, resp);
}

module.exports.buscar = function(application, req, resp){
	var connection = application.config.dbConnection;

	var usuariosDAO = new application.app.models.UsuariosDAO(connection);

	usuariosDAO.buscarUsuario();
}

function validarCampos(req, dadosForm){

	req.assert('nome', 'Nome não pode ser vazio.').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio.').notEmpty();
	req.assert('usuario', 'Usuário não pode ser vazio.').notEmpty();
	req.assert('casa', 'Casa não pode ser vazio.').notEmpty();

	return req.validationErrors();
}
