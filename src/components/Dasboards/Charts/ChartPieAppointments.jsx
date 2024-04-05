import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMonthlyAppointmentCountQuery } from "../../../redux/features/api/apiSlice.js";
import {
  setAppointmentsPieSeries,
  setAppointmentsPieOptions,
} from "../../../redux/slices/chartAppointmentsPieSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPieAppointments = () => {
  const options = useSelector(
    (state) => state.chartAppointmentsPie.appointmentsPieOptions
  );
  const series = useSelector(
    (state) => state.chartAppointmentsPie.appointmentsPieSeries
  );
  const dispatch = useDispatch();
  const {
    data: dashboardData,
    error: dashboardDataError,
    isLoading: dashboardDataLoading,
  } = useGetMonthlyAppointmentCountQuery();

  useEffect(() => {
    if (!dashboardDataLoading && !dashboardDataError && dashboardData) {
      dispatch(setAppointmentsPieSeries(dashboardData.series));
      dispatch(
        setAppointmentsPieOptions({
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
        })
      );
    }
  }, [dispatch, dashboardData, dashboardDataLoading, dashboardDataError]);

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
