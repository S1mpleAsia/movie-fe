import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Avatar,
  Divider,
  Icon,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import menuConfigs from "../../configs/menu.config";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";
import { LogoutOutlined } from "@mui/icons-material";
import { getRandomColor, getShortenName } from "../../utils/preference";

const UserMenu = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const toggleMenu = (e: React.MouseEvent) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Tooltip title="Account settings">
            <IconButton
              onClick={toggleMenu}
              size="medium"
              aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: `${getRandomColor()}`,
                }}
              >
                {getShortenName(user.fullName)}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            id="account-menu"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: "5px" } }}
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

            <Divider />

            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => {
                dispatch(setUser(null));
                navigate(0);
              }}
            >
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">Sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
