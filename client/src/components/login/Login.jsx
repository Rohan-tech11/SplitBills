import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Typography, Grid, Box } from "@mui/material";
// hooks
import useResponsive from "../../theme/hooks/useResponsive";
import LoginForm from "./LoginForm";
import configData from "../../config.json";
import backgroundImage from "../../assets/loginBackground.jpg";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.15,
  },
}));
const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const AppContentStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 4),
  textAlign: "center",
}));

export default function Login() {
  const smUp = useResponsive("up", "sm");

  return (
    <>
      <RootStyle>
        <HeaderStyle>
          <Box />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {""}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <AppContentStyle>
                <Typography variant="h2" color="#CE5A67">
                  Share.Split.Simple
                </Typography>
                <Typography variant="h4" color="#3f72af" gutterBottom>
                  {/* "#3f72af" */}
                  Welcome to Ease Split!
                </Typography>
                <Typography variant="body1" color="45474B">
                  Effortlessly manage shared expenses with friends, roommates,
                  or family members. Say goodbye to the hassle of splitting
                  bills and tracking who owes what. With Ease Split, you can
                  easily organize, track, and settle expenses in just a few
                  taps. Whether it's splitting rent, groceries, or utilities,
                  we've got you covered. Join the thousands already experiencing
                  the convenience of seamless expense management!
                </Typography>
              </AppContentStyle>
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4" color="#3f72af" gutterBottom>
                  Sign in!
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                  Enter your details below.
                </Typography>
                <LoginForm />

                {!smUp && (
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don’t have an account?{" "}
                    <Link
                      variant="subtitle2"
                      component={RouterLink}
                      to="/register"
                    >
                      Get started
                    </Link>
                  </Typography>
                )}
              </Box>
            </ContentStyle>
          </Grid>
        </Grid>
      </RootStyle>
    </>
  );
}
