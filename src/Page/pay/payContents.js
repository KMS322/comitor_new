import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PayS1 from "./payS1";
import PayS2 from "./payS2";
import PayS3 from "./payS3";
const PayContents = () => {
  const { me } = useSelector((state) => state.user);
  const location = useLocation();
  const { selectedCart, price } = location.state || {};
  // console.log("selectedCart : ", selectedCart);
  // console.log("price : ", price);

  const [deliveryInfo, setDeliveryInfo] = useState({});
  const handleDeliveryInfoChange = useCallback((info) => {
    setDeliveryInfo(info);
  }, []);
  return (
    <>
      <PayS1 />
      {me ? (
        <PayS2 me={me} onDeliveryInfoChange={handleDeliveryInfoChange} />
      ) : (
        <PayS2 onDeliveryInfoChange={handleDeliveryInfoChange} />
      )}
      {selectedCart ? (
        <PayS3 carts={selectedCart} deliveryInfo={deliveryInfo} price={price} />
      ) : (
        <PayS3 deliveryInfo={deliveryInfo} price={price} />
      )}
    </>
  );
};

export default PayContents;
