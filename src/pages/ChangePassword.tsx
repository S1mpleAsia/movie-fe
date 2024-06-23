import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { setLoadingOverlay } from "../redux/features/loadingOverlaySlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import VerifyCodeStep from "../components/common/VerifyCodeStep";
import { userAPI } from "../api/modules/user.api";
import { ResendOTPRequestType } from "../types/CredentialType";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "rgb(105, 108, 255)", // Hover border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(105, 108, 255)", // Focused border color
    },
  },

  "& label.Mui-focused": {
    color: "rgb(105, 108, 255)",
  },
}));

const ChangePassword = () => {
  const { loadingOverlay } = useSelector(
    (state: RootState) => state.loadingOverlay
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);

  const changePwdForm = useFormik({
    initialValues: {
      email: user?.email,
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password minimum 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .min(8, "Password minimum 8 characters")
        .required("Confirm password is required"),
    }),

    onSubmit: async (values) => {
      dispatch(setLoadingOverlay(true));
      if (
        changePwdForm.values.password !== changePwdForm.values.confirmPassword
      )
        toast.error("Password does not match. Please check again");
      else {
        sessionStorage.setItem("temp_pwd", changePwdForm.values.password);
        const request: ResendOTPRequestType = {
          email: changePwdForm.values.email || "",
        };
        await userAPI.resendOTP(request);
        dispatch(setLoadingOverlay(false));
        setScreen("verify");
      }
    },
  });

  const [screen, setScreen] = useState("info");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  return (
    <Box
      className="change-password"
      padding="20px"
      borderRadius="8px"
      sx={{
        backgroundColor: "#1e1e1e",
        flexGrow: 1,
      }}
    >
      {screen === "info" && (
        <>
          <Typography fontSize="1.5rem" fontWeight="600">
            Change Password
          </Typography>

          <Divider
            sx={{
              height: "3px",
              marginY: "5px",
            }}
          />

          <Box
            component="form"
            autoComplete="off"
            sx={{ marginTop: "1rem" }}
            onSubmit={changePwdForm.handleSubmit}
          >
            <Box
              sx={{ flex: 1 }}
              display="flex"
              flexDirection="column"
              gap={1.5}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography>Email</Typography>
                <CustomTextField
                  fullWidth
                  className="authText"
                  name="email"
                  type="text"
                  value={changePwdForm.values.email || "duongk65bkhn@gmail.com"}
                  size="small"
                  sx={{
                    marginBottom: "1rem",
                    backgroundColor: "#303030",
                  }}
                />
              </Box>

              <Box display="flex" flexDirection="column" gap={1}>
                <Typography>Password</Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  margin="dense"
                  className="authText"
                  name="password"
                  value={changePwdForm.values.password}
                  size="small"
                  onChange={changePwdForm.handleChange}
                  helperText={
                    changePwdForm.touched.password &&
                    changePwdForm.errors.password
                  }
                  error={
                    changePwdForm.touched.password &&
                    changePwdForm.errors.password !== undefined
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
              </Box>

              <Box display="flex" flexDirection="column" gap={1}>
                <Typography>Confirm password</Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  margin="dense"
                  className="authText"
                  name="confirmPassword"
                  value={changePwdForm.values.confirmPassword}
                  size="small"
                  onChange={changePwdForm.handleChange}
                  helperText={
                    changePwdForm.touched.confirmPassword &&
                    changePwdForm.errors.confirmPassword
                  }
                  error={
                    changePwdForm.touched.confirmPassword &&
                    changePwdForm.errors.confirmPassword !== undefined
                  }
                  sx={{
                    marginBottom: "1rem",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box display="flex" gap={3} width="100%" justifyContent="flex-end">
              <Button
                type="button"
                size="medium"
                variant="contained"
                sx={{
                  border: "1px solid white",
                  backgroundColor: "#1e1e1e",
                  color: "white",
                  textTransform: "uppercase",
                  margin: "1rem 0px 1rem",
                  "&:hover": {
                    backgroundColor: "#1e1e1e",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>

              <LoadingButton
                // type="submit"
                size="medium"
                variant="contained"
                type="submit"
                sx={{
                  boxShadow: "rgba(105, 108, 255, 0.4) 0px 2px 4px 0px",
                  backgroundColor: "rgb(96, 98, 232)",
                  color: "white",
                  textTransform: "uppercase",
                  margin: "1rem 0px 1rem",
                  "&:hover": {
                    backgroundColor: "rgb(96, 98, 232)",
                  },
                }}
                loading={loadingOverlay}
              >
                Continue
              </LoadingButton>
            </Box>
          </Box>
        </>
      )}

      {screen === "verify" && (
        <>
          <VerifyCodeStep signupForm={changePwdForm} />
        </>
      )}
    </Box>
  );
};

export default ChangePassword;
