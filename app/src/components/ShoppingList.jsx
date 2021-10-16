/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";

const fabStyle = {
  position: "fixed",
  bottom: 24,
  right: 24,
};

export default function ShoppingList({ listOfTickets }) {
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

  const list = () => (
    <Box sx={{ width: 300 }} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemText primary="Your tickets" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Total: 99999" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="check out" />
        </ListItem>
        <Divider />
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <>
        <Fab onClick={toggleDrawer(true)} sx={fabStyle}>
          <ShoppingCartIcon />
        </Fab>
        <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </>
    </div>
  );
}

ShoppingList.propTypes = {
  listOfTickets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      selectedTicket: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          unit: PropTypes.number,
          qty: PropTypes.number,
        })
      ),
    })
  ).isRequired,
};
