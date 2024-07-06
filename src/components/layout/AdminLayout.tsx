import LoadingOverlay from "react-loading-overlay-ts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AdminTopbar from "../common/AdminTopbar";
import { toast } from "react-toastify";
import { routesGen } from "../../routes/route";
import { useEffect } from "react";

const AdminLayout = () => {
  const { loadingOverlay } = useSelector(
    (state: RootState) => state.loadingOverlay
  );
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "USER") {
      toast.error("You do not have permission");
      navigate(routesGen.home);
      return;
    }

    if (user && user.status === "INA") {
      toast.error("You account have already closed");
      navigate(routesGen.signIn);
      return;
    }

    if (user && user.status === "PEN") {
      toast.error("You account not register yet");
      navigate(routesGen.signIn);
    }
  }, [user]);

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
