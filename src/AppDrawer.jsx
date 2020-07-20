import React from 'react';
import clsx from 'clsx';
import { useOktaAuth } from "@okta/okta-react";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from "@material-ui/icons/Search";
import EventCard from "./components/EventCard";
import {CssBaseline, Drawer, fade, makeStyles, useTheme, AppBar, Toolbar,
        List, Divider, IconButton, ListItem, ListItemText, Button, InputBase} from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
   root: {
     display: 'flex',
   },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: { display: "block" },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'],
    {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'],
    {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  shiftRight: {
    position: "fixed",
    display: "flex",
    marginRight: "2rem",
    right:0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": { backgroundColor: fade(theme.palette.common.white, 0.25) },
    marginLeft: 0,
    marginRight: "2rem",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const { authState, authService } = useOktaAuth();
  const logout = async () => authService.logout("/");
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {setOpen(true);};
  const handleDrawerClose = () => {setOpen(false);};
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: open})}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <img src='/images/Ping_Catcher.png' className='logo' alt='application' />
            <div className={classes.shiftRight}>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{root: classes.inputRoot,input: classes.inputInput}}
              inputProps={{ 'aria-label': 'search' }}/>
            </div>
          {!authState.isPending && authState.isAuthenticated && (<Button color="inherit" as="a" onClick={logout} classes={{}}>Logout</Button>)}
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{paper: classes.drawerPaper,}}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Subscribed Channels', 'Pings', 'Messages'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open})}>
        <div className={classes.drawerHeader} />
            <EventCard/>
      </main>
    </div>
  );
}