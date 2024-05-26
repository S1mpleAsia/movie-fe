import { CheckoutRequest } from "../../types/PaymentType";
import privateClient from "../client/private.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const paymentEndpoints = {
  checkoutPayment: "payment/checkout",
  getUserPayment: "payment",
};

export const paymentAPI = {
  checkoutPayment: apiErrorHandling(async (request: CheckoutRequest) => {
    const response = privateClient.post(
      paymentEndpoints.checkoutPayment,
      request
    );

    return response;
  }),

  getUserPayment: apiErrorHandling(async (userId: string | null) => {
    const response = privateClient.get(paymentEndpoints.getUserPayment, {
      params: {
        userId: userId,
      },
    });

    return response;
  }),
};

export default paymentEndpoints;
