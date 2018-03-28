module.exports.home = function(application, req, resp){
	resp.render("index", {validacao: {}});
}
