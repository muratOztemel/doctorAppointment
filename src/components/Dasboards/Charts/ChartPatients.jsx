import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPatientsTotalCounts,
  setPatientsSeries,
  setPatientsOptions,
} from "../../../redux/slices/chartPatientsSlice.js";
import {
  useGetDailyPatientCountQuery,
  useGetDashboardDataQuery,
} from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartPatients = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [totalCounts, setTotalCounts] = useState();

  const dispatch = useDispatch();

  const {
    data: patients,
    error: patientsError,
    isLoading: patientsLoading,
  } = useGetDailyPatientCountQuery();
  const { data, error, isLoading } = useGetDashboardDataQuery();

  useEffect(() => {
    if (
      !patientsLoading &&
      !isLoading &&
      !patientsError &&
      !error &&
      patients &&
      data
    ) {
      setTotalCounts(data.totalPatientCount);

      setSeries([
        {
          name: "Total",
          data: patients.data,
        },
      ]);
      setOptions({
        chart: {
          type: "line",
          height: 200,
          toolbar: {
            show: false, // x-ekseni araç çubuğunu gizle
          },
        },
        colors: "#32b8d5",
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
          categories: patients.categories,
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
  }, [
    dispatch,
    patients,
    data,
    patientsLoading,
    isLoading,
    patientsError,
    error,
  ]);

  if (patientsLoading || isLoading) return <div>Loading...</div>;
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;
  if (error) return <div>Error: {error.toString()}</div>;

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
        <p className={`text-sm flex gap-2 text-right text-[#32b8d5] mr-5`}>
          Patients Total
        </p>
      </div>
    </>
  );
};

export default ChartPatients;
