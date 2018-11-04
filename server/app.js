var WebSocketServer = require('uws').Server;
var wss = new WebSocketServer({ port: 3000 });

var Jugador = require('./src/entidades/jugador');

let conexiones = 1;

wss.on('connection', function (ws) {
    // Hay que poder identificar la conexión más adelante
    ws.id = conexiones++;
    ws.jugador = new Jugador(ws.id);

    console.log(`[${ws.id}] conexión iniciada.`);
    broadcast(ws.jugador, ws.id);

    ws.on('message', function (data) {
        var buffer = Buffer.from(new Uint8Array(data));
        var cadenaBuffer = buffer.toString();

        switch (cadenaBuffer.charAt(0)) {
            case 'M': // Cadena de movimiento
                ws.jugador.mover(true);
                ws.jugador.update();
                broadcast(ws.jugador, ws.id);
        }
    });

    ws.on('close', function () {
        console.log(`[${ws.id}] se desconecta.`);
    });
});

// setInterval(() => {
//     // Actualizar y enviar a todos los jugadores

//     // Actualizamos la posición de los jugadores
//     var _NClientes = wss.clients.length;
//     for (let i = 0; i < _NClientes; i++) {
//         const cliente = wss.clients[i];
//         cliente.jugador.update();
//     }
//     broadcast();
// }, 20);

/**
 * Enviar un mensaje a todo el servidor, pudiendo ponerle un jugador al cual evitar
 * @param {*} mensaje 
 * @param {*} idJugadorEvitar 
 */
const broadcast = function (mensaje, idJugadorEvitar = null) {
    // Actualizamos la posición de los jugadores
    wss.clients.forEach(function each(client) {
        if (client.id != idJugadorEvitar) {
            client.send(mensaje);
        }
    });
    console.log("Enviando mensaje");
}