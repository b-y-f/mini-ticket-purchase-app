import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fab, IconButton, ListItemButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ClearIcon from "@mui/icons-material/Clear";
import { useCart } from "../contexts/Cart";
import ccyFormat from "../utl/convert";

const fabStyle = {
  position: "fixed",
  bottom: 24,
  right: 24,
};

export default function ShoppingList() {
  const { currentTickets, removeTicket } = useCart();
  // console.log("currentTickets", currentTickets);

  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  function getDiscount(tickets, discount) {
    if (discount) {
      return tickets.reduce((a, b) => a + b.sumCost, 0) * discount;
    }
    return "";
  }

  function getSubtotal(tickets) {
    return tickets.reduce((a, b) => a + b.sumCost, 0);
  }

  function totalDiscount() {
    const whichOneDiscount = currentTickets.filter((i) => i.discount);
    let discount = 0;
    if (whichOneDiscount) {
      discount = whichOneDiscount.reduce(
        (i, j) => i + j.tickets.reduce((a, b) => a + b.sumCost * j.discount, 0),
        0
      );
    }
    return discount;
  }

  function getTotalCost() {
    const total = currentTickets.reduce(
      (a, b) => a + getSubtotal(b.tickets),
      0
    );

    return total;
  }

  const discountForTicket = (tickets, discount) =>
    discount
      ? `$ ${ccyFormat(getSubtotal(tickets))} - ${ccyFormat(
          getDiscount(tickets, discount)
        )}`
      : `$ ${ccyFormat(getSubtotal(tickets))}`;
  const list = () => (
    <Box sx={{ width: 320 }}>
      <List>
        <ListItem>
          <ListItemText primary="Your tickets" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={`Total: ${ccyFormat(getTotalCost())}`}
            secondary={`you saved: ${ccyFormat(totalDiscount())}`}
          />
        </ListItem>
        <ListItem onClick={() => alert("TODO")} button>
          <ListItemText primary="check out" />
        </ListItem>
        <Divider />
        {currentTickets.map(
          ({ title, tickets, discount }) =>
            getSubtotal(tickets) !== 0 && (
              <div key={title}>
                <ListItemButton onClick={null}>
                  <ListItemText
                    primary={title}
                    secondary={discountForTicket(tickets, discount)}
                  />
                </ListItemButton>
                <List component="div" disablePadding>
                  {tickets.map(
                    ({ label, id, qty, unit }) =>
                      qty !== 0 && (
                        <ListItem
                          key={id}
                          sx={{ pl: 4 }}
                          secondaryAction={
                            <IconButton
                              onClick={() => removeTicket(title, id)}
                              edge="end"
                              aria-label="delete"
                            >
                              <ClearIcon color="error" fontSize="small" />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={label}
                            secondary={`${qty} x ${unit}`}
                          />
                        </ListItem>
                      )
                  )}
                </List>
              </div>
            )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <>
        {getTotalCost() !== 0 ? (
          <Fab variant="extended" onClick={toggleDrawer(true)} sx={fabStyle}>
            <ShoppingCartIcon />
            {`$ ${ccyFormat(getTotalCost())}`}
          </Fab>
        ) : (
          <Fab onClick={toggleDrawer(true)} sx={fabStyle}>
            <ShoppingCartIcon />
          </Fab>
        )}

        <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </>
    </div>
  );
}
