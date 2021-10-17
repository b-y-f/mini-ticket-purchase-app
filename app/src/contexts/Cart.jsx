/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fromJS, setIn } from "immutable";
import eventData from "../data";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [currentTickets, setCurrentTickets] = useState(eventData);

  useEffect(() => {
    setCurrentTickets(
      currentTickets.map((e) => ({
        ...e,
        tickets: e.tickets.map((t) => ({ ...t, qty: 0 })),
      }))
    );
  }, []);

  function updateQty(title, id, qty) {
    const convert = fromJS(currentTickets);
    const indexEvent = currentTickets.findIndex((i) => i.title === title);
    const indexTicket = currentTickets[0].tickets.findIndex((i) => i.id === id);
    const update = convert
      .setIn([indexEvent, "tickets", indexTicket, "qty"], qty)
      .toJS();
    setCurrentTickets(update);
  }

  const value = {
    currentTickets,
    updateQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
