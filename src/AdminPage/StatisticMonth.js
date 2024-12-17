import "../CSS/statisticsMonth.css";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const StatisticMonth = ({ datas }) => {
  const { orderProductsLists, uniqueProducts } = datas;

  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [showDatas, setShowDatas] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState("");
  useEffect(() => {
    // Populate years from 2000 to the current year
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2024; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);

    // Populate months
    const monthsArray = Array.from({ length: 12 }, (v, k) =>
      (k + 1).toString().padStart(2, "0")
    );
    setMonths(monthsArray);
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setShowDatas(false);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setShowDatas(false);
  };

  const getSelectedValues = () => {
    setYear(selectedYear);
    setMonth(selectedMonth);
    setShowDatas(!showDatas);
    const selectedArr = [];
    const selected = orderProductsLists.filter((item) => {
      if (
        dayjs(item.createdAt).format("YYYY") === selectedYear &&
        dayjs(item.createdAt).format("MM") === selectedMonth
      ) {
        selectedArr.push(item);
      } else {
      }
    });
    const totalSales = uniqueProducts.map((product) => ({
      pCode: product.product_code,
      pName: product.product_name,
      totalCnt: 0,
      saleYear: "",
      saleMonth: "",
    }));
    selectedArr.map((list) => {
      totalSales.map((sale) => {
        if (sale.pCode === list.product_code) {
          sale.totalCnt++;
          sale.saleYear = dayjs(list.createdAt).format("YY");
          sale.saleMonth = dayjs(list.createdAt).format("MM");
        }
      });
    });
    setSelectedDatas(totalSales);
    console.log("컴포넌트 속 totalSales : ", totalSales);
  };
  return (
    <div className="statisticsMonth">
      <p>월별 통계</p>
      <div className="select_box">
        <div>
          <label htmlFor="yearSelect">연도 : </label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">--Select Year--</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="monthSelect">월 : </label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">--Select Month--</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={getSelectedValues}>순위 보기</button>
      {showDatas && <p className="sub">{`${year}년 ${month}월 판매량 순위`}</p>}
      {showDatas &&
        selectedDatas.map((data, index) => {
          return (
            <div className="month_rank" key={index}>
              <p>
                {index + 1}위(판매량 : {data.totalCnt}개)
              </p>
              <p>{data.pName}</p>
            </div>
          );
        })}
    </div>
  );
};

export default StatisticMonth;
