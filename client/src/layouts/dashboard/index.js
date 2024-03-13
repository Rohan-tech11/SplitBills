import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: 90,
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: 120,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
const PlaceholderMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: "italic",
  fontSize: "1.2rem",
}));

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    //If user logged in the page is  auto re directed to dashboard
    if (user == null) {
      window.location.href = "/";
    }
  }, []);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      <MainStyle>
        <MainStyle>
          <MainStyle>
            <PlaceholderMessage>
              Dashboard main content is under development. Please check back
              later -- Group -1
            </PlaceholderMessage>
          </MainStyle>
        </MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
