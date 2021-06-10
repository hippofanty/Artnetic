import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Divider } from "@material-ui/core";
import { EditProfileForm } from "./EditProfileForm";
import { UploadAvatar } from "./UploadAvatar";
import {Subscribe} from './Subscribe'
import { EditPassword } from "./EditPassword";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {

    fontFamily: `'Montserrat', sans-serif`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}

      >
        <Tab label="Edit profile" {...a11yProps(0)} className={classes.tab} />
        <Tab label="Profile photo" {...a11yProps(1)} className={classes.tab}  />
        <Tab label="Change password" {...a11yProps(2)}  className={classes.tab} />
        <Tab label="Email preferences" {...a11yProps(2)}  className={classes.tab} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Container style={{ fontFamily: `'Montserrat', sans-serif`}}>
          PROFILE
          <Divider />
          <EditProfileForm />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container  style={{ fontFamily: `'Montserrat', sans-serif`}}>
          {/* PROFILE PHOTO */}
          <UploadAvatar />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container  style={{ fontFamily: `'Montserrat', sans-serif`}}>
          CHANGE PASSWORD
          <Divider />
          <EditPassword />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Container  style={{ fontFamily: `'Montserrat', sans-serif`}}>
          SUBSCRIBE TO
          <Divider />
          <Subscribe />
        </Container>
      </TabPanel>
    </div>
  );
}
