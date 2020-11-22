import React, { Component } from 'react';
import { Grid, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import FormaSaludo from './FormaSaludo';
import MensajeSaludo from './MensajeSaludo';

export class App extends Component {
    state = {
        nombre: this.props.nombre
    };

    alOprimirBoton = e => {
        const nombre = e.target.nombre.value;
        e.preventDefault();
        if (typeof nombre === "string" && nombre.length > 0) {
            this.setState({
                nombre: e.target.nombre.value
            });
            e.target.nombre.value = "";
        }
    };

    render() {
        const { nombre } = this.state;
        const { mensaje } = this.props;
        return (
            <Grid>
                <h1>Hola {nombre}!</h1>
                <p>{mensaje}</p>
                <form onSubmit={this.alOprimirBoton}>
                    <FormGroup>
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl type="text" id="nombre" name="nombre" />
                        <br />
                        <Button type="submit">Saludar</Button>
                    </FormGroup>
                </form>
                <MensajeSaludo />
                <FormaSaludo />
            </Grid>
        );
    }
}

App.defaultProps = {
    nombre: "React",
    mensaje: "Mensaje por default"
};

export default App;