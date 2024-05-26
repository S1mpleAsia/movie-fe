import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

type AutoSwiperProps = {
  children: JSX.Element[] | undefined;
};

const AutoSwiper = ({ children }: AutoSwiperProps) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
