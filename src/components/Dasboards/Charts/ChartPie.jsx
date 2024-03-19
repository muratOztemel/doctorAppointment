import { useEffect, useState } from "react";
import { string, number, array } from "prop-types";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ChartPie = ({ dataName, color, widthChart }) => {
  const [labels, setLabels] = useState({});
  const [totalDataCounts, setTotalDataCounts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("http://localhost:3004/" + dataName).then((res) => {
          let jsonData = res.data;

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
          const { months, totalDataCounts } = groupDataByMonth(jsonData);
          setLabels(months);
          setTotalDataCounts(totalDataCounts);
          /*           if (Array.isArray(totalDataCounts)) {
            console.log("Bu bir dizi!");
          } else {
            console.log("Bu bir dizi değil!");
          } */
        });
      } catch (err) {
        console.log(`${dataName} data is connection mistake!`, err);
      }
    })();
  }, []);

  return (
    <ReactApexChart
      options={{
        noData: { text: "Empty Data" },
        labels: labels,
        colors: color,
      }}
      series={totalDataCounts}
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
  series: array.isRequired,
};
