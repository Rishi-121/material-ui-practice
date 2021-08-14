import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import {
  PhotoCamera,
  HomeRounded,
  TableChartRounded,
  ListAltRounded,
} from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    fontSize: 14,
    textTransform: "none",
    marginRight: theme.spacing(2)
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <PhotoCamera className={classes.icon} />
          <Typography variant="h6" color="inherit" className={classes.title}>
            Album layout
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            className={classes.button}
            startIcon={<HomeRounded />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/table"
            className={classes.button}
            startIcon={<TableChartRounded />}
          >
            Table
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/form"
            className={classes.button}
            startIcon={<ListAltRounded />}
          >
            Form
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(Navbar);
