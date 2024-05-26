import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import uiConfigs from "../../configs/ui.config";
import {
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.config";
import { Link } from "react-router-dom";

type AdminSidebarProps = {
  open: boolean;
  toggleSidebar: (open: boolean) => void;
};

const AdminSidebar = ({ open, toggleSidebar }: AdminSidebarProps) => {
  const { appState } = useSelector((state: RootState) => state.appState);

  const sidebarWidth = uiConfigs.size.sidebarWidth;

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>

      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">
          Menu
        </Typography>

        {menuConfigs.admin.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>
              <Icon component={item.icon} />
            </ListItemIcon>

            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default AdminSidebar;
