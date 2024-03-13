import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
import configData from "../config.json";

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 180, height: 180, ...sx }}>
      <img src="/static/logo.png" alt="logo" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to={configData.DASHBOARD_URL}>{logo}</RouterLink>;
}
