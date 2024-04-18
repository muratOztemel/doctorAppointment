import { useEffect, useState } from "react";
import { useGetAppointmentCountByDoctorQuery } from "../../../redux/features/api/apiSlice.js";
import ReactApexChart from "react-apexcharts";

const ChartDoctors = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [doctorsName, setDoctorsName] = useState("");

  const {
    data: doctors,
    error: doctorsError,
    isLoading: doctorsLoading,
  } = useGetAppointmentCountByDoctorQuery();

  useEffect(() => {
    if (!doctorsLoading && !doctorsError && doctors) {
      const colors = [
        "#0ea5e9",
        "#34d399",
        "#fbbf24",
        "#ef4444",
        "#d946ef",
        "#14b8a6",
        "#64748b",
      ];
      setDoctorsName(doctors.doctorFullName);
      setSeries([
        {
          name: "Total",
          data: doctors.data,
        },
      ]);
      setOptions({
        chart: {
          height: 350,
          type: "bar",
          /*             events: {
              click: function (chart, w, e) {
                // console.log(chart, w, e)
              },
            }, */
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: doctors.categories,
          labels: {
            style: {
              colors: colors,
              fontSize: "12px",
            },
          },
        },
      });
    }
  }, [doctors, doctorsLoading, doctorsError]);

  if (doctorsLoading) return <div>Loading...</div>;
  if (doctorsError) return <div>Error: {doctorsError.toString()}</div>;

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </>
  );
};

export default ChartDoctors;
