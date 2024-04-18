import { useEffect, useState } from "react";
import { useGetMonthlyPatientCountQuery } from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPiePatients = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const {
    data: monthlyPatient,
    error: monthlyPatientError,
    isLoading: monthlyPatientLoading,
  } = useGetMonthlyPatientCountQuery();

  useEffect(() => {
    if (!monthlyPatientLoading && !monthlyPatientError && monthlyPatient) {
      setSeries(monthlyPatient.series);
      setOptions({
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
      });
    }
  }, [monthlyPatient, monthlyPatientLoading, monthlyPatientError]);

  if (monthlyPatientLoading) return <div>Loading...</div>;
  if (monthlyPatientError)
    return <div>Error: {monthlyPatientError.toString()}</div>;

  return (
    <ReactApexChart options={options} series={series} type="pie" width="230" />
  );
};

export default ChartPiePatients;
