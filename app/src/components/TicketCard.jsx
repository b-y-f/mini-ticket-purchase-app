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
import PropTypes from "prop-types";
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

export default function TicketCard() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="Fri, 15 Oct, 9:00 am – Sun, 17 Oct, 5:00 am"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Stack direction="row">
          <LocationOnIcon color="action" />
          <Typography variant="body2" color="text.main">
            Mystery Creek Events Centre 125 Mystery Creek Rd, Ohaupo, Hamilton
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
            <Typography>
              NZMCA Motorhome, Caravan & Leisure Show - Hamilton Come and see
              what we have on show in Hamilton! NZMCA Motorhome, Caravan &
              Leisure Show in Hamilton specialises in providing a complete
              experience for all visitors. All industry leaders, plus a huge
              array of industry related accessory providers will be present,
              offering a huge selection of everything imaginable to make your
              outdoor lifestyle complete, or simply offer expert advice. See all
              the latest products, talk to the experts, and be in to win
              fantastic prizes over the three days! As part of our commitment to
              long term sustainability, we will no longer be providing
              complimentary plastic bags on entry to the show. We suggest
              bringing your own reusable bags and making use of our Shop & Drop
              service to store purchases while you are at the show.
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BuyTicket />
          </TabPanel>
        </CardContent>
      </Collapse>
    </Card>
  );
}
