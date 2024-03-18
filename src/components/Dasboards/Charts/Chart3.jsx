import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart3 = () => {
  const [dailyCounts, setDailyCounts] = useState({});

  const [options, setObject] = useState({
    chart: {
      type: "bar",
      toolbar: {
        show: false, // x-ekseni araç çubuğunu gizle
      },
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
      labels: {
        show: false, // x-ekseni etiketlerini gizle
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return "Total " + val;
        },
      },
    },
  });
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const counts = {};
    const dates = [];
    axios
      .get("http://localhost:3004/appointments")
      .then((resAppointments) => {
        // Sort data by date (most recent date at the top)
        const sortedAppointments = resAppointments.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        // Get the last 30 days
        const lastTenDaysAppointments = sortedAppointments.slice(0, 30);
        lastTenDaysAppointments.map((appointment) => {
          const date = appointment.date;
          if (counts[date]) {
            counts[date]++;
          } else {
            counts[date] = 1;
          }
          return null;
        });
        setDailyCounts(counts);
        setSeries([
          {
            name: "Total",
            data: Object.values(counts),
            color: "#66d790",
          },
        ]);
      })
      .catch((err) =>
        console.log("Appointments data is connection mistake!", err)
      );
  }, []);
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={100}
      width={"100%"}
    />
  );
};

export default Chart3;
