/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes, { string, number } from "prop-types";
import { useCart } from "../contexts/Cart";
import ccyFormat from "../utl/convert";

export default function BuyTicket({ ticketData, eventTitle }) {
  const { updateQty, applyPromo } = useCart();

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(ticketData.reduce((a, b) => a + b.sumCost, 0));
  }, [ticketData]);

  const [promoState, setPromoState] = useState({
    input: "",
    isPromoted: false,
    discountAmount: 0,
  });

  function handleQtyChange(id, qty, unit) {
    updateQty(eventTitle, id, qty, unit);
  }

  function checkPromoCode() {
    if (applyPromo(eventTitle, promoState.input)) {
      return setPromoState({
        input: "",
        discountAmount: 999999,
        isPromoted: true,
      });
    }
    setPromoState({ ...promoState, input: "" });
    return alert("wrong code");
  }

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tickets</TableCell>
              <TableCell align="right">Price($)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Sum($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketData.map(({ id, label, desc, unit, sumCost, qty }) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Tooltip title={desc} arrow>
                  <TableCell component="th" scope="row">
                    <Typography
                      sx={{ textDecoration: "underline" }}
                      variant="subtitle2"
                    >
                      {label}
                    </Typography>
                  </TableCell>
                </Tooltip>
                <TableCell align="right">{unit}</TableCell>
                <TableCell align="right">
                  <FormControl fullWidth>
                    <Select
                      onChange={({ target }) =>
                        handleQtyChange(id, target.value, unit)
                      }
                      value={qty}
                      variant="standard"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">{ccyFormat(sumCost)}</TableCell>
              </TableRow>
            ))}

            {subtotal !== 0 && (
              <>
                {promoState.isPromoted && (
                  <TableRow selected>
                    <TableCell colSpan={2} />
                    <TableCell>Discount 8%</TableCell>
                    <TableCell align="right">12</TableCell>
                  </TableRow>
                )}
                <TableRow selected>
                  <TableCell colSpan={2} />
                  <TableCell sx={{ fontWeight: "bold" }}>Sub Total</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    {ccyFormat(subtotal)}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {subtotal !== 0 && (
        <Stack
          sx={{ mt: 3 }}
          direction="row"
          spacing={3}
          justifyContent="center"
        >
          <TextField
            size="small"
            label="PROMO CODE"
            value={promoState.input}
            onChange={({ target }) =>
              setPromoState({ ...promoState, input: target.value })
            }
          />
          <Button
            onClick={() => checkPromoCode(eventTitle, promoState.input)}
            variant="contained"
          >
            apply
          </Button>
        </Stack>
      )}
    </>
  );
}

BuyTicket.propTypes = {
  ticketData: PropTypes.arrayOf(
    PropTypes.shape({
      id: string,
      type: string,
      label: string,
      desc: string,
      unit: number,
    })
  ).isRequired,
  eventTitle: PropTypes.string.isRequired,
};
