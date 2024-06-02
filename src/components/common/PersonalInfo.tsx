import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import nameUtils from "../../utils/name.utils";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setLoadingOverlay } from "../../redux/features/loadingOverlaySlice";
import { LoadingButton } from "@mui/lab";

const PersonalInfo = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { loadingOverlay } = useSelector(
    (state: RootState) => state.loadingOverlay
  );
  const dispatch = useDispatch();

  const personalForm = useFormik({
    initialValues: {
      email: user?.email,
      firstName: nameUtils.getFirstName(user?.fullName || ""),
      lastName: nameUtils.getLastName(user?.fullName || ""),
      birthday: user?.birthday,
      phoneNumber: user?.phoneNumber,
      role: user?.role,
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a correct format email")
        .required("Email is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
    }),

    onSubmit: async (values) => {
      dispatch(setLoadingOverlay(true));
    },
  });

  return (
    <Box
      className="personal-info"
      padding="20px"
      borderRadius="8px"
      sx={{
        backgroundColor: "#1e1e1e",
        flexGrow: 1,
      }}
    >
      <Typography fontSize="1.2rem" fontWeight="500">
        Personal Information
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
        onSubmit={personalForm.handleSubmit}
      >
        <Box
          sx={{
            marginTop: "1rem",
          }}
          display="flex"
          gap={4}
        >
          <Box sx={{ flex: 1 }} display="flex" flexDirection="column" gap={1.5}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>First Name</Typography>
              <TextField
                fullWidth
                className="authText"
                name="firstName"
                type="text"
                value={personalForm.values.firstName}
                onChange={personalForm.handleChange}
                helperText={
                  personalForm.touched.firstName &&
                  personalForm.errors.firstName
                }
                error={
                  personalForm.touched.firstName &&
                  personalForm.errors.firstName !== undefined
                }
                size="small"
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>Email</Typography>
              <TextField
                fullWidth
                className="authText"
                name="email"
                type="text"
                value={personalForm.values.email || "duongk65bkhn@gmail.com"}
                size="small"
                sx={{
                  marginBottom: "1rem",
                  backgroundColor: "#303030",
                }}
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>Phone Number</Typography>
              <TextField
                fullWidth
                className="authText"
                name="phoneNumber"
                type="text"
                value={personalForm.values.phoneNumber}
                onChange={personalForm.handleChange}
                helperText={
                  personalForm.touched.phoneNumber &&
                  personalForm.errors.phoneNumber
                }
                error={
                  personalForm.touched.phoneNumber &&
                  personalForm.errors.phoneNumber !== undefined
                }
                size="small"
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1 }} display="flex" flexDirection="column" gap={1.5}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>Last Name</Typography>
              <TextField
                fullWidth
                className="authText"
                name="lastName"
                type="text"
                value={personalForm.values.lastName}
                onChange={personalForm.handleChange}
                helperText={
                  personalForm.touched.lastName && personalForm.errors.lastName
                }
                error={
                  personalForm.touched.lastName &&
                  personalForm.errors.lastName !== undefined
                }
                size="small"
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>Date of birth</Typography>
              <TextField
                fullWidth
                className="authText"
                name="birthday"
                type="text"
                value={personalForm.values.birthday}
                size="small"
                sx={{
                  marginBottom: "1rem",
                  backgroundColor: "#303030",
                }}
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>Phone Number</Typography>
              <TextField
                fullWidth
                className="authText"
                name="phoneNumber"
                type="text"
                value={personalForm.values.phoneNumber}
                onChange={personalForm.handleChange}
                helperText={
                  personalForm.touched.phoneNumber &&
                  personalForm.errors.phoneNumber
                }
                error={
                  personalForm.touched.phoneNumber &&
                  personalForm.errors.phoneNumber !== undefined
                }
                size="small"
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </Box>
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
          >
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            size="medium"
            variant="contained"
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
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
