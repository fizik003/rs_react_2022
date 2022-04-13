import Layout from "components/Layout/Layout";
import React, { Component } from "react";
import { Form } from "./components/Form";
import { ICardData } from "./interfaces";

export interface ISateCreateData {
  cards: ICardData[];
}

export default class CreateData extends Component<unknown, ISateCreateData> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  getCard = (card: ICardData) => {
    this.setState((prevState) => ({ cards: [...prevState.cards, card] }));
  };

  render() {
    const { cards } = this.state;
    return (
      <Layout currentPage="Create Data">
        <Form addCard={this.getCard} />
        <div>
          {cards.map((card) => {
            return <img key={card.bornDate} src={card.photo} alt="dsd" />;
          })}
        </div>
      </Layout>
    );
  }
}
