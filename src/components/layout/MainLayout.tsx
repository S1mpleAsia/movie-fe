import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { routesGen } from "../../routes/route";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MainLayout = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      toast.error("You do not have permission");
      navigate(routesGen.dashboard);
      return;
    }

    if (user && user.status === "INA") {
      toast.error("You account have already closed");
      navigate(routesGen.signIn);
      return;
    }
  }, [user]);

  return (
    <>
      {/* Global loading */}
      <GlobalLoading />
      {/* Global loading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh" flexDirection="column">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* Main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main */}

        {/* Footer */}
        <Footer />
        {/* Footer */}
      </Box>
    </>
  );
};

export default MainLayout;
