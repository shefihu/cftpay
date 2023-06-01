import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Info } from "../assets/svg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Agreement = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [iwant, setIWant] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = () => {
    setIsSubscribed((current) => !current);
    setIWant((current) => !current);
  };
  const cookie = Cookies.get("firstpaymentprocess")
    ? JSON.parse(Cookies.get("firstpaymentprocess"))
    : null;

  // console.log(cookie.acessToken);
  const token = cookie?.acessToken;
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/payment?access-token=${token}`);
    }, 3000);
  };
  return (
    <div>
      <div className="w-full h-screen flex-col lg:hidden flex max-w-[100%] mx-auto px-[21px] justify-center items-center ">
        <div className="w-full flex justify-between items-center">
          <div className="space-x-[10px] flex items-center">
            <Info />
            <h3 className="font-[500] text-[16px]">Notes</h3>
          </div>
          <p className="text-[#000000] text-[13px]">Disclaimer</p>
        </div>
        <div className="w-full h-[300px] mt-[40px] overflow-y-scroll">
          <p>
            From 6 april 2008. The uk government will add an extra 3p from every
            £1 donated under gift aid, which means that Christ Faith Tabernacle
            will receive a total of 28p for every £1 donated. For more
            information on this matter visit our website here. You can cancel
            this declaration at any time by notifying Christ Faith Tabernacle.
            If in future, your circumstances change and you no longer pay
            sufficient tax, you should cancel the declaration by notifying
            Christ Faith Tabernacle If you pay tax at the higher rate you can
            claim further tax relief in your self assessment tax return If you
            are unsure about whether your donations qualify for gift aid tax
            relief, ask Christ Faith Tabernacle or refer to the hm revenue and
            customs website (www.hmrc.gov.uk/incometax/relief-gift-aid.html)
            Please notify Christ Faith Tabernacle if you change your name or
            address
          </p>
        </div>
        <div className="w-full mt-[32px]">
          <h5>FOR TAX PAYERS ONLY</h5>
        </div>
        <div className="mt-4">
          <label htmlFor="understand" className="flex space-x-2  items-start">
            <input
              type="checkbox"
              defaultChecked={true}
              value={isSubscribed}
              onChange={handleChange}
              id="understand"
              name="understand"
              className="mt-[4px]"
            />
            <span className="text-[13px]">
              I understand that I must pay an amount of income tax that Christ
              Faith Tabernacle reclaims on my donations in each tax year.
            </span>
          </label>
          <label
            htmlFor="understand"
            className="flex space-x-2 mt-3 items-start"
          >
            <input
              type="checkbox"
              defaultChecked={false}
              value={iwant}
              onChange={handleChange}
              id="understand"
              name="understand"
              className="mt-[4px]"
            />
            <span className="text-[13px]">
              I want Christ Faith Tabernacle to treat all donations I have made
              and will make from this day as gift and donations until I notify
              otherwise
            </span>
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubscribed === false}
            className="w-full h-[50px]  mt-[20px]  text-white bg-[#0654df] rounded-[5px]"
          >
            {!loading ? "  CONTINUE" : <ClipLoader size={20} color="white" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
