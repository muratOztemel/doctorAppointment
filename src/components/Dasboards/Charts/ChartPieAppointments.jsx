import { useEffect, useState } from "react";
import { useGetMonthlyAppointmentCountQuery } from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPieAppointments = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const {
    data: dashboardData,
    error: dashboardDataError,
    isLoading: dashboardDataLoading,
  } = useGetMonthlyAppointmentCountQuery();

  useEffect(() => {
    if (!dashboardDataLoading && !dashboardDataError && dashboardData) {
      setSeries(dashboardData.series);
      setOptions({
        chart: {
          width: 230,
          type: "pie",
        },
        labels: dashboardData.labels,
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
    }
  }, [dashboardData, dashboardDataLoading, dashboardDataError]);

  // Yükleme durumu kontrolü
  if (dashboardDataLoading) return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (dashboardDataError)
    return <div>Error: {dashboardDataError.toString()}</div>;

  return (
    <ReactApexChart options={options} series={series} type="pie" width="230" />
  );
};

export default ChartPieAppointments;
