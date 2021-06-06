import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import { Information } from "./Information/Information";
import { Button } from "@material-ui/core";
import { AddWorkForm } from "../AddWorkForm/AddWorkForm";
import Icon from "@material-ui/core/Icon";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { MyWorks } from "../MyWorks/MyWorks";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 800,
    minWidth: 600,
  },

  tabs: {
    width: 600,
  },

  avatar: {
    width: 225,
    padding: 5,
    display: "flex",
    justifyContent: "space-around",
  },
}));

// Экспорт компонента
export default function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Информация профиля" {...a11yProps(0)} />
          <Tab label="Мои заказы" {...a11yProps(1)} />
          <Tab label="Мои произведения" {...a11yProps(2)} />
          <Tab label="Арендовано у меня" {...a11yProps(3)} />
          <Tab label="Сообщения" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Paper className={classes.avatar} variant="outlined" square>
            <img
              src="https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg"
              alt=""
            />
          </Paper>
          <Information />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Мои заказы
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {!showForm ? (
            <Button
              onClick={() => setShowForm(!showForm)}
              style={{ marginBottom: "30px" }}
            >
              <Icon style={{ fontSize: "70px" }}>add_circle</Icon>
            </Button>
          ) : (
            <Button
              onClick={() => setShowForm(!showForm)}
              style={{ marginBottom: "30px" }}
            >
              <CancelPresentationIcon style={{ fontSize: "30px" }}>
                add_circle
              </CancelPresentationIcon>
            </Button>
          )}
          <br></br>
          {showForm && <AddWorkForm setShowForm={setShowForm} />}
          <MyWorks />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Арендовано у меня
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Сообщения
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
