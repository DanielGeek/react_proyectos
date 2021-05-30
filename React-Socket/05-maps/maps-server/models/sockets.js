const Markers = require("./markers");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.markers = new Markers();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('Client Connected!');
            // TODO: markers-actives

            // TODO: marker-new

            // TODO: marker-update


        });
    }


}


module.exports = Sockets;