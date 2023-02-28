import React from "react";
import Card from "./Carta";

export  class Tablero extends React.Component {
    state = {
        cards: []
    }

    constructor(props) {
        super(props);
        this.generadorTablero();

        //binds
        this.handleOnClickCard = this.handleOnClickCard.bind(this);
        this.verifyPareja = this.verifyPareja.bind(this);

    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            
            // Seleccionar un elemento sin mezclar...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // E intercambiarlo con el elemento actual
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    generadorTablero() {
        let i, j = 0;

        for (i = 0; i < 6; i++) {
            this.state.cards.push({ id: i, number: j, estado: "bocabajo" })
            i++;
            this.state.cards.push({ id: i, number: j, estado: "bocabajo" })
            j++;
        }

        this.setState({
            cards: this.shuffle(this.state.cards),
        });
    }
    verifyPareja() {

        let cartaUp = this.state.cards.filter(c => c.estado === "bocarriba");

        if (cartaUp.length === 2) {
            if (cartaUp[0].number === cartaUp[1].number) {
                let resolveCards = this.state.cards.map(c => {
                    if (c.estado === "bocarriba") {
                        c.estado = "resuelta";
                    }
                    return c;
                });

                this.setState({
                    cards: resolveCards,
                });

            } else {

                setTimeout(() => {
                    let bocabajoCards = this.state.cards.map(c => {
                        if (c.estado === "bocarriba") {
                            c.estado = "bocabajo";
                        }
                        return c;
                    });
                    this.setState({
                        cards: bocabajoCards,
                    })
                }, 1000);

            }
        }
    }
    handleOnClickCard(id, stateCard) {
        let cardUp = this.state.cards.filter(c => c.estado === "bocarriba");
        if (cardUp.length < 2) {
            let tempCards = this.state.cards.map(c => {
                if (c.id === id) {
                    c.estado = stateCard;
                }
                return c;
            });

            this.setState({
                cards: tempCards,
            });

            if (cardUp.length === 1) {
                this.verifyPareja();
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.cards.map(c => {
                        return (
                            <div key={c.id.toString()} className="col">
                                <Card key={c.id.toString()} id={c.id} number={c.number} estado={c.estado} handleOnClickCard={this.handleOnClickCard}></Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}