import { Link as RouterLink } from "react-router-dom";

// @mui
import { styled } from "@mui/material/styles";
import { Link, Typography, Grid, Box } from "@mui/material";

// hooks
import useResponsive from "../../theme/hooks/useResponsive";

import RegisterForm from "./RegisterForm";
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
    transform: "scaleX(-1)",
  },
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

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const AppContentStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 4),
  textAlign: "center",
}));

export default function Register() {
  const smUp = useResponsive("up", "sm");
  return (
    <RootStyle>
      <HeaderStyle>
        <Box />
        {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Already have an account? {""}
            <Link variant="subtitle2" component={RouterLink} to="/">
              Login
            </Link>
          </Typography>
        )}
      </HeaderStyle>

      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <ContentStyle>
            <Typography
              variant="h4"
              color="#3f72af"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Get started Sign Up!
            </Typography>

            <RegisterForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account? {""}
                <Link variant="subtitle2" component={RouterLink} to="/">
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Grid>

        <Grid item xs={12} md={6}>
          <ContentStyle>
            <AppContentStyle>
              <Typography variant="h2" color="#CE5A67">
                Share.Split.Simple
              </Typography>
              <Typography variant="h3" color="#CE5A67" gutterBottom>
                Register for Ease Split!
              </Typography>
              <Typography variant="body1" color="#45474B" gutterBottom>
                Welcome to Ease Split, the ultimate solution for managing shared
                expenses effortlessly! With Ease Split, you can easily split
                bills, track expenses, and settle debts with friends, family, or
                roommates hassle-free. Say goodbye to the complexities of shared
                finances and hello to seamless collaboration!
              </Typography>
              <Typography variant="h6" color="#3f72af" sx={{ mt: 2 }}>
                Key Features:
              </Typography>
              <Typography variant="body1" align="left" sx={{ mt: 1 }}>
                <ul
                  style={{
                    textAlign: "center",
                    listStylePosition: "inside",
                    paddingInlineStart: 0,
                  }}
                >
                  <li>Simplify Shared Expenses</li>
                  <li>Customizable Groups</li>
                  <li>Expense Insights</li>
                </ul>{" "}
              </Typography>
            </AppContentStyle>
          </ContentStyle>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
