import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, string } from "prop-types";
import {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
  useGetDashboardDataQuery,
} from "../../../redux/features/api/apiSlice.js";
import {
  setTotalCounts,
  setDailyCounts,
  setSeries,
  setOptions,
} from "../../../redux/slices/chartSlice.js";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";
import { RiContactsBookLine } from "react-icons/ri";

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
  const {
    data: dashboardData,
    error: dashboardDataError,
    isLoading: dashboardDataLoading,
  } = useGetDashboardDataQuery();

  useEffect(() => {
    if (
      !patientsLoading &&
      !appointmentsLoading &&
      !patientsError &&
      !appointmentsError &&
      patients &&
      appointments
    ) {
      let counts = {};
      // Initialize total count
      /*       const dateChange = new Date(item.date);
      const formattedDate = format(now, "dd.MM.yyyy"); */

      let selectedData = patients.map((item) => {
        console.log(item.date);
        return {
          ...item,
          //date: new Date(item.date.toISOString().split("T")[0]),
          date: format(new Date(item.date), "yyyy-MM-dd"),
        };
      });

      const sortedRes = selectedData.sort((a, b) => b.date - a.date);
      // Son 30 günü al
      selectedData = sortedRes.slice(0, 7);

      selectedData.forEach((item) => {
        // Tarihi "YYYY-MM-DD" formatına dönüştür
        const dateString = format(new Date(item.date), "yyyy-MM-dd");
        counts[dateString] = (counts[dateString] || 0) + 1;
      });
      dispatch(setDailyCounts(Object.values(counts).slice(0, 7)));
      dispatch(
        setSeries([{ name: "Total", data: Object.values(counts).slice(0, 7) }])
      );
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
          colors: [color],
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
            categories: Object.keys(counts).slice(0, 7),
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
  }, [
    dispatch,
    days,
    color,
    dataName,
    chartType,
    patients,
    appointments,
    patientsLoading,
    appointmentsLoading,
    patientsError,
    appointmentsError,
  ]);

  // Yükleme durumu kontrolü
  if (patientsLoading || appointmentsLoading || dashboardDataLoading)
    return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;
  if (appointmentsError)
    return <div>Error: {appointmentsError.toString()}</div>;
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
          {dashboardData.totalAppointmentCountThisMonth}
        </h4>
        <p className={`text-sm flex gap-2 text-right text-[${color}] mr-5`}>
          {days === 30 ? "Monthly" : ""} Total
        </p>
      </div>
    </>
  );
};

export default Chart;

Chart.propTypes = {
  dataName: string,
  widthChart: number,
};
