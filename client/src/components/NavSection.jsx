import { useState } from "react";
import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import Iconify from "./Iconify";

const ListItemStyle = (props) => <ListItemButton disableGutters {...props} />;

const ListItemIconStyle = (props) => (
  <ListItemIcon>{props.icon && props.icon}</ListItemIcon>
);

const activeRootStyle = {
  color: "primary.main",
  fontWeight: "fontWeightMedium",
};

const activeSubStyle = {
  color: "text.primary",
  fontWeight: "fontWeightMedium",
};

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(path);
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => setOpen((prev) => !prev);

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{ ...(isActiveRoot && activeRootStyle) }}
        >
          <ListItemIconStyle icon={icon} />
          <ListItemText disableTypography primary={title} />
          {info && info}
        </ListItemStyle>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => (
              <ListItemStyle
                key={item.title}
                component={RouterLink}
                to={item.path}
                sx={{ ...(active(item.path) && activeSubStyle) }}
              >
                <ListItemIconStyle icon={item.icon} />
                <ListItemText disableTypography primary={item.title} />
              </ListItemStyle>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{ ...(isActiveRoot && activeRootStyle) }}
    >
      <ListItemIconStyle icon={icon} />
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
