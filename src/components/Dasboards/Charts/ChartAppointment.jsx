import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, string } from "prop-types";
import { useGetDailyAppointmentCountQuery } from "../../../redux/features/api/apiSlice.js";
import {
  setTotalCounts,
  setSeries,
  setOptions,
} from "../../../redux/slices/chartAppointmentSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartAppointment = () => {
  const options = useSelector((state) => state.chart.options);
  const series = useSelector((state) => state.chart.series);
  const dailyCounts = useSelector((state) => state.chart.dailyCounts);
  const totalCounts = useSelector((state) => state.chart.totalCounts);

  const dispatch = useDispatch();

  const {
    data: dashboardData,
    error: dashboardDataError,
    isLoading: dashboardDataLoading,
  } = useGetDailyAppointmentCountQuery();

  useEffect(() => {
    if (!dashboardDataLoading && !dashboardDataError && dashboardData) {
      // dispatch(setDailyCounts(Object.values(counts).slice(0, 7)));
      dispatch(setSeries([{ data: dashboardData.data }]));
      dispatch(
        setOptions({
          chart: {
            type: "line",
            height: 200,
            toolbar: {
              show: false, // x-ekseni araç çubuğunu gizle
            },
            line: {
              show: false, // Çubuk çizgisini gösterme
            },
          },
          colors: ["#32b8d5"],
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
          legend: {
            show: false,
          },
          xaxis: {
            categories: dashboardData.categories,
            labels: {
              show: false, // x-ekseni etiketlerini gizle
            },
            grid: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false, // X ekseni işaretlerini gizle
            },
          },
          yaxis: {
            grid: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              show: false,
            },
            axisTicks: {
              show: false, // Y ekseni işaretlerini gizle
            },
          },
          grid: {
            show: false,
          },
          fill: {
            opacity: 1,
          },
        })
      );
    }
  }, [dispatch, dashboardDataLoading, dashboardDataError, dashboardData]);

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
        <p className={`text-sm flex gap-2 text-right text-[#32b8d5] mr-5`}>
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
