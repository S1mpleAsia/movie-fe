import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import menuConfigs from "../../configs/menu.config";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";
import { LogoutOutlined } from "@mui/icons-material";

const UserMenu = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const toggleMenu = (e: React.MouseEvent) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            "Andy"
          </Typography>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
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
                ></ListItemText>
              </ListItemButton>
            ))}

            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
            </ListItemButton>

            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">Sign out</Typography>
              }
            />
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
