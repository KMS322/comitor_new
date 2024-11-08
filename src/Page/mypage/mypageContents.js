import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MypageS1 from "./mypageS1";
import MypageS2 from "./mypageS2";
import MypageS3 from "./mypageS3";
import MypageS4 from "./mypageS4";
import MypageS5 from "./mypageS5";
const MypageContents = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);

  const userId = me && me.user_id;

  return (
    <>
      <MypageS1 me={me} />
      <MypageS2 userId={userId} />
      {/* <MypageS3 carts={uniquecarts} /> */}
      {/* <MypageS4 /> */}
      <MypageS5 userId={userId} />
    </>
  );
};

export default MypageContents;
