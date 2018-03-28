module.exports = function(application){
	application.get('/', function(req, resp){
		application.app.controllers.index.home(application, req, resp);
	});

}
