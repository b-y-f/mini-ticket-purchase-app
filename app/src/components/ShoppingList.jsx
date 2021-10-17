/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Collapse,
  Fab,
  IconButton,
  ListItemButton,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { useCart } from "../contexts/Cart";

const fabStyle = {
  position: "fixed",
  bottom: 24,
  right: 24,
};

export default function ShoppingList() {
  const { selectedTickets } = useCart();
  console.log("selectedTickets", selectedTickets);

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

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const list = () => (
    <Box sx={{ width: 320 }} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemText primary="Your tickets" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Total: 232" />
        </ListItem>
        {/* TODO */}
        <ListItem onClick={() => handleClick} button>
          <ListItemText primary="check out" />
        </ListItem>
        <Divider />

        <>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary="{title}"
              secondary="$ totalCostByTitle(title)"
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ pl: 4 }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <ClearIcon color="error" fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemText primary="{t.type}" secondary="dfgdgfdg" />
              </ListItem>
            </List>
          </Collapse>
        </>
      </List>
    </Box>
  );

  return (
    <div>
      <>
        <Fab variant="extended" onClick={toggleDrawer(true)} sx={fabStyle}>
          <ShoppingCartIcon />$ 232.23
        </Fab>
        <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </>
    </div>
  );
}

// ShoppingList.propTypes = {
//   listOfTickets: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       selectedTicket: PropTypes.arrayOf(
//         PropTypes.shape({
//           type: PropTypes.string,
//           unit: PropTypes.number,
//           qty: PropTypes.number,
//         })
//       ),
//     })
//   ).isRequired,
// };
