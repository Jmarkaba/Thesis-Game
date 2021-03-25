import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Model1 from "./Models/Model1";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navLinks = [{ title: `Model 1`, path: `/model1` }];

const Header = () => {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md" className={classes.navbarDisplayFlex}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              component={Link}
              to="/"
            >
              <Home fontSize="large" />
            </IconButton>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <ListItem button key={title} component={Link} to={path}>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Container>
        </Toolbar>
      </AppBar>
      <Route
        path="/model1"
        render={(props) => <Model1 {...props} model={1} />}
      />
    </Router>
  );
};
export default Header;
