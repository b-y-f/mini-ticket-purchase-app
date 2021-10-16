/* eslint-disable no-console */
import { Container, Typography } from "@mui/material";
import React from "react";
import ShoppingList from "./ShoppingList";
import TicketCard from "./TicketCard";

const fakeEventsData = [
  {
    title: "Shrimp and Chorizo Paella",
    eventDate: "Fri, 15 Oct, 9:00 am – Sun, 17 Oct, 5:00 am",
    desc: "NZMCA Motorhome, Caravan & Leisure Show - Hamilton Come and see what we have on show in Hamilton! NZMCA Motorhome, CaravanLeisure Show in Hamilton specialises in providing a complete         experience for all visitors. All industry leaders, plus a huge array of industry related accessory providers will be present,offering a huge selection of everything imaginable to make your.",
    location:
      "Mystery Creek Events Centre 125 Mystery Creek Rd, Ohaupo, Hamilton",
    photoURL: "https://mui.com/static/images/cards/paella.jpg",
    ticketData: [
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
    ],
  },
  {
    title: "Some event two",
    eventDate: "Fri, 15 Oct, 9:00 am – Sun, 17 Oct, 5:00 am",
    desc: "The React Context API is stateless by default and doesn’t provide a dedicated method to update the context value from consumer components.But this can be easily implemented by integrating a state management mechanism (like useState() or useReducer() hooks), and providing an update function right in the context next to the value itself.In the following example, <Application /> component uses useState() hook to manage the context value.",
    location: "Mankato University....., Hamilton",
    photoURL: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    ticketData: [
      {
        name: "student",
        label: "Student",
        desc: "Good student",
        unit: 5.99,
      },
      {
        name: "nonStudent",
        label: "Non Student",
        desc: "Some thing",
        unit: 14.99,
      },
    ],
  },
];

export default function TicketsPage() {
  return (
    <Container maxWidth="sm" style={{ marginTop: 80 }}>
      <Typography variant="h1" component="h2">
        tickets...
      </Typography>
      {fakeEventsData.map((t) => (
        <TicketCard key={t.title} data={t} />
      ))}

      <ShoppingList />
    </Container>
  );
}
