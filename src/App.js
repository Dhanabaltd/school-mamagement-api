import React from 'react';
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { routes } from "./routes";
import toastr from "toastr";

import { MenuSettings } from "./MenuSettings";
import { NavBarTop } from "./NavBarTop";
import { useStyles } from "./styles";
import { Screen } from "./Screen";

import 'react-toastify/dist/ReactToastify.css';


toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

const MenuBurguer = ({ theme, onDrawerClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      <IconButton onClick={onDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
  );
};

export default function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <NavBarTop onDrawerOpen={handleDrawerOpen} open={open} />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <MenuBurguer theme={theme} onDrawerClose={handleDrawerClose} />

          <Divider />
          <MenuSettings />
        </Drawer>

        <Route exact path="/">
          <Screen />
        </Route>
        <Route path="/staffAdd" >
          <Screen label="STAFFADD" />
        </Route>
        <Route path="/staffEdit/:id" >
          <Screen label="STAFFEDIT" />
        </Route>
        <Route path="/staffView/:id" >
          <Screen label="STAFFVIEW" />
        </Route>
        <Route path="/courseAdd" >
          <Screen label="COURSEADD" />
        </Route>
        <Route path="/courseEdit/:id" >
          <Screen label="COURSEEDIT" />
        </Route>
        <Route path="/courseView/:id" >
          <Screen label="COURSEVIEW" />
        </Route>
        <Route path="/stuentAdd" >
          <Screen label="STUDENTADD" />
        </Route>
        <Route path="/studentEdit/:id" >
          <Screen label="STUDENTEDIT" />
        </Route>
        <Route path="/studentView/:id" >
          <Screen label="STUDENTVIEW" />
        </Route>
        {routes.map((item) => {
          return (
            <>
              <Route path={item.path} key={JSON.stringify(item)}>
                <Screen label={item.title.toUpperCase()} />
              </Route>

            </>
          );
        })}
        <ToastContainer />

      </div>
      
    </Router>
  );
}
