import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartExample = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Total",
        data: [44, 55, 15, 30, 61, 58, 12, 25, 40, 70, 45, 23],
        color: "#f0ad4e",
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 50,
        toolbar: {
          show: false, // x-ekseni araç çubuğunu gizle
        },
        line: {
          show: false, // Çubuk çizgisini gösterme
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
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="bar"
      height={100}
      width={"100%"}
    />
  );
};

export default ChartExample;
