/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import eventData from "../data";

// TODO input code should be send to server to compare for safe
const PROMOTION = { code: "ABC", discount: 0.12 };

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [currentTickets, setCurrentTickets] = useState(eventData);

  useEffect(() => {
    setCurrentTickets(
      currentTickets.map((e) => ({
        ...e,
        tickets: e.tickets.map((t) => ({ ...t, qty: 0, sumCost: 0 })),
      }))
    );
  }, []);

  // TODO title should be change to event ID in future
  function updateQty(title, id, qty, unit) {
    const convert = fromJS(currentTickets);
    const indexEvent = currentTickets.findIndex((i) => i.title === title);
    const indexTicket = currentTickets[indexEvent].tickets.findIndex(
      (i) => i.id === id
    );

    const update = convert
      .setIn([indexEvent, "tickets", indexTicket, "qty"], qty)
      .setIn([indexEvent, "tickets", indexTicket, "sumCost"], qty * unit)
      .toJS();
    setCurrentTickets(update);
  }

  function applyPromo(title, userInput) {
    const convert = fromJS(currentTickets);
    const indexEvent = currentTickets.findIndex((i) => i.title === title);

    if (userInput === PROMOTION.code) {
      const update = convert
        .setIn([indexEvent, "discount"], PROMOTION.discount)
        .toJS();
      setCurrentTickets(update);
      return PROMOTION.discount;
    }
    return false;
  }

  function removeTicket(title, id) {
    const convert = fromJS(currentTickets);
    const indexEvent = currentTickets.findIndex((i) => i.title === title);
    const indexTicket = currentTickets[indexEvent].tickets.findIndex(
      (i) => i.id === id
    );

    const update = convert
      .setIn([indexEvent, "tickets", indexTicket, "qty"], 0)
      .setIn([indexEvent, "tickets", indexTicket, "sumCost"], 0)
      .toJS();
    setCurrentTickets(update);
  }

  const value = {
    currentTickets,
    updateQty,
    applyPromo,
    removeTicket,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
