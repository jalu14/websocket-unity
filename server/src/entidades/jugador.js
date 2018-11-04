/**
 * @class Jugador
 */
class Jugador {
    constructor(id) {
        if (!id) return console.error("Se ha intentado crear un jugador sin proporcionar id");

        this.id = id;

        this.x = 10;
        this.y = 10;
        this.velocidad = 0;
        this.angulo = 0;

        this.nombre = "Prueba " + id;
    }

    /**
     * Mueve al jugador, tiene en cuenta el ángulo y la velocidad
     */
    update() { // TODO
        if (this.velocidad) {
            this.x++;
        }
    }

    /**
     * Actualiza la dirección en la que se moverá el jugador
     */
    mover(enMovimiento) { // TODO
        this.velocidad = enMovimiento ? 10 : 0;
    }
}

module.exports = Jugador;