import { useEffect, useState } from "react";
import { number, string, array } from "prop-types";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = ({ doctors, appointments }) => {
  const [options, setObject] = useState({});
  const [series, setSeries] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);

  const colors = [
    "#0ea5e9",
    "#34d399",
    "#fbbf24",
    "#ef4444",
    "#d946ef",
    "#14b8a6",
    "#64748b",
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const doctorsNameData = doctors.map(
      // (doctor) => `${doctor.name} ${doctor.surname}`
      (doctor) => [doctor.name, doctor.surname]
    );
    const appointmentsCountByDoctor = doctors.map((doctor) => {
      const doctorId = doctor.id;

      const appointmentsCount = appointments.filter(
        (appointment) => appointment.doctorId === doctorId
      ).length;
      return appointmentsCount;
    });
    setDoctorsData(doctorsNameData);
    setSeries([
      {
        data: appointmentsCountByDoctor,
      },
    ]);
    setObject({
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
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
    });
  };

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

export default Chart;

Chart.propTypes = {
  color: string,
  days: number,
  dataName: string,
  chartType: string,
  doctors: array,
  appointments: array,
};
