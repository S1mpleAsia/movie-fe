import { Box, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type DetailSignupStepProps = {
  signupForm: any;
};

const DetailSignupStep = ({ signupForm }: DetailSignupStepProps) => {
  return (
    <Box component="form" autoComplete="off">
      <TextField
        fullWidth
        className="authText"
        label="Full name"
        name="fullName"
        type="text"
        value={signupForm.values.fullName}
        onChange={signupForm.handleChange}
        helperText={signupForm.touched.fullName && signupForm.errors.fullName}
        error={
          signupForm.touched.fullName &&
          signupForm.errors.fullName !== undefined
        }
        sx={{
          marginBottom: "1rem",
        }}
      />

      <TextField
        select
        fullWidth
        className="genderText"
        label="Gender"
        name="gender"
        id="gender-select"
        value={signupForm.values.gender}
        helperText={signupForm.touched.age && signupForm.errors.age}
        onChange={signupForm.handleChange}
        error={
          signupForm.touched.gender && signupForm.errors.gender !== undefined
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
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Enter your birthday"
          sx={{ marginBottom: "2rem", width: "100%" }}
          name="birthday"
          onChange={(value) =>
            signupForm.setFieldValue(
              "birthday",
              dayjs(value).format("YYYY-MM-DD"),
              true
            )
          }
          slotProps={{
            textField: {
              variant: "outlined",
              error:
                signupForm.touched.birthday &&
                signupForm.errors.birthday !== undefined,
              helperText:
                signupForm.touched.birthday && signupForm.errors.birthday,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DetailSignupStep;
