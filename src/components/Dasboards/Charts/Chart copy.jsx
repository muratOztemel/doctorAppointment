import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, string } from "prop-types";
import {
  setTotalCounts,
  setDailyCounts,
  setSeries,
  setOptions,
} from "../../../redux/slices/chartSlice.js";
import {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
} from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const Chart = ({ color, days, dataName, chartType }) => {
  const options = useSelector((state) => state.chart.options);
  const series = useSelector((state) => state.chart.series);
  const dailyCounts = useSelector((state) => state.chart.dailyCounts);
  const totalCounts = useSelector((state) => state.chart.totalCounts);

  const dispatch = useDispatch();

  const {
    data: patients,
    error: patientsError,
    isLoading: patientsLoading,
  } = useGetPatientsQuery();
  const {
    data: appointments,
    error: appointmentsError,
    isLoading: appointmentsLoading,
  } = useGetAppointmentsQuery();

  let selectedData = dataName === "patients" ? patients : appointments;
  useEffect(() => {
    if (
      !patientsLoading &&
      !appointmentsLoading &&
      !patientsError &&
      !appointmentsError &&
      patients &&
      appointments
    ) {
      let dailyCounts = {};
      // Initialize total count
      let totalCounts = 0;
      if (days === 30 || chartType === "pie") {
        // Sort data by date (most recent date at the top)
        const sortedRes = [...selectedData].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        // Get the last 30 days
        selectedData = sortedRes.slice(0, days);
      }
      let newDailyCounts = { ...dailyCounts };

      selectedData.map((item) => {
        const date = item.date;
        if (newDailyCounts[date]) {
          newDailyCounts[date]++;
        } else {
          newDailyCounts[date] = 1;
        }
        // Increment total count
        totalCounts++;
        return null;
      });
      dispatch(setTotalCounts(totalCounts));
      dispatch(setDailyCounts(newDailyCounts));
      dispatch(
        setSeries([
          {
            name: "Total",
            data: Object.values(dailyCounts).slice(0, 10),
            color: color,
          },
        ])
      );
      console.log(Object.keys(dailyCounts).slice(0, 10));
      dispatch(
        setOptions({
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
            categories: Object.keys(dailyCounts).slice(0, 10),
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
            x: { format: "dd MMM" },
            y: {
              formatter: function (val) {
                return "Total " + val;
              },
            },
          },
        })
      );
    }
  }, [
    dispatch,
    patients,
    appointments,
    patientsLoading,
    appointmentsLoading,
    patientsError,
    appointmentsError,
  ]);

  // Yükleme durumu kontrolü
  if (patientsLoading || appointmentsLoading) return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;
  if (appointmentsError)
    return <div>Error: {appointmentsError.toString()}</div>;

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
  // color: string,
  // days: number,
  // dataName: string,
  // chartType: string,
};
