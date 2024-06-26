import { Box, CircularProgress, Typography } from "@mui/material";

type CircularRateProps = {
  value: number;
};
const CircularRate = ({ value }: CircularRateProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "max-content",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value * 10 * 2}
        color="success"
        size={50}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{ marginTop: "-5px" }}
        >
          {((value * 20) / 10).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
