function NoticiasDAO(connection){

	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
	this._connection.query('select * from noticias order by data_criacao desc', callback);
};

NoticiasDAO.prototype.getDetalheNoticia = function(id_noticia, callback){
	this._connection.query('select * from noticias where id_noticia = ' + id_noticia.id_noticia, callback);
};

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
	this._connection.query('insert into noticias set ? ', noticia, callback);
};

NoticiasDAO.prototype.getCincoUltimasNoticias = function(callback){
	this._connection.query('select * from noticias order by data_criacao desc limit 5', callback);		
};

module.exports = function(){
	
	return NoticiasDAO;
}
