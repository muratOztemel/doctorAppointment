import { useEffect, useState } from "react";
import { number, string } from "prop-types";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = ({ color, days, dataName, chartType }) => {
  const [dailyCounts, setDailyCounts] = useState({});
  const [totalCounts, setTotalCounts] = useState("");

  const [options, setObject] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const counts = {};
    (async () => {
      try {
        await axios.get("http://localhost:3004/" + dataName).then((res) => {
          let lastXDaysRes = res.data;

          if (days === 30 || chartType === "pie") {
            // Sort data by date (most recent date at the top)
            const sortedRes = lastXDaysRes.sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB - dateA;
            });

            // Get the last 30 days
            lastXDaysRes = sortedRes.slice(0, days);
          }
          // Initialize total count
          let totalCount = 0;

          lastXDaysRes.map((item) => {
            const date = item.date;
            if (counts[date]) {
              counts[date]++;
            } else {
              counts[date] = 1;
            }
            // Increment total count
            totalCount++;
            return null;
          });
          setTotalCounts(totalCount);
          setDailyCounts(counts);
          setSeries([
            {
              name: "Total",
              data: Object.values(counts).slice(0, 10),
              color: color,
            },
          ]);
          setObject({
            chart: {
              type: chartType,
              toolbar: {
                show: false, // x-ekseni araç çubuğunu gizle
              },
            },
            grid: {
              show: false,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 2,
                columnWidth: "85%",
                endingShape: "rounded",
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },
            xaxis: {
              categories: Object.keys(counts).slice(0, 10),
              labels: {
                show: false, // x-ekseni etiketlerini gizle
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            tooltip: {
              format: "dd MMM",
              y: {
                formatter: function (val) {
                  return "Total " + val;
                },
              },
            },
          });
        });
      } catch (err) {
        console.log(`${dataName} data is connection mistake!`, err);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex justify-start col-span-5">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={100}
          width={"100%"}
        />
      </div>
      <div className="flex flex-col col-span-3">
        <h4 className="text-3xl font-medium text-right mr-5">{totalCounts}</h4>
        <p className={`text-sm flex gap-2 text-right text-[${color}] mr-5`}>
          {days === 30 ? "Monthly" : ""} Total
        </p>
      </div>
    </>
  );
};

export default Chart;

Chart.propTypes = {
  color: string,
  days: number,
  dataName: string,
  chartType: string,
};
