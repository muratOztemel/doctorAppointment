import { useEffect, useState } from "react";
import { number, string } from "prop-types";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = () => {
  const [count, setCount] = useState([]);
  const [doctorsData, setDoctorsData] = useState({});

  const [options, setObject] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const colors = [
      "#0ea5e9",
      "#34d399",
      "#fbbf24",
      "#ef4444",
      "#d946ef",
      "#14b8a6",
      "#64748b",
      "#6b21a8",
    ];
    try {
      await axios
        .get("http://localhost:3004/appointments")
        .then((resAppointments) => {
          axios.get("http://localhost:3004/doctors").then((resDoctors) => {
            const doctors = resDoctors.data.map(
              // (doctor) => `${doctor.name} ${doctor.surname}`
              (doctor) => [doctor.name, doctor.surname]
            );

            // Her doktorun randevu sayısını hesapla
            const appointmentsCountByDoctor = resDoctors.data.map((doctor) => {
              const doctorId = doctor.id;

              const appointmentsCount = resAppointments.data.filter(
                (appointment) => appointment.doctorId === doctorId
              ).length;
              return appointmentsCount;
            });
            setCount(appointmentsCountByDoctor);
            setDoctorsData(doctors);
          });
          console.log("doctorsData", doctorsData);
          console.log("doctorsData", count);
          setSeries([
            {
              data: count,
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
              categories: doctorsData,
              labels: {
                style: {
                  colors: colors,
                  fontSize: "12px",
                },
              },
            },
          });
        });
    } catch (err) {
      console.log(`data is connection mistake!`, err);
    }
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
};
