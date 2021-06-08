import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Divider } from "@material-ui/core";
import { EditProfileForm } from "./EditProfileForm";

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
        style={{ justifyContent: "flex-start" }}
      >
        <Tab label="Edit profile" {...a11yProps(0)} />
        <Tab label="Profile photo" {...a11yProps(1)} />
        <Tab label="Change password" {...a11yProps(2)} />
        <Tab label="Email preferences" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Container>PROFILE<Divider /></Container>
        <EditProfileForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        PROFILE PHOTO
      </TabPanel>
      <TabPanel value={value} index={2}>
        CHANGE PASSWORD
      </TabPanel>
      <TabPanel value={value} index={3}>
        SUBSCRIBE TO
      </TabPanel>
    </div>
  );
}
