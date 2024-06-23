import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { GeneralType } from "../../types/GeneralType";
import { userAPI } from "../../api/modules/user.api";
import { toast } from "react-toastify";
import { paymentAPI } from "../../api/modules/payment.api";
import { movieAPI } from "../../api/modules/movie.api";

const CardList = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalMovie, setTotalMovie] = useState(0);

  useEffect(() => {
    const getTotalUser = async () => {
      const response: GeneralType<number> = (await userAPI.getTotalUser()).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setTotalUser(response.data);
    };

    const getTotalPayment = async () => {
      const response: GeneralType<number> = (
        await paymentAPI.getPaymentSummary()
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setTotalRevenue(response.data);
    };

    const getTotalMovie = async () => {
      const response: GeneralType<number> = (await movieAPI.getTotalMovie())
        .data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setTotalMovie(response.data);
    };

    getTotalUser();
    getTotalMovie();
    getTotalPayment();
  }, []);

  return (
    <Box display="flex" gap={5}>
      <CardComponent
        title="Total Revenues"
        value={totalRevenue}
        extraValue={totalRevenue}
      />
      <CardComponent
        title="Total Movies"
        value={totalMovie}
        extraValue={totalMovie}
      />
      <CardComponent
        title="Total User"
        value={totalUser}
        extraValue={totalUser}
      />
    </Box>
  );
};

export default CardList;
