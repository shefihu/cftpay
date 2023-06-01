import React, { useEffect, useReducer } from "react";
import ReactSelect from "react-select";
// import ReactSelect from "react-select";
import Cookies from "js-cookie";
import { Logo } from "../assets/svg";
import { options } from "../data/typeofdonation";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_ALL_PAYMENT_TYPES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { extractErrorMessage, processAlertError } from "../utils";

const Offering = () => {
  const initialState = {
    paymentType: [],
    isLoading: false,
    alertMessage: {},
  };

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  const { paymentType, isLoading, alertMessage } = state;
  const [type, setType] = useState("tithe");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  // console.log(type);
  const acessToken = new URLSearchParams(search).get("access-token");

  const values = { type, amount, message, acessToken };
  // console.log(values);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/agreement");

      Cookies.set("firstpaymentprocess", JSON.stringify(values));
    }, 3000);
    // setLoading(false);
  };

  const getPaymentTypes = useQuery(GET_ALL_PAYMENT_TYPES, {
    variables: {},
  });

  const getThePaymentType = async () => {
    setState({
      isLoading: true,
    });

    const apiData = await getPaymentTypes?.fetchMore({
      variables: {},
    });
    // console.log(apiData);
    // console.log(getPaymentTypes, "yoo");
    // console.log(apiData.errors);
    if (apiData.data) {
      setState({
        paymentType: apiData?.data?.getAllPaymentTypeList,
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
  useEffect(() => {
    //  fetchData();
    getThePaymentType();
    // Cleanup method
    return () => {
      setState({
        ...initialState,
      });
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ClipLoader />
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full h-screen flex-col lg:hidden flex max-w-[100%] mx-auto px-[21px] justify-center items-center  ">
            <Logo />
            <form
              // method="post"
              onSubmit={handleSubmit}
              className="w-full flex mt-[60px] flex-col gap-y-[24px]"
            >
              <div className=" w-full flex flex-col space-y-[3px]">
                <label htmlFor="" className="uppercase">
                  Types of donation
                </label>
                {/* <ReactSelect
              options={paymentType.paymentName}
              onChange={(e) => setType(e.value)}
              styles={{ height: "40px" }}
              className="py-[6px]"
              required
            /> */}
                <select
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="w-ull h-[50px] rounded-[5px] outline-none bg-[#0654DF]/5 px-2"
                >
                  {paymentType.map((type, index) => {
                    return (
                      <option key={index} value={type.paymentName}>
                        {type.paymentName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex space-y-[3px] flex-col">
                <label htmlFor="" className="uppercase">
                  Amount
                </label>
                <div className="w-full h-[50px] relative   rounded-[5px]">
                  <h1 className="absolute top-[14px] left-2">£</h1>
                  <input
                    step="0.01"
                    min="0"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full h-full bg-[#0654DF]/5 px-5"
                  />
                </div>
              </div>
              <div className="flex space-y-[3px] flex-col">
                <label htmlFor="" className="uppercase">
                  MESSAGE
                </label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  name=""
                  id=""
                  cols="20"
                  rows="5"
                  className="bg-[#0654DF]/5 px-3 py-2 rounded-[5px]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full h-[50px] text-white bg-[#0654df] rounded-[5px]"
              >
                {!loading ? (
                  "  CONTINUE"
                ) : (
                  <ClipLoader size={20} color="white" />
                )}
              </button>
            </form>
          </div>

          <div className="w-full lg:flex hidden ">
            <h1>Switch to mobile view to view the payment method</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Offering;
