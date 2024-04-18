import { useEffect, useState } from "react";
import { number, string } from "prop-types";
import { useGetDailyAppointmentCountQuery } from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartAppointment = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const {
    data: dashboardData,
    error: dashboardDataError,
    isLoading: dashboardDataLoading,
  } = useGetDailyAppointmentCountQuery();

  useEffect(() => {
    if (!dashboardDataLoading && !dashboardDataError && dashboardData) {
      setSeries([{ name: "Total", data: dashboardData.data }]);
      setOptions({
        chart: {
          type: "line",
          height: 200,
          toolbar: {
            show: false, // x-ekseni araç çubuğunu gizle
          },
        },
        colors: ["#feb019"],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 3,
            columnWidth: "80%",
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
          categories: dashboardData.categories,
          labels: {
            show: false, // x-ekseni etiketlerini gizle
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false, // X ekseni işaretlerini gizle
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
      });
    }
  }, [dashboardDataLoading, dashboardDataError, dashboardData]);

  // Yükleme durumu kontrolü
  if (dashboardDataLoading) return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (dashboardDataError)
    return <div>Error: {dashboardDataError.toString()}</div>;

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
        <h4 className="text-3xl font-medium text-right mr-5">
          {dashboardData.totalCount}
        </h4>
        <p className={`text-sm flex gap-2 text-right text-amber-500 mr-5`}>
          Monthly Total
        </p>
      </div>
    </>
  );
};

export default ChartAppointment;

ChartAppointment.propTypes = {
  dataName: string,
  widthChart: number,
};
