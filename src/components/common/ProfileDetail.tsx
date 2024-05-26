import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import Container from "./Container";

const ProfileDetail = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            backgroundColor: "#6062e8",
            margin: "16px",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#6062e8",
            },
          }}
        >
          Edit profile
        </Button>
      </Box>

      <Box marginTop="40px">
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h4" fontWeight="700" fontSize="2.5rem">
            {user?.fullName || "Vu Tung Duong"}
          </Typography>

          <Chip
            label="Standard"
            sx={{
              fontSize: "0.8rem",
              fontWeight: "600",
              paddingY: "8px",
              paddingX: "4px",
            }}
          />
        </Stack>

        <Container header="Profile">
          <Stack direction="column" gap={3} width="500px">
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{
                xs: "column",
                md: "row",
                lg: "row",
              }}
              gap={{ xs: "0.5rem" }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
              >
                <MailIcon />
                <Typography fontStyle="italic" sx={{ opacity: 0.8 }}>
                  Email:
                </Typography>
              </Box>
              <Typography
                fontSize="1.05rem"
                fontStyle="italic"
                fontWeight="700"
              >
                duongfls187@gmail.com
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{
                xs: "column",
                md: "row",
                lg: "row",
              }}
              gap={{ xs: "0.5rem" }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
              >
                <CakeIcon />
                <Typography fontStyle="italic" sx={{ opacity: 0.8 }}>
                  Birthday:
                </Typography>
              </Box>
              <Typography
                fontSize="1.05rem"
                fontStyle="italic"
                fontWeight="700"
              >
                10/03/2024
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{
                xs: "column",
                md: "row",
                lg: "row",
              }}
              gap={{ xs: "0.5rem" }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
              >
                <PersonIcon />
                <Typography fontStyle="italic" sx={{ opacity: 0.8 }}>
                  Role:
                </Typography>
              </Box>
              <Typography
                fontSize="1.05rem"
                fontStyle="italic"
                fontWeight="700"
              >
                USER
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{
                xs: "column",
                md: "row",
                lg: "row",
              }}
              gap={{ xs: "0.5rem" }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
              >
                <BeenhereIcon />
                <Typography fontStyle="italic" sx={{ opacity: 0.8 }}>
                  Status:
                </Typography>
              </Box>
              <Typography
                fontSize="1.05rem"
                fontStyle="italic"
                fontWeight="700"
                sx={{ color: "#3ab43a" }}
              >
                Active*
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ProfileDetail;
