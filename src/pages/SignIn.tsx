import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../components/common/Logo";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { RootState } from "../redux/store";
import { setLoadingOverlay } from "../redux/features/loadingOverlaySlice";
import { useSelector } from "react-redux";
import { userAPI } from "../api/modules/user.api";
import { GeneralType } from "../types/GeneralType";
import { CredentialType } from "../types/CredentialType";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loadingOverlay } = useSelector(
    (state: RootState) => state.loadingOverlay
  );

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a correct format email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password minimum 8 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      dispatch(setLoadingOverlay(true));

      const response: GeneralType<CredentialType> = (
        await userAPI.signIn(signinForm.values)
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
        dispatch(setLoadingOverlay(false));
      } else {
        dispatch(setUser(response));
        setTimeout(() => {
          signinForm.resetForm();
          toast.success("Login success");
          navigate("/");
          dispatch(setLoadingOverlay(false));
        }, 1500);
      }
    },
  });

  return (
    <Box
      component="main"
      minHeight="100vh"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Box overflow="hidden" height="100vh" position="relative" display="flex">
        <Box
          component="img"
          display={{ xs: "none", md: "flex", lg: "flex" }}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            width: 500,
            flex: "1 1 0%",
          }}
          alignItems="center"
          justifyContent="center"
          alt="SignIn Illustration"
          maxWidth="100%"
          height="auto"
          src={require("../assets/illustrator.jpg")}
        />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height={{ xs: "100vh", md: "auto", lg: "auto" }}
          padding={{ xs: "1.5rem", md: "3rem", lg: "3rem" }}
          maxWidth={{ md: "480px", lg: "635px" }}
          sx={{ backgroundColor: "#26153f" }}
        >
          <Box marginX="auto" maxWidth="400px">
            <Box marginBottom="2rem" display="flex" alignItems="center">
              <Logo />
            </Box>

            <Typography
              variant="h6"
              fontSize={{ xs: "1.25rem", md: "1.5rem", lg: "1.5rem" }}
              fontWeight="500"
              lineHeight={1.6}
            >
              Welcome to Sneat! 👋🏻
            </Typography>

            <Typography
              variant="body1"
              margin="0 0 2rem"
              fontWeight="400"
              fontSize="1rem"
              fontStyle="italic"
              sx={{
                opacity: 0.8,
              }}
              lineHeight={1.5}
            >
              Please sign-in to your account and start the adventure
            </Typography>

            <Box
              component="form"
              autoComplete="off"
              onSubmit={signinForm.handleSubmit}
            >
              <TextField
                fullWidth
                className="authText"
                label="Email"
                name="email"
                type="text"
                value={signinForm.values.email}
                onChange={signinForm.handleChange}
                helperText={signinForm.touched.email && signinForm.errors.email}
                error={
                  signinForm.touched.email &&
                  signinForm.errors.email !== undefined
                }
                sx={{
                  marginBottom: "1rem",
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="dense"
                className="authText"
                name="password"
                value={signinForm.values.password}
                onChange={signinForm.handleChange}
                helperText={
                  signinForm.touched.password && signinForm.errors.password
                }
                error={
                  signinForm.touched.password &&
                  signinForm.errors.password !== undefined
                }
                sx={{
                  marginBottom: "1rem",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
                <Link
                  to={"#"}
                  style={{
                    fontSize: "1rem",
                    textDecoration: "none",
                    color: "rgb(105, 108, 255)",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </Link>
              </Typography>

              <LoadingButton
                type="submit"
                fullWidth
                size="medium"
                variant="contained"
                sx={{
                  boxShadow: "rgba(105, 108, 255, 0.4) 0px 2px 4px 0px",
                  backgroundColor: "rgb(96, 98, 232)",
                  color: "white",
                  textTransform: "uppercase",
                  margin: "0px 0px 1rem",
                  "&:hover": {
                    backgroundColor: "rgb(96, 98, 232)",
                  },
                }}
                loading={loadingOverlay}
              >
                Sign in
              </LoadingButton>

              <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  margin="0px 0.5rem 0px 0px"
                  fontWeight="400"
                  fontSize="1rem"
                  lineHeight={1.43}
                >
                  New on our platform?
                </Typography>
                <Typography
                  variant="body1"
                  fontSize="1.05rem"
                  fontWeight="400"
                  lineHeight={1.5}
                >
                  <Link
                    to={"/sign-up"}
                    style={{
                      textDecoration: "none",
                      color: "rgb(105, 108, 255)",
                    }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
