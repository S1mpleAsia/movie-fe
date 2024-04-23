import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "./Logo";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import React, { useState } from "react";

type InitialSignupProps = {
  signupForm: any;
};

const InitialSignupStep = ({ signupForm }: InitialSignupProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        fullWidth
        className="authText"
        label="Email"
        name="email"
        type="text"
        value={signupForm.values.email}
        onChange={signupForm.handleChange}
        helperText={signupForm.touched.email && signupForm.errors.email}
        error={
          signupForm.touched.email && signupForm.errors.email !== undefined
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
        value={signupForm.values.password}
        onChange={signupForm.handleChange}
        helperText={signupForm.touched.password && signupForm.errors.password}
        error={
          signupForm.touched.password &&
          signupForm.errors.password !== undefined
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
    </>
  );
};

export default InitialSignupStep;
