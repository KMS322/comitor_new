import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import PayAllS1 from "./payAllS1";
import PayAllS2 from "./payAllS2";
import PayAllS3 from "./payAllS3";
const PayAllContents = () => {
  const { me } = useSelector((state) => state.user);

  const [deliveryInfo, setDeliveryInfo] = useState({});
  const handleDeliveryInfoChange = useCallback((info) => {
    setDeliveryInfo(info);
  }, []);
  return (
    <>
      <PayAllS1 />
      {me ? (
        <PayAllS2 me={me} onDeliveryInfoChange={handleDeliveryInfoChange} />
      ) : (
        <PayAllS2 onDeliveryInfoChange={handleDeliveryInfoChange} />
      )}

      <PayAllS3 deliveryInfo={deliveryInfo} />
    </>
  );
};

export default PayAllContents;
