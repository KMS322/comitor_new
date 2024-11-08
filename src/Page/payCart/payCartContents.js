import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import PayCartS1 from "./payCartS1";
import PayCartS2 from "./payCartS2";
import PayCartS3 from "./payCartS3";
const PayCartContents = () => {
  const { me } = useSelector((state) => state.user);

  const [deliveryInfo, setDeliveryInfo] = useState({});
  const handleDeliveryInfoChange = useCallback((info) => {
    setDeliveryInfo(info);
  }, []);
  return (
    <>
      <PayCartS1 />
      {me ? (
        <PayCartS2 me={me} onDeliveryInfoChange={handleDeliveryInfoChange} />
      ) : (
        <PayCartS2 onDeliveryInfoChange={handleDeliveryInfoChange} />
      )}

      <PayCartS3 deliveryInfo={deliveryInfo} />
    </>
  );
};

export default PayCartContents;
