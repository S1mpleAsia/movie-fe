import LoadingOverlay from "react-loading-overlay-ts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminTopbar from "../common/AdminTopbar";

const AdminLayout = () => {
  const { loadingOverlay } = useSelector(
    (state: RootState) => state.loadingOverlay
  );
  return (
    <LoadingOverlay
      active={loadingOverlay}
      spinner
      text="Processing..."
      className="custom-overlay"
    >
      <Box display="flex" minHeight="100vh" flexDirection="column">
        <Box display="flex">
          {/* Topbar */}
          <AdminTopbar />
          {/* Topbar */}

          {/* Main */}
          <Box
            component="main"
            flexGrow={1}
            overflow="hidden"
            minHeight="100vh"
          >
            <Outlet />
          </Box>
          {/* Main */}
        </Box>
      </Box>
    </LoadingOverlay>
  );
};

export default AdminLayout;
