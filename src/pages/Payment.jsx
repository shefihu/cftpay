import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useReducer, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Check, Paystack, Stripe, TrueLayer } from "../assets/svg";
import { PAY_PAYSTACK, PAY_STRIPE, PAY_TRUELAYER } from "../graphql/mutations";
import { GET_ALL_PAYMENT_METHOD } from "../graphql/queries";
import { extractErrorMessage, processAlertError } from "../utils";
import Cookies from "js-cookie";
const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const images = [<Stripe />, <TrueLayer />, <Paystack />];
  const initialState = {
    paymentMethod: [],
    isLoading: false,
    paymentLoading: false,
    alertMessage: {},
  };

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  console.log(selected);
  const { paymentMethod, isLoading, alertMessage, paymentLoading } = state;
  const [payPaystack] = useMutation(PAY_PAYSTACK);
  const [payStripe] = useMutation(PAY_STRIPE);
  const [payTruelayer] = useMutation(PAY_TRUELAYER);
  const getpaymentMethods = useQuery(GET_ALL_PAYMENT_METHOD, {
    variables: {},
  });
  const cookie = Cookies.get("firstpaymentprocess")
    ? JSON.parse(Cookies.get("firstpaymentprocess"))
    : null;
  // console.log(cookie.acessToken);
  const amount = cookie?.amount;
  const getThepaymentMethod = async () => {
    setState({
      isLoading: true,
    });

    const apiData = await getpaymentMethods?.fetchMore({
      variables: {},
    });
    console.log(apiData);
    // console.log(getpaymentMethods, "yoo");
    // console.log(apiData.errors);
    if (apiData.data) {
      setState({
        paymentMethod: apiData?.data?.getAllPaymentMethodList,
      });
    }

    if (!apiData.loading) {
      setState({
        isLoading: false,
      });
    }
    if (apiData.error) {
      setState({
        alertMessage: processAlertError(extractErrorMessage(apiData?.error)),
        isLoading: false,
      });
    }
  };
  const payBtn = async () => {
    setState({
      paymentLoading: true,
    });

    // eslint-disable-next-line no-restricted-globals
    if (selected === "PayStack") {
      const response = await payPaystack({
        variables: { paymentType: selected, amount: Number(amount) },
      });
      console.log(response);
      if (response) {
        window.location = response.data.payWithPayStack.payUrl;
        setState({
          // alertMessage: processAlertSuccess("User account activated"),
          paymentLoading: false,
        });
      }
    } else if (selected === "Stripe") {
      const response = await payStripe({
        variables: { paymentType: selected, amount: Number(amount) },
      });
      // console.log(response);
      if (response) {
        window.location = response.data.payWithStripe.payUrl;
        setState({
          // alertMessage: processAlertSuccess("User account activated"),
          paymentLoading: false,
        });
      }
      // setState({
      //   alertMessage: processAlertSuccess("User account activated"),
      //   isLoading: false,
      // })
    } else {
      const response = await payTruelayer({
        variables: { paymentType: selected, amount: Number(amount) },
      });
      console.log(response);
      if (response) {
        window.location = response.data.payWithTrueLayer.payUrl;
        setState({
          // alertMessage: processAlertSuccess("User account activated"),
          paymentLoading: false,
        });
      }
    }
  };

  useEffect(() => {
    //  fetchData();
    getThepaymentMethod();
    // Cleanup method
    return () => {
      setState({
        ...initialState,
      });
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ClipLoader />
        </div>
      ) : (
        <div className="w-full h-screen flex-col lg:hidden flex max-w-[100%] mx-auto px-[21px] justify-center items-center ">
          <div>
            <h4 className="text-[18px] font-bold">CONFIRM PAYMENT</h4>
            <p className="mt-[10px]">
              You will be redirected to the selected service website to complete
              payment
            </p>
          </div>
          <div className="w-full flex flex-col gap-y-[20px] mt-[20px]">
            {paymentMethod?.map((method, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelected(method.paymentName)}
                  className="w-full  h-[50px] flex px-[8px] justify-between items-center border border-gray-300 rounded-[5px]"
                >
                  {images[index]}
                  <div>
                    {selected === method.paymentName && (
                      <>
                        <Check />
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {/* <div
              onClick={() => setSelected("stripe")}
              className="w-full  h-[50px] flex px-[8px] justify-between items-center border border-gray-300 rounded-[5px]"
            >
              <Stripe />
              <div>
                {selected === "stripe" && (
                  <>
                    <Check />
                  </>
                )}
              </div>
            </div>
            <div
              onClick={() => setSelected("truelayer")}
              className="w-full  h-[50px] flex px-[8px] justify-between items-center border border-gray-300 rounded-[5px]"
            >
              <TrueLayer />
              <div>
                {selected === "truelayer" && (
                  <>
                    <Check />
                  </>
                )}
              </div>
            </div> */}
            {/* <div className="w-full  h-[50px] flex px-[4px] justify-between border border-gray-300 rounded-[5px]"></div>
          <div className="w-full  h-[50px] flex px-[4px] justify-between border border-gray-300 rounded-[5px]"></div>
          <div className="w-full  h-[50px] flex px-[4px] justify-between border border-gray-300 rounded-[5px]"></div> */}
          </div>
          <button
            type="button"
            onClick={payBtn}
            className="w-full h-[50px]  mt-[20px]  text-white bg-[#0654df] rounded-[5px]"
          >
            {!paymentLoading ? (
              "  CONTINUE"
            ) : (
              <ClipLoader size={20} color="white" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
