/* eslint-disable no-unused-vars */
import { React, useState } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack, Tab, Tabs, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes, { shape, string, number, object } from "prop-types";
import BuyTicket from "./BuyTicket";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TicketCard({ data }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={data.title}
        subheader="Fri, 15 Oct, 9:00 am – Sun, 17 Oct, 5:00 am"
      />
      <CardMedia
        component="img"
        height="194"
        image={data.photoURL}
        alt="Paella dish"
      />
      <CardContent>
        <Stack direction="row">
          <LocationOnIcon color="action" />
          <Typography variant="body2" color="text.main">
            {data.location}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Buy Ticket" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography>{data.desc}</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BuyTicket
              ticketData={data.tickets}
              eventTitle={data.title}
              subtotal={data.subtotal}
            />
          </TabPanel>
        </CardContent>
      </Collapse>
    </Card>
  );
}
TicketCard.propTypes = {
  data: PropTypes.shape({
    title: string,
    subtotal: number,
    photoURL: string,
    location: string,
    desc: string,
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        name: string,
        label: string,
        desc: string,
        unit: number,
      })
    ),
  }).isRequired,
};
