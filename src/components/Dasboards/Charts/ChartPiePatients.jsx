import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMonthlyPatientCountQuery } from "../../../redux/features/api/apiSlice.js";
import {
  setPatientsPieSeries,
  setPatientsPieOptions,
} from "../../../redux/slices/chartPatientsPieSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPiePatients = () => {
  const options = useSelector(
    (state) => state.chartPatientsPie.patientsPieOptions
  );
  const series = useSelector(
    (state) => state.chartPatientsPie.patientsPieSeries
  );
  const dispatch = useDispatch();
  const {
    data: monthlyPatient,
    error: monthlyPatientError,
    isLoading: monthlyPatientLoading,
  } = useGetMonthlyPatientCountQuery();

  useEffect(() => {
    if (!monthlyPatientLoading && !monthlyPatientError && monthlyPatient) {
      dispatch(setPatientsPieSeries(monthlyPatient.series));
      dispatch(
        setPatientsPieOptions({
          chart: {
            width: 230,
            type: "pie",
          },
          labels: monthlyPatient.labels,
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
  }, [dispatch, monthlyPatient, monthlyPatientLoading, monthlyPatientError]);

  if (monthlyPatientLoading) return <div>Loading...</div>;
  if (monthlyPatientError)
    return <div>Error: {monthlyPatientError.toString()}</div>;

  return (
    <ReactApexChart options={options} series={series} type="pie" width="230" />
  );
};

export default ChartPiePatients;
