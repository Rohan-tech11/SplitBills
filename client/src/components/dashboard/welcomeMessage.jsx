import { Box, Button, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import configData from "../../config.json";

export const WelcomeMessage = () => {
  return (
    <Box
      sx={{
        boxShadow: 5,
        p: 5,
        bgcolor: (theme) => theme.palette["primary"].lighter,
        color: (theme) => theme.palette["primary"].darker,
        borderRadius: 2,
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid container>
          <Grid item lg={6} md={6} xs={12}>
            <Typography variant="h5" pb={2}>
              Hello There ! welcome to Ease-Split
            </Typography>
            <Typography variant="body2" pb={2}>
              Track shared expenses effortlessly and settle balances
              conveniently with Ease-Split, your personalized solution for
              managing group expenses.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to={configData.USER_GROUPS_URL}
            >
              View Groups
            </Button>
          </Grid>
          <Grid item lg={5} md={6} xs={12}>
            <img src="/static/expensegroup.jpg" alt="dashbaord-img" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
