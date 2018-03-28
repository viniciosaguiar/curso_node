var app = require("./config/server");









/**OUTRAS FORMAS DE INCLUIR AS ROTAS

//var rotaNoticias = require('./app/routes/noticias');
//rotaNoticias(app);
//var rotaHome = require('./app/routes/home');
//rotaHome(app);

//var rotaInclusaoNoticia = require('./app/routes/formulario_inclusao_noticia')(app);
//or
//rotaInclusaoNoticia(app);

//app.get('/', function(req, resp){
//	resp.send("<html><body>Portal de noticias</body></html>");
//});

//app.get('/tecnologia', function(req, resp){
//	resp.send("<html><body>Noticias de tecnologia</body></html>");
//});

*/

app.listen(3000, function(){
	console.log("Server ON!");
});