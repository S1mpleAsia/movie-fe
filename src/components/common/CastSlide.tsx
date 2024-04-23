import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { routesGen } from "../../routes/route";
import uiConfigs from "../../configs/ui.config";
import { MovieCreditType } from "../../types/CreditType";
import { getImage, storageImage } from "../../utils/constant";

type CastSlideProps = {
  casts: MovieCreditType[];
};

const CastSlide = ({ casts }: CastSlideProps) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person("" + cast.actorId)}>
              <Box
                sx={{
                  paddingTop: "120%",
                  color: "text.primary",
                  ...uiConfigs.style.backgroundImage(
                    getImage(storageImage.w500ActorPath, cast.profilePath)
                  ),
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                    {cast.name + " "}
                    {cast.casting && (
                      <Box
                        component="div"
                        display="inline"
                        sx={{ fontStyle: "italic", opacity: 0.8 }}
                      >
                        - ({cast.casting})
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
