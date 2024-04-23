import { Box, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { VerifyOTPType } from "../../types/CredentialType";
import { userAPI } from "../../api/modules/user.api";
import { GeneralType } from "../../types/GeneralType";
import { useDispatch } from "react-redux";
import { setLoadingOverlay } from "../../redux/features/loadingOverlaySlice";
import { useNavigate } from "react-router-dom";

type VerifyCodeStepProps = {
  signupForm: any;
};

const VerifyCodeStep = ({ signupForm }: VerifyCodeStepProps) => {
  const inputRefs: React.RefObject<HTMLInputElement>[] = Array.from(
    { length: 6 },
    // eslint-disable-next-line react-hooks/rules-of-hooks
    () => useRef<HTMLInputElement>(null)
  );
  const [countdown, setCountdown] = useState(30);
  const [enteredValues, setEnteredValues] = useState<string[]>(
    Array(6).fill("")
  );
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [countdown]);

  const handleResendClick = async () => {
    console.log("Resending code ...");
    toast.success("Success. Please check your mail");
    setCountdown(30);
  };

  const handleAsyncValidation = async (otp: string) => {
    const request: VerifyOTPType = {
      email: signupForm.values.email,
      otp: otp,
    };

    dispatch(setLoadingOverlay(true));
    console.log("--- Verify OTP ---");

    const verifyResponse: GeneralType<VerifyOTPType> = (
      await userAPI.verifyOTP(request)
    ).data;

    if (verifyResponse.status.statusCode !== 200) {
      toast.error(verifyResponse.status.message);
      setIsError(true);
    } else {
      toast.success("Register success");
      navigate("/sign-in");
    }

    dispatch(setLoadingOverlay(false));

    setEnteredValues(Array(6).fill(""));
    inputRefs[0]?.current?.focus();
  };

  const handleInputChange = (
    prevRef: React.RefObject<HTMLInputElement> | null,
    nextRef: React.RefObject<HTMLInputElement> | null,
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    setEnteredValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;

      if (newValues.every((val) => val !== "")) {
        const otp = newValues.join("");
        console.log(otp);

        handleAsyncValidation(otp);
      }

      return newValues;
    });

    if (value.length === event.target.maxLength && nextRef) {
      nextRef.current?.focus();
    } else if (value.length === 0 && prevRef) {
      prevRef.current?.focus();
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box>
        <Typography variant="body1" fontWeight={600} fontSize="1.1rem">
          Verification Code
        </Typography>
        <Typography
          variant="body1"
          fontSize="1rem"
          sx={{
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          Enter the verification code sent to your email address
        </Typography>
      </Box>

      <Box>
        <Box display="flex" flexDirection="row" gap={2}>
          {inputRefs.map((inputRef, index) => (
            <Box
              component="input"
              key={index}
              ref={inputRef}
              textAlign="center"
              width="2.5rem"
              height="2.5rem"
              fontSize="20px"
              lineHeight="2px"
              paddingY="2px"
              paddingX={0}
              maxLength={1}
              value={enteredValues[index]}
              onChange={(event) =>
                handleInputChange(
                  index > 0 ? inputRefs[index - 1] : null,
                  index < inputRefs.length - 1 ? inputRefs[index + 1] : null,
                  event,
                  index
                )
              }
              sx={{
                backgroundColor: "inherit",
                color: "white",
                borderWidth: "0px",
                borderBottomWidth: "2px",
                borderBottomColor: "#6062e8",
                outline: "2px solid transparent",
                "&.focus": {
                  border: "inherit",
                  borderColor: "#6062e8",
                },
              }}
            />
          ))}
        </Box>

        <Typography
          color={"rgb(220, 38 38 / 1)"}
          fontSize="14px"
          lineHeight="20px"
          marginTop="0.5rem"
          sx={{
            opacity: isError ? 1 : 0,
          }}
        >
          Code incorrect. Try again
        </Typography>
      </Box>

      <Typography
        color="white"
        sx={{
          opacity: countdown === 0 ? 1 : 0.5,
          "&:hover": {
            textDecoration: countdown === 0 ? "underline" : "",
            cursor: countdown === 0 ? "pointer" : "",
          },
          marginBottom: "1rem",
        }}
        onClick={() => countdown === 0 && handleResendClick()}
      >
        Didn't receive a code? Resend ({countdown})
      </Typography>
    </Box>
  );
};

export default VerifyCodeStep;
