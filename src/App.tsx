import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import themeConfigs from "./configs/theme.config";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes, { authRoutes } from "./routes/route";
import PageWrapper from "./components/common/PageWrapper";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { themeMode } = useSelector((state: RootState) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />

      <CssBaseline />

      {/* Routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>

          {authRoutes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={
                <PageWrapper state={route.state}>{route.element}</PageWrapper>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
