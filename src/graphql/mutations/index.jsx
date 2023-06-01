import { gql } from "@apollo/client";

export const PAY_PAYSTACK = gql`
  mutation payWithPayStack($paymentType: String!, $amount: Float!) {
    payWithPayStack(paymentType: $paymentType, amount: $amount) {
      payUrl
      paymentId
    }
  }
`;
export const PAY_STRIPE = gql`
  mutation payWithStripe($paymentType: String!, $amount: Float!) {
    payWithStripe(paymentType: $paymentType, amount: $amount) {
      payUrl
      paymentId
    }
  }
`;
export const PAY_TRUELAYER = gql`
  mutation payWithTrueLayer($paymentType: String!, $amount: Float!) {
    payWithTrueLayer(paymentType: $paymentType, amount: $amount) {
      payUrl
      paymentId
    }
  }
`;
