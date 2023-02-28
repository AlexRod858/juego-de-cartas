import React from "react";
import jotas from "../imgs/carta1.png";
import damas from "../imgs/carta2.png";
import reyes from "../imgs/carta3.png";
import dorso from "../imgs/dorso.JPG";

export default class Carta extends React.Component {

    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {

        let estado;
        if (this.props.estado === "bocabajo") {
            estado = 'bocarriba';
        } else if (this.props.estado === "bocarriba") {
            estado = 'bocabajo';
        }

        this.props.handleOnClickCard(this.props.id, estado);
    }

    crearCarta(carta) {
        let card = '';

        if (this.props.estado === "bocabajo") {
            card = <img className="img-fluid" src={dorso} alt=''  onClick={this.handleOnClick} />
        } else if (this.props.estado === "bocarriba") {
            card = <img className="img-fluid" src={carta} alt='' onClick={this.handleOnClick} />
        } else {
            card = <img className="img-fluid" src={carta} alt=''  />
        }
        return card;
    }

    render() {
        let carta = '';

        if (this.props.number === 0) {
            carta = this.crearCarta(jotas);

        } else if (this.props.number === 1) {
            carta = this.crearCarta(damas);

        } else {
            carta = this.crearCarta(reyes);
        }

        return (
            <div>
                {carta}
            </div >
        )
    }
}