import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { toast } from "react-toastify";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
type SigninFormProps = {
  switchAuthState: () => void;
};

const SigninForm = ({ switchAuthState }: SigninFormProps) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

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
        .min(8, "password minimum 8 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = {
        response: "Hello",
        err: {
          code: 404,
          message: "Error",
        },
      };
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in sucess");
      }

      if (err) setErrorMessage(err.message);
    },
  });
  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Enter your email"
          name="email"
          fullWidth
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.email && signinForm.errors.email !== undefined
          }
          helperText={signinForm.touched.email && signinForm.errors.email}
        />

        <TextField
          type="text"
          placeholder="Enter your password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Sign In
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign Up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninForm;
