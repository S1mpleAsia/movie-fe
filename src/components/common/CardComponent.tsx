import { Box, Typography } from "@mui/material";

type CardComponentProps = {
  title: string;
  value: number;
  extraValue: number;
};

const CardComponent = ({ title, value, extraValue }: CardComponentProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        padding: "20px 24px",
        paddingBottom: "28px",
        paddingRight: "35px",
        minWidth: "350px",
        borderRadius: "8px",
      }}
    >
      <Typography fontSize="1.3rem" color="#909198" fontWeight="600">
        {title}
      </Typography>
      <Typography fontSize="1.5rem" fontWeight="700">
        {value}{" "}
        {title === "Total Revenues"
          ? "$"
          : title === "Total Movies"
          ? "movies"
          : "users"}
      </Typography>

      {title === "Total Revenues" && (
        <Typography
          marginTop="1rem"
          fontSize="0.9rem"
          color="#909198"
          fontWeight="500"
        >
          You have made an extra{" "}
          <Box component="span" color="#1859b6">
            {extraValue}$
          </Box>{" "}
          this year
        </Typography>
      )}

      {title === "Total Movies" && (
        <Typography
          marginTop="1rem"
          fontSize="0.9rem"
          color="#909198"
          fontWeight="500"
        >
          You have total{" "}
          <Box component="span" color="#1859b6">
            {extraValue}
          </Box>{" "}
          movies in the system
        </Typography>
      )}

      {title === "Total User" && (
        <Typography
          marginTop="1rem"
          fontSize="0.9rem"
          color="#909198"
          fontWeight="500"
        >
          You have total{" "}
          <Box component="span" color="#1859b6">
            {extraValue}
          </Box>{" "}
          user register this year
        </Typography>
      )}
    </Box>
  );
};

export default CardComponent;
