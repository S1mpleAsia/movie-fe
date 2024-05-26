import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailActorInfoResponse } from "../types/ActorType";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { GeneralType } from "../types/GeneralType";
import { actorAPI } from "../api/modules/actor.api";
import { toast } from "react-toastify";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import { getImage, storageImage } from "../utils/constant";
import Container from "../components/common/Container";
import ActorMovieSlide from "../components/common/ActorMovieSlide";

const PersonDetail = () => {
  const { actorId } = useParams();
  const [person, setPerson] = useState<DetailActorInfoResponse>();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const response: GeneralType<DetailActorInfoResponse> = (
        await actorAPI.getDetailActorInfo(parseInt(actorId || "0"))
      ).data;

      dispatch(setGlobalLoading(false));
      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setPerson(response.data);
    };

    getPerson();
  }, [actorId]);

  useEffect(() => {
    console.log(person);
  }, [person]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ width: { xs: "50%", md: "25%" } }}>
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${getImage(
                      storageImage.w500ActorPath,
                      person.actor.profilePath
                    )})`,
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={0}>
                  <Typography fontWeight="700" fontSize="2rem">
                    {person.actor.name}
                  </Typography>

                  <Typography
                    fontWeight="700"
                    fontSize="1.4rem"
                    fontStyle="italic"
                    sx={{ opacity: 0.8 }}
                  >
                    Birthday: {`${person.actor.birthday}`}
                  </Typography>

                  <Typography
                    fontWeight="700"
                    fontSize="1.4rem"
                    fontStyle="italic"
                    sx={{ opacity: 0.8 }}
                  >
                    Gender: {`${person.actor.gender}`}
                  </Typography>

                  <Typography
                    marginTop="1rem"
                    sx={{ ...uiConfigs.style.typoLines(10), maxWidth: "400px" }}
                  >
                    {person.actor.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>

            <Container header="media">
              <ActorMovieSlide movies={person.movies} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
