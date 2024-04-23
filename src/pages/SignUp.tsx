import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import DetailSignupStep from "../components/common/DetailSignupStep";
import InitialSignupStep from "../components/common/InitialSignupStep";
import VerifyCodeStep from "../components/common/VerifyCodeStep";
import Logo from "../components/common/Logo";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import LoadingOverlay from "react-loading-overlay-ts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setLoadingOverlay } from "../redux/features/loadingOverlaySlice";
import { userAPI } from "../api/modules/user.api";
import {
  CredentialType,
  RegisterInitResponseType,
} from "../types/CredentialType";
import { GeneralType } from "../types/GeneralType";
import { toast } from "react-toastify";
import fetchRetry from "../utils/fetchRetry";

type SignupStepProps = {
  labels: string;
  component: JSX.Element;
};

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const { loadingOverlay } = useSelector(
    (state: RootState) => state.loadingOverlay
  );

  const formInitialValues: CredentialType = {
    email: "",
    password: "",
    fullName: "",
    birthday: "",
    gender: "",
  };

  const signupForm = useFormik({
    initialValues: formInitialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a correct format email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password minimum 8 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      if (activeStep === 0) {
        setActiveStep((step) => step + 1);
      } else if (activeStep === 1) {
        dispatch(setLoadingOverlay(true));
        console.log("--- Start init register ---");

        const response: GeneralType<RegisterInitResponseType> = (
          await userAPI.initRegister(signupForm.values)
        ).data;

        console.log(response.data.orderId);

        if (response.status.statusCode !== 200)
          toast.error(response.status.message);
        else {
          const statusResponse: GeneralType<CredentialType> =
            await fetchRetry<CredentialType>(
              async () =>
                (
                  await userAPI.registerStatus(response.data.orderId)
                ).data,

              (response) => response.status.statusCode !== 200
            );

          if (statusResponse.status.statusCode === 200) {
            setActiveStep((step) => step + 1);
          } else toast.error(statusResponse.status.message);
        }

        dispatch(setLoadingOverlay(false));
      }
    },
  });

  const steps: SignupStepProps[] = [
    {
      labels: "Initial Step",
      component: <InitialSignupStep signupForm={signupForm} />,
    },

    {
      labels: "Detail step",
      component: <DetailSignupStep signupForm={signupForm} />,
    },
    {
      labels: "Verify code step",
      component: <VerifyCodeStep signupForm={signupForm} />,
    },
  ];

  useEffect(() => {
    console.log(signupForm.values);
  }, [signupForm]);

  return (
    <LoadingOverlay
      active={loadingOverlay}
      spinner
      text="Processing..."
      className="custom-overlay"
    >
      <Box
        component="main"
        minHeight="100vh"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Box
          overflow="hidden"
          height="100vh"
          position="relative"
          display="flex"
          flexDirection="row"
        >
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
                Adventure starts here 🚀
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
                Discover the best quality movies and entertainment
              </Typography>

              <Box
                component="form"
                autoComplete="off"
                onSubmit={signupForm.handleSubmit}
              >
                {steps[activeStep].component}

                {activeStep === 0 && (
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
                    Sign up
                  </LoadingButton>
                )}

                {activeStep !== 0 && (
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      size="medium"
                      variant="contained"
                      fullWidth
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
                      onClick={() => setActiveStep((step) => step - 1)}
                    >
                      Back
                    </Button>
                    <LoadingButton
                      type="submit"
                      size="medium"
                      variant="contained"
                      fullWidth
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
                      Continue
                    </LoadingButton>
                  </Box>
                )}

                {activeStep === 0 ? (
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
                      Already have an account?
                    </Typography>

                    <Typography
                      variant="body1"
                      fontSize="1.05rem"
                      fontWeight="400"
                      lineHeight={1.5}
                    >
                      <Link
                        to={"/sign-in"}
                        style={{
                          textDecoration: "none",
                          color: "rgb(105, 108, 255)",
                        }}
                      >
                        Login
                      </Link>
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            component="img"
            display={{ xs: "none", md: "flex", lg: "flex" }}
            sx={{
              objectFit: "cover",
              objectPosition: "center",
              flex: 1,
            }}
            alignItems="center"
            justifyContent="center"
            alt="SignIn Illustration"
            height="auto"
            src={require("../assets/signup-illustrator.jpg")}
          />
        </Box>
      </Box>
    </LoadingOverlay>
  );
};

export default SignUp;
