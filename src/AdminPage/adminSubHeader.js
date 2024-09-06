import "../CSS/adminSubHeader.css";
import { useNavigate } from "react-router-dom";
const AdminSubHeader = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="adminSubHeader">
      <div className="box">
        <img
          src="/images/subHeader_img.png"
          alt=""
          onClick={() => {
            navigate("/adminMain");
          }}
        />
        <p
          onClick={() => {
            navigate("/adminMain");
          }}
        >
          페이지 관리자
        </p>
      </div>
      <p>{data}</p>
    </div>
  );
};

export default AdminSubHeader;
