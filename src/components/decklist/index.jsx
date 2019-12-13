import _ from "lodash";
import React from "react";
import getCard from "../../shared/getCard";
import { cardType } from "../../shared/cardTypes";
import css from "./decklist.css";

import CardTile from "../card-tile";

function compareQuantity(a, b) {
  if (b.quantity - a.quantity < 0) return -1;
  if (b.quantity - a.quantity > 0) return 1;
  return 0;
}

function Separator(props) {
  const { children } = props;
  return <div className={css["card-tile-separator"]}>{children}</div>;
}

function getDeckComponents(deck, setHoverCardCallback) {
  //console.log(deck);
  const components = [];
  if (deck.commandZoneGRPIds && deck.commandZoneGRPIds.length > 0) {
    //
    components.push(<Separator key="sep_commander">Commander</Separator>);

    deck.commandZoneGRPIds.forEach((id, index) => {
      if (index % 2 == 0) {
        components.push(
          <CardTile
            grpId={id}
            key={"commandercardtile" + index + "_" + card.id}
            quantity={1}
            setHoverCardCallback={setHoverCardCallback}
          />
        );
      }
    });
  }

  // draw maindeck grouped by cardType
  const cardsByGroup = _(deck.mainDeck)
    .map(card => ({ data: getCard(card.id), ...card }))
    .map(card => ({ dfc: getCard(card.data.dfcId), ...card }))
    .filter(card => card.data.type)
    .groupBy(card => {
      const type = cardType(card.data);
      switch (type) {
        case "Creature":
          return "Creatures";
        case "Planeswalker":
          return "Planeswalkers";
        case "Instant":
        case "Sorcery":
          return "Spells";
        case "Enchantment":
          return "Enchantments";
        case "Artifact":
          return "Artifacts";
        case "Land":
        case "Basic Land":
          return "Lands";
        default:
          throw new Error(`Unexpected card type: ${type}`);
      }
    })
    .value();

  _([
    "Creatures",
    "Planeswalkers",
    "Spells",
    "Enchantments",
    "Artifacts",
    "Lands"
  ])
    .filter(group => !_.isEmpty(cardsByGroup[group]))
    .forEach(group => {
      // draw a separator for the group
      const cards = cardsByGroup[group];
      const count = _.sumBy(cards, "quantity");
      components.push(<Separator key={'sepm_'+group}>{`${group} (${count})`}</Separator>);

      // draw the cards
      _(cards)
        .filter(card => card.quantity > 0)
        .orderBy(["data.cmc", "data.name"])
        .forEach((card, index) => {
          components.push(
            <CardTile
              grpId={card.id}
              cardData={card.data}
              dfcData={card.dfc}
              key={"mainboardcardtile" + index + "_" + card.id}
              quantity={card.quantity}
              setHoverCardCallback={setHoverCardCallback}
            />
          );
        });
    });

  const sideboardSize = _.sumBy(deck.sideboard, "quantity");
  if (sideboardSize) {
    // draw a separator for the sideboard
    components.push(<Separator key="sep_side">{`Sideboard (${sideboardSize})`}</Separator>);

    // draw the cards
    _(deck.sideboard)
      .filter(card => card.quantity > 0)
      .map(card => ({ data: getCard(card.id), ...card }))
      .map(card => ({ dfc: getCard(card.data.dfcId), ...card }))
      .orderBy(["data.cmc", "data.name"])
      .forEach((card, index) => {
        components.push(
          <CardTile
            grpId={card.id}
            cardData={card.data}
            dfcData={card.dfc}
            key={"sideboardcardtile" + index + "_" + card.id}
            quantity={card.quantity}
            setHoverCardCallback={setHoverCardCallback}
          />
        );
      });
  }

  return components;
}

export default function DeckList(props) {
  const { deck, setHoverCardCallback = () => {} } = props;
  if (!deck) return <></>;

  const renderComponents = getDeckComponents(deck, setHoverCardCallback);
  return <div className="decklist">{renderComponents}</div>;
}
