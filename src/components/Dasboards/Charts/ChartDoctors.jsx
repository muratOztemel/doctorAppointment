import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSeries,
  setOptions,
  setDoctorsName,
} from "../../../redux/slices/chartDoctorsSlice.js";
import { useGetAppointmentCountByDoctorQuery } from "../../../redux/features/api/apiSlice.js";

import ReactApexChart from "react-apexcharts";

const ChartDoctors = () => {
  const options = useSelector((state) => state.chartDoctors.options);
  const series = useSelector((state) => state.chartDoctors.series);
  const dispatch = useDispatch();

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
      dispatch(setDoctorsName(doctors.doctorFullName));
      dispatch(
        setSeries([
          {
            name: "Total",
            data: doctors.data,
          },
        ])
      );
      dispatch(
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
        })
      );
    }
  }, [dispatch, doctors, doctorsLoading, doctorsError]);

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
