import { CheckoutRequest } from "../../types/PaymentType";
import { Period } from "../../types/time.type";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const paymentEndpoints = {
  checkoutPayment: "payment/checkout",
  getUserPayment: "payment",
  getRevenueOverview: "payment/overview",
  getPaymentSummary: "payment/summary",
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

  getRevenueOverview: apiErrorHandling(async (period: Period) => {
    const response = privateClient.get(paymentEndpoints.getRevenueOverview, {
      params: {
        period: period,
      },
    });

    return response;
  }),

  getPaymentSummary: apiErrorHandling(async () => {
    const response = publicClient.get(paymentEndpoints.getPaymentSummary);

    return response;
  }),
};

export default paymentEndpoints;
