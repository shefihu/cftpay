import { gql } from "@apollo/client";

export const GET_ALL_PAYMENT_TYPES = gql`
  query PaymentTypeDTO {
    getAllPaymentTypeList {
      _id
      paymentName
      createdAt
      updatedAt
    }
  }
`;
export const GET_ALL_PAYMENT_METHOD = gql`
  query PaymentMethodDTO {
    getAllPaymentMethodList {
      _id
      paymentName
      createdAt
      updatedAt
    }
  }
`;
