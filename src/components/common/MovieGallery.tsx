import { ImageList, ImageListItem, Typography } from "@mui/material";
import { MovieImageType } from "../../types/MovieType";
import { pattern } from "../../utils/gallery";
import { getImage, storageImage } from "../../utils/constant";
import { useState } from "react";

type MovieGalleryProps = {
  images: MovieImageType[];
};

const MovieGallery = ({ images }: MovieGalleryProps) => {
  const [expanded, setExpanded] = useState(false);

  const srcset = (image: string, size: number, rows: number, cols: number) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  const displayImages = images.slice(0, 3);
  const remainingCount = images.length - displayImages.length;

  return (
    <ImageList
      sx={{
        width: "100%",
        height: "100%",
      }}
      variant="quilted"
      cols={3}
      rowHeight={400}
    >
      {displayImages.map((image, index) => (
        <ImageListItem
          key={index}
          cols={
            pattern[index - Math.floor(index / pattern.length) * pattern.length]
              .cols
          }
          rows={
            pattern[index - Math.floor(index / pattern.length) * pattern.length]
              .rows
          }
          sx={{
            position: "relative",
            opacity: index === 2 ? "1" : "0.7",
            transition: "opacity .3s linear",
            cursor: "pointer",
            "&:hover": { opacity: "1" },
            border: "1px solid white",
          }}
        >
          <img
            {...srcset(
              getImage(storageImage.external, image.imagePath),
              400,
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].rows,
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].cols
            )}
            alt={image.imagePath}
            loading="lazy"
          />

          {index === 2 && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.7)", // Semi-transparent black color
                }}
              ></div>
              <Typography
                variant="h5"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "3rem",
                  fontWeight: "700",
                  opacity: "1",
                }}
              >
                +{remainingCount} more
              </Typography>
            </>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default MovieGallery;
