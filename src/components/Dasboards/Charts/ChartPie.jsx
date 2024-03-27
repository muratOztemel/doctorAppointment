import { useEffect, useState } from "react";
import { number, array, string } from "prop-types";
import ReactApexChart from "react-apexcharts";

const ChartPie = ({ dataName, color, widthChart }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  // Verileri aylara göre gruplamak için bir fonksiyon
  function groupDataByMonth(data) {
    let groupedData = {};
    let months = [];
    let totalDataCounts = [];
    let dateParts;
    data.map((item) => {
      if (dataName === "appointments") {
        dateParts = item.date.split(".");
      } else {
        dateParts = item.createdAt.split(".");
      }

      let [day, month, year] = dateParts;

      let key = `${year}-${month}`;

      groupedData[key] = [...(groupedData[key] || []), item];
    });

    // Her ay için toplam veriyi hesapla
    Object.keys(groupedData).forEach((key) => {
      months = [...months, key]; // Ayı diziyi ekle
      totalDataCounts = [...totalDataCounts, groupedData[key].length]; // Toplam veri sayısını diziyi ekle
    });

    return { months, totalDataCounts };
  }

  // Gruplanmış veriyi al
  const { months, totalDataCounts } = groupDataByMonth(dataName);

  useEffect(() => {
    setSeries(totalDataCounts.slice(0, 3));
    setOptions({
      chart: {
        width: widthChart,
        type: "pie",
      },
      labels: months.slice(0, 3),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    });
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width={widthChart}
    />
  );
};

export default ChartPie;

ChartPie.propTypes = {
  dataName: string,
  widthChart: number,
  color: array,
  series: array,
};
