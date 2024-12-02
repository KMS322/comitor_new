import "../../CSS/shopDetail.css";
const ShopDetailS4 = () => {
  return (
    <div className="shopDetail_s4">
      <div className="section_container">
        <div className="input_box">
          <p>배송기간</p>
          <p>
            당일 오후 4시 이전 구매고객 당일 발송
            <br /> 4시 이후 고객 다음날 발송
            <br /> cj 대한 통운으로 발송됩니다
            <br /> 배송비 무료 입니다.
          </p>
        </div>
        <div className="input_box">
          <p>교환 및 환불 정책 기본 가이드</p>
          <p>
            1.교환/환불 요청 가능 기간
            <br /> -단순 변심: 상품 수령 후 7일 이내 요청 가능합니다.
            <br /> -제품 하자 및 오배송: 상품 수령 후 15일 이내 요청 가능합니다.
            <br /> 2.교환 및 환불이 불가능한 경우 -상품을 개봉하거나 사용하여
            재판매가 불가능한 경우. -고객님에 의해 상품이 훼손된 경우(예: 포장이
            손상되거나 제품에 이물질이 묻은 경우). -구매 내역이 확인되지 않는
            경우. -단순 변심으로 환불 요청이 불가능.
          </p>
        </div>
        <div className="input_box">
          <p>배송비 부과 조건</p>
          <p>
            -단순 변심: 왕복 배송비(6,000원)는 고객 부담.
            <br />
            -기본적으로 무료 배송이지만, 교환/환불 시 초기 배송비(3,000원)와
            반송 배송비(3,000원)가 부과됩니다.
            <br />
            -제품 하자/오배송: 교환 및 반품 배송비는 코미토르에서 부담.
          </p>
        </div>
        <div className="input_box">
          <p>교환/환불 절차</p>
          <p>
            1단계: 자사몰 내 교환 및 환불 신청을 통해 접수.
            <br />
            2단계: 제품 상태 확인을 위한 사진 첨부.
            <br />
            3단계: 반품 접수 후, 사무실 주소로 CJ대한통운으로 상품 반송.
            <br />
            4단계: 상품 수령 및 확인 후 교환/환불 처리(최대 5일 소요).
          </p>
        </div>
        <div className="input_box">
          <p>고객센터</p>
          <p>연락처 070-8790-0516 문의 바랍니다.</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailS4;
