import { Box } from "@mui/material";
import HeroSlide from "../components/common/HeroSlide";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import MovieSlide from "../components/common/MovieSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide />
      <Box
        marginTop="-4rem"
        sx={{
          ...uiConfigs.style.mainContent,
        }}
      >
        <Container header="popular movies">
          <MovieSlide type="" />
        </Container>

        <Container header="toprated movies">
          <MovieSlide type="toprated" />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
