const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            // Emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            // votar por la banda
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id);
                // Emitir ha todos los clientes conectados, las bandas actualizadas
                this.io.emit('current-bands', this.bandList.getBands());
            })

        });
    }


}


module.exports = Sockets;