/* eslint-disable no-console */
import { Container, Typography } from "@mui/material";
import React from "react";
import { useCart } from "../contexts/Cart";
import ShoppingList from "./ShoppingList";
import TicketCard from "./TicketCard";

export default function TicketsPage() {
  const { currentTickets } = useCart();

  return (
    <Container maxWidth="sm" style={{ marginTop: 80 }}>
      <Typography variant="h1" component="h2">
        tickets...
      </Typography>
      <Typography variant="subtitle2" component="h2" color="error">
        Your promo code: ABC
      </Typography>
      {currentTickets.map((t) => (
        <TicketCard key={t.title} data={t} />
      ))}

      <ShoppingList />
    </Container>
  );
}
