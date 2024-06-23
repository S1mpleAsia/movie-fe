import React, { useState } from "react";
import { ScrollAppbar } from "./Topbar";
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AdminTopbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { appState } = useSelector((state: RootState) => state.appState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const setSidebarFunc = (open: boolean) => setSidebarOpen(open);

  return (
    <>
      <AdminSidebar open={sidebarOpen} toggleSidebar={setSidebarFunc} />

      <ScrollAppbar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing="1" alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <Menu />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            {/* Main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>

              {menuConfigs.admin.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.constrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
            </Box>
            {/* Main menu */}

            {/* User menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setUser(null));
                  navigate("/sign-in");
                }}
              >
                Log out
              </Button>
            </Stack>
            {/* User menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppbar>
    </>
  );
};

export default AdminTopbar;
