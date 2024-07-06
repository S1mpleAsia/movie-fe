import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  CheckoutRequest,
  PackageType,
  PaymentReponseWithCredential,
} from "../../types/PaymentType";
import { GeneralType } from "../../types/GeneralType";
import { paymentAPI } from "../../api/modules/payment.api";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routesGen } from "../../routes/route";

const PlanDetail = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [payment, setPayment] = useState<PaymentReponseWithCredential>();
  const [activePackage, setActivePackge] = useState(0);
  const [loading, setLoading] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getPaymentDetail = async () => {
      const response: GeneralType<PaymentReponseWithCredential> = (
        await paymentAPI.getUserPayment(user?.id || "")
      ).data;

      console.log(response);

      if (response.status.statusCode === 200 && response.data.purchase) {
        if (response.data.purchase.type === PackageType.BASIC)
          setActivePackge(1);
        else if (response.data.purchase.type === PackageType.STANDARD)
          setActivePackge(2);
        else if (response.data.purchase.type === PackageType.PREMIUM)
          setActivePackge(3);
        setPayment(response.data);
      }
    };

    if (user && user.role === "ADMIN") navigate(routesGen.dashboard);
    else if (user && user.role === "USER") getPaymentDetail();
  }, []);

  const onClick = async (type: PackageType) => {
    if (!user) {
      navigate(routesGen.signIn);
      return;
    }

    if (type === PackageType.BASIC) {
      setLoading(1);
      if (activePackage > 1) {
        toast.error("You have subcribed a higher package before");
        setLoading(0);
        return;
      }
    } else if (type === PackageType.STANDARD) {
      setLoading(2);

      if (activePackage > 2) {
        toast.error("You have subcribed a higher package before");
        setLoading(0);
        return;
      }
    } else if (type === PackageType.PREMIUM) {
      setLoading(3);
    }

    const request: CheckoutRequest = {
      email: user?.email || "",
      name: user?.fullName || "",
      userId: user?.id || "",
      type: type,
    };
    const response: string = (await paymentAPI.checkoutPayment(request)).data;

    setLoading(0);
    window.location.assign(response);
  };

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h2" fontWeight="700">
          Choose the plant that's right for you
        </Typography>
        <Typography variant="body1" fontStyle="italic" sx={{ opacity: 0.7 }}>
          Join Movix and select from our flexible subscription options tailored
          to suit your viewing preferences. Get ready for non-stop
          entertainment!
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", md: "row", lg: "row" }} spacing={4}>
        <Card sx={{ maxWidth: 400, padding: "1rem" }}>
          <CardContent>
            <Typography variant="h6" fontSize="1.6rem">
              Basic Plan
            </Typography>
            <Typography
              variant="body1"
              fontSize="1rem"
              fontWeight="400"
              sx={{ opacity: 0.65, marginTop: "0.5rem" }}
            >
              Enjoy an extensive library of movies and shows, featuring a range
              of content, including recently released titles.
            </Typography>

            <Box display="flex" marginTop="1rem" alignItems="baseline">
              <Typography variant="h6" fontSize="3rem">
                $9.99
              </Typography>
              <Typography
                variant="body1"
                fontSize="1rem"
                fontWeight="400"
                sx={{ opacity: 0.8 }}
              >
                /month
              </Typography>
            </Box>
          </CardContent>

          <CardActions>
            <LoadingButton
              variant="contained"
              size="medium"
              sx={{
                color: "primary.constrastText",
              }}
              disabled={activePackage === 1}
              onClick={() => onClick(PackageType.BASIC)}
              loading={loading === 1}
            >
              {activePackage === 1 ? "Subscribed" : "Choose Plan"}
            </LoadingButton>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 400, padding: "1rem" }}>
          <CardContent>
            <Typography variant="h6" fontSize="1.6rem">
              Standard Plan
            </Typography>
            <Typography
              variant="body1"
              fontSize="1rem"
              fontWeight="400"
              sx={{ opacity: 0.65, marginTop: "0.5rem" }}
            >
              Access to a wider selection of movies and shows, including most
              new releases and exclusive content
            </Typography>

            <Box display="flex" marginTop="1rem" alignItems="baseline">
              <Typography variant="h6" fontSize="3rem">
                $12.99
              </Typography>
              <Typography
                variant="body1"
                fontSize="1rem"
                fontWeight="400"
                sx={{ opacity: 0.8 }}
              >
                /month
              </Typography>
            </Box>
          </CardContent>

          <CardActions>
            <LoadingButton
              variant="contained"
              size="medium"
              sx={{
                color: "primary.constrastText",
              }}
              disabled={activePackage === 2}
              onClick={() => onClick(PackageType.STANDARD)}
              loading={loading === 2}
            >
              {activePackage === 2 ? "Subscribed" : "Choose plan"}
            </LoadingButton>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 400, padding: "1rem" }}>
          <CardContent>
            <Typography variant="h6" fontSize="1.6rem">
              Premium Plan
            </Typography>
            <Typography
              variant="body1"
              fontSize="1rem"
              fontWeight="400"
              sx={{ opacity: 0.65, marginTop: "0.5rem" }}
            >
              Access to a widest selection of movies and shows, including all
              new releases and Offine Viewing
            </Typography>

            <Box display="flex" marginTop="1rem" alignItems="baseline">
              <Typography variant="h6" fontSize="3rem">
                $14.99
              </Typography>
              <Typography
                variant="body1"
                fontSize="1rem"
                fontWeight="400"
                sx={{ opacity: 0.8 }}
              >
                /month
              </Typography>
            </Box>
          </CardContent>

          <CardActions>
            <LoadingButton
              variant="contained"
              size="medium"
              sx={{
                color: "primary.constrastText",
              }}
              disabled={activePackage === 3}
              onClick={() => onClick(PackageType.PREMIUM)}
              loading={loading === 3}
            >
              {activePackage === 3 ? "Subcribed" : "Choose plan"}
            </LoadingButton>
          </CardActions>
        </Card>
      </Stack>
    </>
  );
};

export default PlanDetail;
