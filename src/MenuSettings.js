import React from "react";
import { ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core/";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { withRouter } from "react-router-dom";
import { routes } from "./routes";

export const MenuSettings = withRouter((props) => {
  return (
    <List>
      {routes.map((item, index) => (
        <ListItem
          button
          key={item.title}
          onClick={() => props.history.push(item.path)}
        >
          <ListItemIcon>
            {index % 2 === 0 ? <PeopleAltIcon /> : <MenuBookIcon />}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
});
