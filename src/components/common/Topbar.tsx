import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { themeModes } from "../../configs/theme.config";
import { useDispatch } from "react-redux";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import {
  BorderBottom,
  DarkModeOutlined,
  Menu,
  WbSunnyOutlined,
} from "@mui/icons-material";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.config";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

type ScrollAppbarProps = {
  children: JSX.Element;
  window?: () => Window;
};

export const ScrollAppbar = ({ children, window }: ScrollAppbarProps) => {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "#202020"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Topbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { appState } = useSelector((state: RootState) => state.appState);
  const { themeMode } = useSelector((state: RootState) => state.themeMode);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const setSidebarFunc = (open: boolean) => setSidebarOpen(open);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={setSidebarFunc} />
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

              {menuConfigs.main.map((item, index) => (
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

              <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlined />}
                {themeMode === themeModes.light && <WbSunnyOutlined />}
              </IconButton>
            </Box>
            {/* Main menu */}

            {/* User menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/sign-in")}
                >
                  Sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
            {/* User menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppbar>
    </>
  );
};

export default Topbar;
