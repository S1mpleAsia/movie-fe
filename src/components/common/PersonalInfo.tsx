import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import nameUtils from "../../utils/name.utils";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setLoadingOverlay } from "../../redux/features/loadingOverlaySlice";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import regions from "../../assets/region_modified.json";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../../api/modules/user.api";
import {
  CredentialType,
  CredentialUpdateRequestType,
} from "../../types/CredentialType";
import { GeneralType } from "../../types/GeneralType";
import { toast } from "react-toastify";
import { updateInfo } from "../../redux/features/userSlice";

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

const PersonalInfo = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { loadingOverlay } = useSelector(
    (state: RootState) => state.loadingOverlay
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const personalForm = useFormik({
    initialValues: {
      email: user?.email,
      firstName: nameUtils.getFirstName(user?.fullName || ""),
      lastName: nameUtils.getLastName(user?.fullName || ""),
      birthday: user?.birthday,
      gender: user?.gender,
      role: user?.role,
      region: user?.region,
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
      const requestBody: CredentialUpdateRequestType = {
        id: user?.id || "0",
        fullName:
          personalForm.values.firstName + " " + personalForm.values.lastName,
        birthday: personalForm.values.birthday,
        gender: personalForm.values.gender,
        region: personalForm.values.region,
      };

      const response: GeneralType<CredentialType> = (
        await userAPI.updateInfo(requestBody)
      ).data;

      console.log(response);
      dispatch(setLoadingOverlay(false));

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        toast.success("Update user information success");
        dispatch(updateInfo(response.data));
      }
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
      <Typography fontSize="1.5rem" fontWeight="600">
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
              <CustomTextField
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
              <Typography>Email Address</Typography>
              <CustomTextField
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
              <Typography>Gender</Typography>
              <CustomTextField
                select
                fullWidth
                className="genderText"
                placeholder="Gender"
                name="gender"
                id="gender-select"
                size="small"
                value={personalForm.values.gender}
                onChange={personalForm.handleChange}
                helperText={
                  personalForm.touched.gender && personalForm.errors.gender
                }
                error={
                  personalForm.touched.gender &&
                  personalForm.errors.gender !== undefined
                }
                sx={{
                  marginBottom: "1rem",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6062e8",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6062e8",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6062e8",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                }}
              >
                <MenuItem value="male" color="#6062e8">
                  Male
                </MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </CustomTextField>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }} display="flex" flexDirection="column" gap={1.5}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>Last Name</Typography>
              <CustomTextField
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    marginBottom: "1rem",
                    width: "100%",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6062e8",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6062e8",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6062e8",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "white !important",
                    },
                  }}
                  name="birthday"
                  onChange={(value: any) =>
                    personalForm.setFieldValue(
                      "birthday",
                      dayjs(value).format("YYYY-MM-DD"),
                      true
                    )
                  }
                  defaultValue={dayjs(user?.birthday)}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "small",
                      error:
                        personalForm.touched.birthday &&
                        personalForm.errors.birthday !== undefined,
                      helperText:
                        personalForm.touched.birthday &&
                        personalForm.errors.birthday,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>Region</Typography>
              <CustomTextField
                select
                fullWidth
                className="genderText"
                placeholder="Region"
                name="region"
                id="region-select"
                value={personalForm.values.region}
                onChange={personalForm.handleChange}
                size="small"
                sx={{
                  marginBottom: "1rem",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6062e8",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6062e8",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6062e8",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                }}
              >
                {regions.map((region) => (
                  <MenuItem value={region.name.common}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        component="img"
                        src={region.flags.svg}
                        alt={region.flags.alt}
                        width="50px"
                        marginRight={1}
                      />
                      <Typography>{region.name.common}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </CustomTextField>
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
            onClick={() => navigate("/")}
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
