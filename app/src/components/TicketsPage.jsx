import { Container, Fab, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TicketCard from "./TicketCard";

export default function TicketsPage() {
  const fabStyle = {
    position: "fixed",
    bottom: 24,
    right: 24,
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: 80 }}>
      <Typography variant="h1" component="h2">
        tickets...
      </Typography>
      <TicketCard />
      <Fab sx={fabStyle}>
        <ShoppingCartIcon />
      </Fab>
    </Container>
  );
}
