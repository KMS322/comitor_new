import { useParams } from "react-router-dom";
import ShopDetailS1 from "./shopDetailS1";
import ShopDetailS2 from "./shopDetailS2";
import ShopDetailS3 from "./shopDetailS3";
import ShopDetailS4 from "./shopDetailS4";
const ShopDetailContents = () => {
  const { code } = useParams();
  return (
    <>
      <ShopDetailS1 productCode={code} />
      <ShopDetailS2 />
      <ShopDetailS3 productCode={code} />
      <ShopDetailS4 />
    </>
  );
};

export default ShopDetailContents;
