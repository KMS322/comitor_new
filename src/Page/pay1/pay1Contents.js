import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Pay1S1 from "./pay1S1";
import Pay1S2 from "./pay1S2";
import Pay1S3 from "./pay1S3";
const Pay1Contents = () => {
  const { me } = useSelector((state) => state.user);

  const [deliveryInfo, setDeliveryInfo] = useState({});
  const handleDeliveryInfoChange = useCallback((info) => {
    setDeliveryInfo(info);
  }, []);
  return (
    <>
      <Pay1S1 />
      {me ? (
        <Pay1S2 me={me} onDeliveryInfoChange={handleDeliveryInfoChange} />
      ) : (
        <Pay1S2 onDeliveryInfoChange={handleDeliveryInfoChange} />
      )}

      <Pay1S3 deliveryInfo={deliveryInfo} />
    </>
  );
};

export default Pay1Contents;
