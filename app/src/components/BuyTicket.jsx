/* eslint-disable no-console */
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
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

const GST_RATE = 0.15;

const ticketData = [
  {
    name: "adult",
    label: "Adult",
    desc: "age > 20, vaccinated person",
    unit: 29.99,
  },
  {
    name: "kid",
    label: "Kid",
    desc: "age < 14, A+ in school",
    unit: 14.99,
  },
  {
    name: "family",
    label: "Family & DOG & Cat",
    desc: "At most 5 people",
    unit: 99.84,
  },
];

export default function BuyTicket() {
  const [quantity, setQuantity] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  function sumValues(obj) {
    return obj ? Object.values(obj).reduce((a, b) => a + b) : 0;
  }
  useEffect(() => {
    // console.log(subtotal);
    setSubtotal(sumValues(quantity));
  }, [quantity]);

  function handleQtyChange(name, qty, unit) {
    return setQuantity({ ...quantity, [name]: qty * unit });
  }

  function ccyFormat(num) {
    return num && `${num.toFixed(2)}`;
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
            {ticketData.map(({ name, label, desc, unit }) => (
              <TableRow
                key={name}
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
                        handleQtyChange(name, target.value, unit)
                      }
                      defaultValue={0}
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
                <TableCell align="right">
                  {quantity && ccyFormat(quantity[name])}
                </TableCell>
              </TableRow>
            ))}

            {subtotal !== 0 && (
              <TableRow selected>
                <TableCell colSpan={2} />
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total (inc GST)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {ccyFormat(subtotal * (1 + GST_RATE))}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {subtotal !== 0 && (
        <Stack
          sx={{ m: 2 }}
          direction="row"
          spacing={3}
          justifyContent="center"
        >
          <Button variant="contained">Pay Now</Button>
          <Button variant="contained">Keep browse</Button>
        </Stack>
      )}
    </>
  );
}
