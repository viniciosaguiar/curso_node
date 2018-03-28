/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(8080, function(){
	console.log('Servidor online');
})

var socketIo = require('socket.io').listen(server);

app.set('io', socketIo);

/* criar a conexão por websocket */
socketIo.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){
		
		/* dialogo */
		socket.emit(
			'msgParaCliente', 
			{
				apelido : data.apelido, 
				mensagem : data.mensagem
			});
		
		socket.broadcast.emit(
			'msgParaCliente', 
			{
				apelido : data.apelido, 
				mensagem : data.mensagem
		});

		/* participantes */
		if(parseInt(data.apelido_atualizados_nos_clientes) == 0){
			socket.emit('participantesParaCliente', {apelido : data.apelido});
		
			socket.broadcast.emit('participantesParaCliente', {apelido : data.apelido});	
		}
	});
});
