import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, string, array } from "prop-types";

import {
  setSeries,
  setOptions,
  setDoctorsName,
} from "../../../redux/slices/chartDoctorsSlice.js";
import {
  useGetDoctorsQuery,
  useGetAppointmentsQuery,
} from "../../../redux/features/api/apiSlice.js";

import ReactApexChart from "react-apexcharts";

const ChartDoctors = () => {
  const options = useSelector((state) => state.chartDoctors.options);
  const series = useSelector((state) => state.chartDoctors.series);
  const dispatch = useDispatch();

  const {
    data: doctors,
    error: doctorsError,
    isLoading: doctorsLoading,
  } = useGetDoctorsQuery();
  const {
    data: appointments,
    error: appointmentsError,
    isLoading: appointmentsLoading,
  } = useGetAppointmentsQuery();

  useEffect(() => {
    if (
      !doctorsLoading &&
      !appointmentsLoading &&
      !doctorsError &&
      !appointmentsError &&
      doctors &&
      appointments
    ) {
      const colors = [
        "#0ea5e9",
        "#34d399",
        "#fbbf24",
        "#ef4444",
        "#d946ef",
        "#14b8a6",
        "#64748b",
      ];
      const doctorsNameData = doctors.map((doctor) => [
        doctor.name,
        doctor.surname,
      ]);
      const appointmentsCountByDoctor = doctors.map((doctor) => {
        const doctorId = doctor.id;

        const appointmentsCount = appointments.filter(
          (appointment) => appointment.doctorId === doctorId
        ).length;
        return appointmentsCount;
      });
      dispatch(setDoctorsName(doctorsNameData));
      dispatch(
        setSeries([
          {
            name: "Total",
            data: appointmentsCountByDoctor,
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
            categories: Array.from(doctorsNameData),
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
  }, [
    dispatch,
    doctors,
    appointments,
    doctorsLoading,
    appointmentsLoading,
    doctorsError,
    appointmentsError,
  ]);

  // Yükleme durumu kontrolü
  if (doctorsLoading || appointmentsLoading) return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (doctorsError) return <div>Error: {doctorsError.toString()}</div>;
  if (appointmentsError)
    return <div>Error: {appointmentsError.toString()}</div>;

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

ChartDoctors.propTypes = {
  color: string,
  days: number,
  dataName: string,
  chartType: string,
  doctors: array,
  appointments: array,
};
